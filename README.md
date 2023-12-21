# Likes Counter

[![Likes](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Flc.somespecial.one%2Fdemo-page%3A%3A10%2Fdemo-user-id&query=%24.totalLikes&label=%E2%9D%A4%EF%B8%8F)](https://lc.somespecial.one)
[![Views](https://vc.somespecial.one/likes-counter-repo/badge?label=++%F0%9F%91%80&color=red)](https://github.com/somespecialone/views-counter)
[![Made in Ukraine](https://img.shields.io/badge/made_in-ukraine-ffd700.svg?labelColor=0057b7)](https://stand-with-ukraine.pp.ua)
[![license](https://img.shields.io/github/license/somespecialone/likes-counter)](https://github.com/somespecialone/likes-counter/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![Test](https://github.com/somespecialone/likes-counter/actions/workflows/test.yml/badge.svg)](https://github.com/somespecialone/likes-counter/actions/workflows/tests.yml)
[![Deploy](https://github.com/somespecialone/likes-counter/actions/workflows/deploy.yml/badge.svg)](https://github.com/somespecialone/likes-counter/actions/workflows/deploy.yml)
[![Demo](https://github.com/somespecialone/likes-counter/actions/workflows/demo.yml/badge.svg)](https://github.com/somespecialone/likes-counter/actions/workflows/demo.yml)
[![codecov](https://codecov.io/gh/somespecialone/likes-counter/graph/badge.svg?token=4NXSdyL5wc)](https://codecov.io/gh/somespecialone/likes-counter)

An easy-to-integrate like counter for your website.

[![Install on Space](https://deta.space/buttons/light.svg)](https://deta.space/discovery/@somespecialone/likescounter)

> [!NOTE]
> Try demo **[here](https://somespecialone.github.io/likes-counter)**. Also look
> at the singling [views-counter](https://github.com/somespecialone/views-counter)
>
> API of the app is available at address: https://lc.somespecial.one.
> But please, if you tend to use it heavily, consider to installing the app on `Deta Space` by yourself with button above!

## How to use

App exposes json API routes.

### Generate route

Generate unique user id, if you don't want ot make it by yourself on client side.

Have `len` query param - length of generated id. Default `len` value is 10.

> GET `/generate`

```json
{
  "id": "generated id"
}
```

### Like routes

* `slug` - unique key for page/post/etc.
* `userId` - unique user id. Can be generated in `/generate` route.

> GET `:slug/:userId`

```json
{
  "userLikes": 0,
  "totalLikes": 0
}
```

> POST `:slug/:userId`

Payload (body) must be JSON and contain `count` field. For example:

```json
{
  "count": 1
}
```

Response is `null`

### Maximum likes number

By default, the maximum number of the likes is limited to 1.
To set your own option you can add `::{your max likes number}` postfix to `slug`.
For example `super-unique-slug::10` will set max number to 10 for the current route.

App can use `NITRO_DEF_MAX_LIKES_COUNT` env variable to set default number, [know more](#deployment-)

## Deployment ⚒️

### Deta Space 🚀🌌
You can install app on `Deta Space` with button above.

### Providers

If this is not an option for you, application code can be built for these [providers](https://nitro.unjs.io/deploy), so
just clone the repo and use your provider.

### Env variables

App use `Deta Base` for database, so `DETA_PROJECT_KEY` or `NITRO_DETA_PROJECT_KEY` are required.

* `DETA_PROJECT_KEY`/`NITRO_DETA_PROJECT_KEY` - deta project key, required if app installed not in `Deta Space`. Read
  more [there](https://deta.space/docs/en/use/your-data/collections#data-keys)
* `NITRO_DEF_MAX_LIKES_COUNT` - max number of likes. Default 1
* `NITRO_DEF_ID_LENGTH` - length of generated id. Default 10
* `NITRO_ALLOW_ORIGIN` - allow origin header. Default *

## Tests 🧪

Clone repo and run `test` script with your package manager or

```sh
vitest
```
