# saidp-sdk-js

SecureAuth IdP SDK for JavaScript

---
## Configuration:

* `.env` is required. Please update with your configuration details.

Before First Run:
- Copy `.env.example` -> `.env` and modify to your needs.
- Ensure the `.env` file is located with your web server.
- Refer to test folder for examples.

Example Configuration:
```zsh
applianceHost=company.secureauth.com
appliancePort=443
applianceSSL=true
selfSigned=false
realm=SecureAuth1
applicationID=af1b351845ec47968b27debd9cd4ce53
applicationKey=101db0347fdf71dab63cd965b8782ff6ba0f8f1c91e8cf52f970d1267e0fb453
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

```
---