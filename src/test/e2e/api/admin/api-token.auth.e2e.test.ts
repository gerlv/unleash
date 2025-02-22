import { setupAppWithCustomAuth } from '../../helpers/test-helper';
import dbInit from '../../helpers/database-init';
import getLogger from '../../../fixtures/no-logger';
import { ApiTokenType } from '../../../../lib/types/stores/api-token-store';
import { RoleName } from '../../../../lib/types/model';

let stores;
let db;

beforeAll(async () => {
    db = await dbInit('token_api_auth_serial', getLogger);
    stores = db.stores;
});

afterAll(async () => {
    if (db) {
        await db.destroy();
    }
});

afterEach(async () => {
    await stores.apiTokenStore.deleteAll();
});

test('none-admins should only get client tokens', async () => {
    expect.assertions(2);

    const email = 'custom-user@mail.com';

    const preHook = (app, config, { userService, accessService }) => {
        app.use('/api/admin/', async (req, res, next) => {
            const role = await accessService.getRootRole(RoleName.EDITOR);
            const user = await userService.createUser({
                email,
                rootRole: role.id,
            });
            req.user = user;
            next();
        });
    };

    const { request, destroy } = await setupAppWithCustomAuth(stores, preHook);

    await stores.apiTokenStore.insert({
        username: 'test',
        secret: '1234',
        type: ApiTokenType.CLIENT,
    });

    await stores.apiTokenStore.insert({
        username: 'test',
        secret: 'sdfsdf2d',
        type: ApiTokenType.ADMIN,
    });

    await request
        .get('/api/admin/api-tokens')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
            expect(res.body.tokens.length).toBe(1);
            expect(res.body.tokens[0].type).toBe(ApiTokenType.CLIENT);
        });

    await destroy();
});

test('Only token-admins should be allowed to create token', async () => {
    expect.assertions(0);

    const email = 'custom-user2@mail.com';

    const preHook = (app, config, { userService, accessService }) => {
        app.use('/api/admin/', async (req, res, next) => {
            const role = await accessService.getRootRole(RoleName.EDITOR);
            req.user = await userService.createUser({
                email,
                rootRole: role.id,
            });
            next();
        });
    };

    const { request, destroy } = await setupAppWithCustomAuth(stores, preHook);

    await request
        .post('/api/admin/api-tokens')
        .send({
            username: 'default-admin',
            type: 'admin',
        })
        .set('Content-Type', 'application/json')
        .expect(403);

    await destroy();
});

test('Token-admin should be allowed to create token', async () => {
    expect.assertions(0);
    const email = 'custom-user3@mail.com';

    const preHook = (app, config, { userService, accessService }) => {
        app.use('/api/admin/', async (req, res, next) => {
            const role = await accessService.getRootRole(RoleName.ADMIN);
            req.user = await userService.createUser({
                email,
                rootRole: role.id,
            });
            next();
        });
    };

    const { request, destroy } = await setupAppWithCustomAuth(stores, preHook);

    await request
        .post('/api/admin/api-tokens')
        .send({
            username: 'default-admin',
            type: 'admin',
        })
        .set('Content-Type', 'application/json')
        .expect(201);

    await destroy();
});
