---
id: quickstart
title: Quickstart
---

In this section we will attempt to guide you in order to get started with Unleash easily. There are multiple options to get started with unleash, browse the headings to find the method that works best for you.

## I just want to get started creating toggles without much setup

Usually, you'll need to set up an unleash instance in order to work with unleash. However, for testing purposes we have set up a demo instance that you can use in order to test out different use-cases before setting up your own instance. You can find the demo instance admin panel here: https://app.unleash-hosted.com/demo/

NOTE: This is a demo instance set up with the enterprise version. Some of the functionality may be enterprise specific, but everything we cover here is also available in open source.

### I want to test toggles in a client side environment

In order to use feature toggles on the client side you need to connect through [the unleash proxy](../sdks/unleash_proxy). The unleash proxy will provide a security and performance layer between your client application and the unleash instance. For now, you can use the proxy we have set up on the demo instance.

#### Create your first toggle

In order to create a toggle through the UI, [you can follow this guide](./create_feature_toggle). Once you have created your feature toggle, you are ready to connect your application using an SDK.

#### Connecting to the unleash proxy from your app

Connection details:

```
Api URL: https://app.unleash-hosted.com/demo/proxy
Secret key: proxy-123 (edited)
```

Now you can open your application code and connect through one of the proxy SDKs:

- [Javascript Proxy SDK](../sdks/proxy-javascript)
- [iOS Proxy SDK](../sdks/proxy-ios)
- [Android Proxy SDK](../sdks/android_proxy_sdk)
- React

Here is a connection example using the javascript proxy SDK:

```javascript
import { UnleashClient } from 'unleash-proxy-client';

const unleash = new UnleashClient({
  url: 'https://app.unleash-hosted.com/demo/proxy',
  clientKey: 'proxy-123',
  appName: 'my-webapp',
});

// Used to set the context fields, shared with the Unleash Proxy
unleash.updateContext({ userId: '1233' });

// Start the background polling
unleash.start();

if (unleash.isEnabled('proxy.demo')) {
  // do something
}
```

Now you are ready to use the feature toggle you created in your client side application, using the appropriate proxy SDK.

### I want to test toggles in a backend environment

#### Create your first toggle

In order to create a toggle through the UI, [you can follow this guide](./create_feature_toggle). Once you have created your feature toggle, you are ready to connect your application using an SDK.

#### Connecting to the unleash instance from your app

Connection details:

```
Api URL: https://app.unleash-hosted.com/demo/api/
Secret key: 56907a2fa53c1d16101d509a10b78e36190b0f918d9f122d
```

Now you can open up your application code and create a connection to unleash using one of our [SDKs](../sdks). Here's an example using the NodeJS SDK:

```javascript
const { initialize } = require('unleash-client');
const unleash = initialize({
  url: 'https://app.unleash-hosted.com/demo/api/',
  appName: 'my-app-name',
  instanceId: 'my-unique-instance-id',
  customHeaders: {
    Authorization: '56907a2fa53c1d16101d509a10b78e36190b0f918d9f122d',
  },
});

unleash.on('synchronized', () => {
  // Unleash is ready to serve updated feature toggles.

  // Check a feature flag
  const isEnabled = unleash.isEnabled('some-toggle');

  // Check the variant
  const variant = unleash.getVariant('app.ToggleY');
});
```

Now you can fetch the feature toggle you created and try turning it on / off in your code.

## I want to setup my own instance for testing purposes

If you want to set up your own instance for testing purposes you can easily do so by using one of our premade setup kits for heroku or digitalocean.

> The heroku instance setup is FREE, and includes a DB to save your state but it will eventually go to sleep when not used. The digitalocean setup utilises droplets and will cost you around 10$/month to run, but in turn it will not go to sleep. NOTE: If you use the DigitalOcean link below and are a new user, you will receive 100$ in FREE credits.

### Deploy a free version of unleash to Heroku

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://www.heroku.com/deploy/?template=https://github.com/Unleash/unleash)

### Deploy a paid version of unleash to DigitalOcean

> You'll receive 100\$ in free credits if you are a new DigitalOcean user using this link.

[![Deploy to DigitalOcean](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/Unleash/unleash/tree/master&refcode=0e1d75187044)

### Accessing your new instance

Once you have set up the new instance, click the URL provided by either Heroku or DigitalOcean and you'll be taken to the application login screen.

Input the following credentials to log in:

```
username: admin
password: unleash4all
```

### Create your first toggle

In order to create a toggle through the UI, [you can follow this guide](./create_feature_toggle). Once you have created your feature toggle, you are ready to connect your application using an SDK.

### Connect your SDK

Now you're logged in as an admin. Next, find the navigation, open up the Admin panel and find the API Access tab. Click "Add new api key" and create a client key. This key can be used to connect to the instance with our [SDKs](../sdks).

You can find more [information about API keys here.](./api-token).

Now that you have your API key created, you have what you need to connect to the SDK (NodeJS example):

```javascript
const { initialize } = require('unleash-client');
const unleash = initialize({
  url: 'https://your.heroku.instance.com/api/',
  appName: 'my-app-name',
  instanceId: 'my-unique-instance-id',
  customHeaders: {
    Authorization: 'YOUR_API_KEY_HERE',
  },
});

unleash.on('synchronized', () => {
  // Unleash is ready to serve updated feature toggles.

  // Check a feature flag
  const isEnabled = unleash.isEnabled('some-toggle');

  // Check the variant
  const variant = unleash.getVariant('app.ToggleY');
});
```

## I want to run unleash locally

### Run Unleash with docker-compose

The easiest way to run unleash locally is using [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/).

1. Clone the [unleash-docker](https://github.com/Unleash/unleash-docker) repository.
2. Run `docker-compose build` in repository root folder.
3. Run `docker-compose up` in repository root folder.

Unleash should now be available on `http://localhost:4242`

[Click here to see all options to get started locally.](../deploy/getting_started)

### Accessing your new instance

Once you have the local instance running on localhost, input the following credentials to log in:

```
username: admin
password: unleash4all
```

### Create your first toggle

In order to create a toggle through the UI, [you can follow this guide](./create_feature_toggle). Once you have created your feature toggle, you are ready to connect your application using an SDK.

## I want to set up a production ready instance

Coming soon.
