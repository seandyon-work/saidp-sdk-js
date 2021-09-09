# saidp-sdk-js

SecureAuth IdP SDK for JavaScript

---
## Configuration:

* SecureAuth Realm setup with API Access: https://docs.secureauth.com/display/IPD/Authentication+API+guide
* `.env` is required. Please update with your configuration details.

Before First Run:
- Copy `.env.example` -> `.env` and modify to your needs.
- Run `npm i` or `yarn` in both the root sdk folder and test folder.

Example Configuration:
```Java
applianceHost=company.secureauth.com
appliancePort=443
applianceSSL=true
selfSigned=false
debug=false
realm=SecureAuth1
applicationID=your_appid
applicationKey=your_appkey
titanUser=titan_user
titanPass=titan_pass
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