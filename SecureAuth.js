
const  { ApiClient, apiEndpointEnum } = require('./ApiClient');

const { AuthEndpoint } = require('./Auth/auth');
const { UserEndpoint } = require('./Profile/profile');
const { DfpEndpoint } = require('./DeviceRecognition/dfp');
const { AdaptiveEndpoint } = require('./Adaptive/adaptive');
const { Models } = require('./models/models');

class SecureAuth  {
    // constructor for the SecureAuth class
    constructor() {
        this.auth = new AuthEndpoint(ApiClient, apiEndpointEnum);
        this.profile = new UserEndpoint(ApiClient, apiEndpointEnum);
        this.dfp = new DfpEndpoint(ApiClient, apiEndpointEnum);
        this.adaptive = new AdaptiveEndpoint(ApiClient, apiEndpointEnum);
        this.models = new Models();
    }
}

//export SecureAuth object
module.exports = {
    SecureAuth: SecureAuth
};