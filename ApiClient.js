const axios = require('axios');
require('dotenv').config();
const moment = require('moment');
const CryptoJS = require('crypto-js');

const apiEndpointEnum = {auth:"auth", dfp_js:"dfp/js", dfp_validate:"dfp/validate", dfp_confirm:"dfp/confirm", 
    adaptauth:"adaptauth", accesshistory:"accesshistory", ipeval:"ipeval", users: "users"}
Object.freeze(apiEndpointEnum)


class Configuration {
    constructor() {
        this.applianceHost = process.env.applianceHost;
        this.appliancePort = process.env.applianceHost;
        this.applianceSSL = process.env.applianceSSL;
        this.selfSigned = process.env.selfSigned;
        this.realm = process.env.realm;
        this.applicationID = process.env.applicationID;
        this.applicationKey = process.env.applicationKey;
        this.apiVersion = 'api/v1';
    }
}


class HmacSigningHandler {
    constructor(method, appId, appKey, realm, apiVersoin, endpoint, postData) {
        this.utcExtTimeStamp =  moment.utc().format('ddd, DD MMM YYYY HH:mm:ss.SSS') + ' GMT';
        if(method === 'GET') {
            this.payload = [method, this.utcExtTimeStamp, appId, '/'+realm+'/'+apiVersoin+'/'+endpoint].join("\n");
            console.log(this.payload);
        }
        if(method === 'POST') {
            this.payload = [method, this.utcExtTimeStamp, appId, '/'+realm+'/'+apiVersoin+'/'+endpoint, JSON.stringify(postData)].join("\n");
            console.log(this.payload);
        }
        
        let hmac = CryptoJS.HmacSHA256(CryptoJS.enc.Latin1.parse(this.payload), CryptoJS.enc.Hex.parse(appKey)).toString(CryptoJS.enc.Base64);
        this.authHeader = Buffer.from(appId+":"+hmac).toString('base64');

    }

    getHeaders() {
    return {'Authorization': 'Basic ' + this.authHeader,
        'X-SA-Ext-Date': this.utcExtTimeStamp,
        'Content-type': 'application/json; charset=UTF-8' }
    }

}

class ApiClient {

    constructor() {
        this.config = new Configuration();
        this.instance = axios.create({
            baseURL: "https://" + this.config.applianceHost + "/" + this.config.realm + "/" + this.config.apiVersion + "/",
          });
    }
    
    get = async (apiEndPoint, endpointEnum) => {

        let url = endpointEnum + "/" + apiEndPoint;
        let hmac = new HmacSigningHandler('GET', this.config.applicationID, this.config.applicationKey, this.config.realm, this.config.apiVersion, url);

        let jsonResponse = {};

        await this.instance.get(url, {
            headers: hmac.getHeaders() }).then(response => {
          console.log(response.data);
          jsonResponse = response.data;
        })
        .catch(error => {
          console.log(error);
          jsonResponse = response.data;
        });

        return jsonResponse;
    }

    post = async (postData, endpointEnum) => {

        let url = endpointEnum;
        let hmac = new HmacSigningHandler('POST', this.config.applicationID, this.config.applicationKey, this.config.realm, this.config.apiVersion, url, postData);

        let jsonResponse = {};

        await this.instance.post(url, postData, {
            headers: hmac.getHeaders() }).then(response => {
          console.log(response.data);
          jsonResponse = response.data;
        })
        .catch(error => {
          console.log(error);
          jsonResponse = response.data;
        });

        return jsonResponse;
    }

    put = async (apiEndPoint, endpointEnum) => {
        return apiEndPoint;
    }

}


module.exports = {
    apiEndpointEnum: apiEndpointEnum,
    ApiClient: ApiClient
}

