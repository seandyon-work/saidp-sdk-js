
class DfpEndpoint {
    // declaring private variables
    #client = {};
    #js = {};
    #validate = {};
    #confirm = {};

    constructor(apiClient, apiEndpointEnum) {
        // private
        this.#client = new apiClient();
        this.#js = apiEndpointEnum.dfp_js;
        this.#validate = apiEndpointEnum.dfp_validate;
        this.#confirm = apiEndpointEnum.dfp_confirm;
     }

     getDfpScript = async () => {
        let jsonResponse = {};
        await this.#client.get('', this.#js).then(res => jsonResponse = res);
        return jsonResponse;
    }

    validateDfp = async (user, ip_address, fingerprint) => {
        let postData = { "user_id": user, "host_address": ip_address, "fingerprint": fingerprint };
        console.log(postData.fingerprint);
        return await this.#client.post(postData, this.#validate);
    }

    ConfirmDfp = async (user, fingerprint_id) => {
        let postData = { "user_id": user, "fingerprint_id": fingerprint_id };
        return await this.#client.post(postData, this.#confirm);
    }

}

module.exports = {
    DfpEndpoint: DfpEndpoint
}