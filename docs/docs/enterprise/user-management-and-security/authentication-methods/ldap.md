---
id: ldap
title: LDAP
---

---

## Prerequisite

- Mlchain Pro enabled with a valid license key
- Information to access the LDAP server

## Quick Start

1. Open `mlchain.config.json` and set `pro.auth.strategy = 'ldap'`
2. Configure the available options: [check the full configuration for more details](https://github.com/mlchain/oss/blob/master/packages/bp/src/core/config/mlchain.config.ts)

## Field Mapping

The `fieldMapping` configuration allows you to match the existing properties of your users with the one Mlchain uses. You can define these fields for users: `email`, either `fullname` or `firstname` with `lastname`, `company`, `role`, and `location`.

Whenever a user successfully logs on using SAML or LDAP, Mlchain will update his details in his Mlchain profile.

```js
{
  "fieldMapping": {
    "email": "emailAddressOnIdp",
    "fullname": "userFullName",
    "company": "!Mlchain",
    "role": "userRole",
    "location": "officeLocation"
  }
}
```
