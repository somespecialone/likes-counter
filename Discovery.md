---
app_name: "LikesCounter"
title: "LikeCounter: For personal website."
tagline: "An easy-to-integrate like counter for your website."
theme_color: "#EE80A3"
git: "<https://github.com/somespecialone/likes-counter>"
homepage: "<https://somespecialone.github.io/likes-counter>"
open_code: true
---

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

App can use `NITRO_DEF_MAX_LIKES_COUNT` env variable to set default number.
