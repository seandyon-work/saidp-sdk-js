# saidp-sdk-js

SecureAuth IdP SDK for JavaScript

---
## Configuration:

* SecureAuth Realm setup with API Access
* `.env` is required. Please update with your configuration details.

Before First Run:
- Copy `.env.example` -> `.env` and modify to your needs.
- Ensure the `.env` file is located with your web server.
- Run `npm i` in the root of the sdk folder.
- Refer to test folder for examples.

Example Configuration:
```Java
applianceHost=company.secureauth.com
appliancePort=443
applianceSSL=true
selfSigned=false
realm=SecureAuth1
applicationID=your_id
applicationKey=your_key
```

---
## Usage:

```JavaScript

const SecureAuth = require('../SecureAuth').SecureAuth
const api = new SecureAuth();

// validate user account
api.auth.validateUser('test_user').then(result => /* do something with result */ );

// get users MFA Factors
api.profile.getUserMFAFactors('test_user').then(result => /* do something with result */ );

// Reset Password
api.profile.idm.resetPassword('test_user', 'test_password').then(result => /* do something with result */ );

// Evaluate IP Address
api.adaptive.evaluateIP('test_user', '8.8.8.8').then(request => /* do something with result */ );

```
---