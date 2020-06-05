
const apiClient = require('./ApiClient').ApiClient
const apiEndpointEnum = require('./ApiClient').apiEndpointEnum

const AuthEndpoint = require('./Auth/auth').AuthEndpoint
const UserEndpoint = require('./Profile/profile').UserEndpoint
const DfpEndpoint = require('./DeviceRecognition/dfp').DfpEndpoint
const AdaptiveEndpoint = require('./Adaptive/adaptive').AdaptiveEndpoint

class SecureAuth  {
    // constructor for the SecureAuth class
    constructor() {
        this.auth = new AuthEndpoint(apiClient, apiEndpointEnum);
        this.profile = new UserEndpoint(apiClient, apiEndpointEnum);
        this.dfp = new DfpEndpoint(apiClient, apiEndpointEnum);
        this.adaptive = new AdaptiveEndpoint(apiClient, apiEndpointEnum);
    }
}

//export SecureAuth object
module.exports = {
    SecureAuth: SecureAuth
};