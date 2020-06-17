
const { IdmEndpoint } = require('../IdM/idm');

class UserEndpoint {
    // declaring private variables
    #client = {};
    #endpointEnum = {};
    
    constructor(apiClient, apiEndpointEnum) {
        // private
        this.#client = new apiClient();
        this.#endpointEnum = apiEndpointEnum.users;
        // public
        this.UserStatusEnum = { lock:"lock", unlock:"unlock", enable:"enable", disable:"disable" };
        Object.freeze(apiEndpointEnum);
        this.idm = new IdmEndpoint(apiClient, apiEndpointEnum);
     }

     getUserProfile = async (user) => {
        return await this.#client.get(user, this.#endpointEnum);
    }

    getUserMFAFactors = async (user) => {
        user = user + '/factors';
        return await this.#client.get(user, this.#endpointEnum);
    }

    //#region User Satus
    // https://docs.secureauth.com/display/IPD/User+status+API+endpoints
    getUserStatus = async (user) => {
        user = user + '/status'
        return await this.client.get(user, this.endpointEnum);
    }

    setUserStatus = async (user, status) => {
        let url = this.#endpointEnum + '/' + user + '/status';
        let postData = { "status": status };
        return await this.#client.post(postData, url);
    }
    //#endregion
}

module.exports = {
    UserEndpoint: UserEndpoint
}