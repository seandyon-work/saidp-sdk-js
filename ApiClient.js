const axios = require('axios');
require('dotenv').config();
const moment = require('moment');
const CryptoJS = require('crypto-js');
const https = require('https');
const jtw_decode = require('jwt-decode');

const apiEndpointEnum = {auth:"auth", dfp_js:"dfp/js", dfp_validate:"dfp/validate", dfp_confirm:"dfp/confirm", 
    adaptauth:"adaptauth", accesshistory:"accesshistory", ipeval:"ipeval", users: "users"}
Object.freeze(apiEndpointEnum)


class Configuration {
    constructor() {
        this.applianceHost = process.env.applianceHost;
        this.appliancePort = process.env.appliancePort;
        this.applianceSSL = (process.env.applianceSSL === 'true');
        this.selfSigned = (process.env.selfSigned === 'true');
        this.realm = process.env.realm;
        this.applicationID = process.env.applicationID;
        this.applicationKey = process.env.applicationKey;
        this.apiVersion = 'api/v1';
        this.debug = (process.env.debug === 'true');
        this.titanUser = process.env.titanUser;
        this.titanPass = process.env.titanPass;
    }
}


class HmacSigningHandler {
    constructor(method, appId, appKey, realm, apiVersoin, endpoint, postData, debug) {
        
        this.utcExtTimeStamp =  moment.utc().format('ddd, DD MMM YYYY HH:mm:ss.SSS') + ' GMT';
        if(method === 'GET') {
            this.payload = [method, this.utcExtTimeStamp, appId, '/'+realm+'/'+apiVersoin+'/'+endpoint].join("\n");
            if(debug === true) { console.log(this.payload); }
        }
        if(method === 'POST') {
            this.payload = [method, this.utcExtTimeStamp, appId, '/'+realm+'/'+apiVersoin+'/'+endpoint, JSON.stringify(postData)].join("\n");
            if(debug === true) { console.log(this.payload); }
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

        this.agent = new https.Agent({  
            rejectUnauthorized: false
           });

        let url = {};

        if(this.config.applianceSSL === true) {
            url = 'https://' + this.config.applianceHost + ':' + this.config.appliancePort + '/'  + this.config.realm + '/' + this.config.apiVersion + '/';
        } else {
            url = 'http://' + this.config.applianceHost + ':' + this.config.appliancePort + '/'  + this.config.realm + '/' + this.config.apiVersion + '/';
        }

        if(this.config.selfSigned === true) { 
            this.instance = axios.create({
                baseURL: url,
                httpsAgent: this.agent
              });
        } else { 
            this.instance = axios.create({
                baseURL: url
              });
        }
    }

    getMobileSvc = async (apiEndPoint, endpointEnum) => {

        let jsonResponse = {};

        const options = {
            url: 'https://us-services.secureauth.com/oauth/v1/token?grant_type=client_credentials',
            method: 'post',
            auth: {
                username: this.config.titanUser,
                password: this.config.titanPass,
                }
            };
        
             const resp = await axios(options);
             const decoded_token = jtw_decode(resp.data.access_token);
            if(this.config.debug === true) { console.log(decoded_token.domid); }
    
             const options2 = {
                url: 'https://' + decoded_token.domid + '.secureauth.com/mobilesvc/api/v1.0/user/'+apiEndPoint,
                method: 'get',
                headers: {
                   'Authorization': 'Bearer ' +resp.data.access_token
               }
            }

            await axios(options2).then(result => {
                console.log(result.data);
                jsonResponse = result.data;
            }).catch(error => {
                console.log(error.response.data);
                jsonResponse = error.response.data;
            });

            return jsonResponse;
    }

    postMobileSvc = async (postData, endpointEnum) => {

        let jsonResponse = {};

        const options = {
            url: 'https://us-services.secureauth.com/oauth/v1/token?grant_type=client_credentials',
            method: 'post',
            auth: {
                username: this.config.titanUser,
                password: this.config.titanPass,
                }
            };
        
             const resp = await axios(options);
             const decoded_token = jtw_decode(resp.data.access_token);
            if(this.config.debug === true) { console.log(decoded_token.domid); }
    
             const options2 = {
                url: 'https://' + decoded_token.domid + '.secureauth.com/mobilesvc/api/v1.0/'+endpointEnum,
                method: 'post',
                headers: {
                   'Authorization': 'Bearer ' +resp.data.access_token
               },
               data: postData
            }

            await axios(options2).then(result => {
                console.log(result.data);
                jsonResponse = result.data;
            }).catch(error => {
                console.log(error.response.data);
                jsonResponse = error.response.data;
            });

            return jsonResponse;
    }
    
    get = async (apiEndPoint, endpointEnum) => {

        let url = endpointEnum + "/" + apiEndPoint;
        let hmac = new HmacSigningHandler('GET', this.config.applicationID, this.config.applicationKey, this.config.realm, this.config.apiVersion, url, '', this.config.debug);

        let jsonResponse = {};

        await this.instance.get(url, { headers: hmac.getHeaders() }).then(response => {
        if(this.config.debug === true) { console.log(response.data); }
        jsonResponse = response.data;
        })
        .catch(error => {
            console.log(error.response.data);
            jsonResponse = error.response.data;
        });
        
        return jsonResponse;
    }

    post = async (postData, endpointEnum) => {

        let url = endpointEnum;
        let hmac = new HmacSigningHandler('POST', this.config.applicationID, this.config.applicationKey, this.config.realm, this.config.apiVersion, url, postData, this.config.debug);

        let jsonResponse = {};

        await this.instance.post(url, postData, { headers: hmac.getHeaders() }).then(response => {
            if(this.config.debug === true) { console.log(response.data); }
            jsonResponse = response.data;
        })
        .catch(error => {
            console.log(error.response.data);
            jsonResponse = error.response.data;
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

