const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

//Use the /auth endpoints to validate information associated with a user account, and to generate and deliver OTPs.
class EnrollEndpoint {
    // declaring private variables
    #client = {};
    
    constructor(apiClient, apiEndpointEnum) {
        // private
        this.#client = apiClient;
     }

     getEnrollments = async (user) => {
         return await this.#client.getMobileSvc(user+'/devices','');
     }

     generateQRCode = async (user) => {
         let postData = { userId: user }
         return await this.#client.postMobileSvc(postData, '/enroll');
     }

     validateQREnrollment = async (user, enrollmentCode, totp) => {
         // {enrollmentCode: '', totp: ''}
         let postData = {
            enrollmentCode: enrollmentCode,
            totp: totp,
            userId: user
        }
        return await this.#client.postMobileSvc(postData, '/enroll/validate');
     }

     enrollTOTP = async (user, seed, deviceName, ) => {
         // replace(/-/g, "") removed hyphens in guid
        let postData = { enrollmentCode: uuidv4(), deviceName: deviceName, oathSeed: seed, createdDateTimeOffset: new Date().toISOString() }
        let response = await this.#client.postMobileSvc(postData, '/user/'+user+'/devices');
        if(response === '') { response = { message: 'enrollment complete.', postData } }
        return response;
    }

}

module.exports = {
    EnrollEndpoint: EnrollEndpoint
}