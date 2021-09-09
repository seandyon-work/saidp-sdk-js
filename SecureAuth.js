
const  { ApiClient, apiEndpointEnum } = require('./ApiClient');

const { AuthEndpoint } = require('./Auth/auth');
const { UserEndpoint } = require('./Profile/profile');
const { DfpEndpoint } = require('./DeviceRecognition/dfp');
const { AdaptiveEndpoint } = require('./Adaptive/adaptive');
const { EnrollEndpoint } = require('./Enrollment/enroll');
const { Models } = require('./models/models');

class SecureAuth  {
    // constructor for the SecureAuth class
    constructor() {
        this.apiClient = new ApiClient();
        this.auth = new AuthEndpoint(this.apiClient, apiEndpointEnum);
        this.profile = new UserEndpoint(this.apiClient, apiEndpointEnum);
        this.dfp = new DfpEndpoint(this.apiClient, apiEndpointEnum);
        this.adaptive = new AdaptiveEndpoint(this.apiClient, apiEndpointEnum);
        this.enroll = new EnrollEndpoint(this.apiClient, apiEndpointEnum);
        this.models = new Models();
    }
}

//export SecureAuth object
module.exports = {
    SecureAuth: SecureAuth
};