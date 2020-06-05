
// factorId in some cases is case sensitive. Function to capitalize first letter.
// https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

//Use the /auth endpoints to validate information associated with a user account, and to generate and deliver OTPs.
class AuthEndpoint {
    // declaring private variables
    #client = {};
    #endpointEnum = {};
    
    constructor(apiClient, apiEndpointEnum) {
        // private
        this.#client = new apiClient();
        this.#endpointEnum = apiEndpointEnum.auth;
     }

     validateUser = async (user) => {
        let postData = { "user_id": user, "type": "user_id"};
        return await this.#client.post(postData, this.#endpointEnum);
     }

     validatePassword = async (user, password) => {
        let postData = { "user_id": user, "type": "password", "token": password}; 
        return await this.#client.post(postData, this.#endpointEnum);
     }

     validateKBA = async (user, kbqAnswer, kbq) => {
        let postData = { "user_id": user, "type": "kba", "token": kbqAnswer, "factor_id": kbq};
        return await this.#client.post(postData, this.#endpointEnum);
     }

     validateOATH = async (user, otpAnswer, factorId) => {
        let postData = { "user_id": user, "type": "oath", "token": otpAnswer, "factor_id": factorId}; 
        return await this.#client.post(postData, this.#endpointEnum);
     }

     validatePIN = async (user, pinAnswer) => {
        let postData = { "user_id": user, "type": "pin", "token": pinAnswer}; 
        return await this.#client.post(postData, this.#endpointEnum);
     }

     sendPhoneCallOTP = async (user, factorId) => {
        let postData = { "user_id": user, "type": "call", "factor_id": factorId, "evaluate_number": "true"};
        return await this.#client.post(postData, this.#endpointEnum);
     }

     sendSMSOTP = async (user, factorId) => {
        let postData = { "user_id": user, "type": "sms", "factor_id": capitalize(factorId), "evaluate_number": "true"};
        return await this.#client.post(postData, this.#endpointEnum);
     }

     sendEmailOTP = async (user, factorId) => {
        let postData = { "user_id": user, "type": "email", "factor_id": factorId}; 
        return await this.#client.post(postData, this.#endpointEnum);
     }

     sendPushOTP = async (user, factorId) => {
        let postData = { "user_id": user, "type": "push", "factor_id": factorId};
        return await this.#client.post(postData, this.#endpointEnum);
     }

     sendPushAccept = async (user, factorId, type, biometricType, pushAcceptDetails) => {
         let postData = {
            "user_id": user,
            "factor_id": factorId,
            "type": type,
            "biometricType": biometricType,
            "push_accept_details": {
                "company_name": pushAcceptDetails.company,
                "application_description": pushAcceptDetails.app,
                "enduser_ip": pushAcceptDetails.ip_address
            }
        } 
        return await this.#client.post(postData, this.#endpointEnum);
     }

     sendHelpDeskOTP = async (user, factorId) => {
        let postData = { "user_id": user, "type": "help_desk", "factor_id": factorId};
        return await this.#client.post(postData, this.#endpointEnum);
     }

     //#region AdHoc Section
     //https://docs.secureauth.com/display/KBA/Authentication+API%3A+Send+Ad+hoc+OTP+without+Existing+User+Profile
     sendAdHocPhoneCallOTP = async (user, phoneNumber) => {
        let postData = { "user_id": user, "type": "call", "token": phoneNumber, "evaluate_number": "true"};
        return await this.#client.post(postData, this.#endpointEnum);
     }

     sendAdHocSMSOTP = async (user, phoneNumber) => {
        let postData = { "user_id": user, "type": "sms", "token": phoneNumber, "evaluate_number": "true"};
        return await this.#client.post(postData, this.#endpointEnum);
     }

     sendAdHocEmailOTP = async (user, emailAddress) => {
        let postData = { "user_id": user, "type": "email", "token": emailAddress };
        return await this.#client.post(postData, this.#endpointEnum);
     }
     //#endregion

     //#region PushToAccept Status
     getPushAccepttStatus = async (referenceId) => { 
        return await this.#client.get(referenceId, this.#endpointEnum);
     }
     //#endregion
}

module.exports = {
    AuthEndpoint: AuthEndpoint
}