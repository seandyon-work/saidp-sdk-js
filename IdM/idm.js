
class IdmEndpoint {
    // declaring private variables
    #client = {};
    #endpointEnum = {};

    constructor(apiClient, apiEndpointEnum) {
        // private
        this.#client = new apiClient();
        this.#endpointEnum = apiEndpointEnum.users;
     }


     resetPassword = async (user, password) => {
        let url = this.#endpointEnum + '/' + user + '/resetpwd';
        let postData = { "password": password };
        return await this.#client.post(postData, url);
     }

     changePassword = async (user, currentPassword, newPassword) => {
        let url = this.#endpointEnum + '/' + user + '/changepwd';
        let postData = { "currentPassword": currentPassword, "newPassword": newPassword };
        return await this.#client.post(postData, url);
     }

}

module.exports = {
    IdmEndpoint: IdmEndpoint
}