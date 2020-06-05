
class AdaptiveEndpoint {
    // declaring private variables
    #client = {};
    #adaptauth = {};
    #accesshistory = {};
    #ipeval = {};

    constructor(apiClient, apiEndpointEnum) {
        // private
        this.#client = new apiClient();
        this.#adaptauth = apiEndpointEnum.adaptauth;
        this.#accesshistory = apiEndpointEnum.accesshistory;
        this.#ipeval = apiEndpointEnum.ipeval;
    }

    //#region IpEval
    // https://docs.secureauth.com/display/91docs/IP+Evaluation+API+Guide#expand-Definitions
    evaluateIP = async (user, ip_address) => {
        let postData = { "user_id": user, "type": "risk", "ip_address": ip_address };
        return await this.#client.post(postData, this.#ipeval);
    }
    //#endregion
    
    //#region Adaptive
    // https://docs.secureauth.com/display/91docs/Adaptive+Authentication+API+Guide
    getAdaptiveWorkflow = async (user, ip_address) => {
        let postData = { "user_id": user, "parameters": {  "ip_address": ip_address } };
        return await this.#client.post(postData, this.#adaptauth);
    }

    setAccessHistory = async (user, ip_address) => {
        let postData = { "user_id": user, "ip_address": ip_address };
        return await this.#client.post(postData, this.#accesshistory);
    }
    //#endregion
}

module.exports = {
    AdaptiveEndpoint: AdaptiveEndpoint
};