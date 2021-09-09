
const  { ApiClient, apiEndpointEnum } = require('./ApiClient');

const { AuthEndpoint } = require('./Auth/auth');
const { UserEndpoint } = require('./Profile/profile');
const { DfpEndpoint } = require('./DeviceRecognition/dfp');
const { AdaptiveEndpoint } = require('./Adaptive/adaptive');
const { EnrollEndpoint } = require('./Enrollment/enroll');
const { Models } = require('./models/models');

class SecureAuth  {
    // declaring private variables
    #client = {};
    // constructor for the SecureAuth class
    constructor() {
        this.#client = new ApiClient();
        this.auth = new AuthEndpoint(this.#client, apiEndpointEnum);
        this.profile = new UserEndpoint(this.#client, apiEndpointEnum);
        this.dfp = new DfpEndpoint(this.#client, apiEndpointEnum);
        this.adaptive = new AdaptiveEndpoint(this.#client, apiEndpointEnum);
        this.enroll = new EnrollEndpoint(this.#client, apiEndpointEnum);
        this.models = new Models();
    }
}

//export SecureAuth object
module.exports = {
    SecureAuth: SecureAuth
};