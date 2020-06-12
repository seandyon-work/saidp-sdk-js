# saidp-sdk-js

SecureAuth IdP SDK for JavaScript

---
## Configuration:

* `.env` is required. Please update with your configuration details.

Before First Run:
- Copy `.env.example` -> `.env` and modify to your needs.
- Run `npm i` in both the root sdk folder and test folder.

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

Running the example:
```zsh
node index.js
```

* Execute url, replacing `{test_user}` with the actual user and without brackets: http://localhost:3000/api/user/{test_user}/profile

![Example](/test/images/example.png)

---