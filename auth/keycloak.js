module.exports = function(authHeader, env){
    const axios = require("axios");
    const https = require("https");

    return new Promise((resolve, reject) => {
        let axiosData = {
            headers: {
                Authorization: authHeader
            }
        }

        if(env.KC_UNAUTH === 'true'){
            axiosData['httpsAgent'] = new https.Agent({ rejectUnauthorized: false});
        }

        axios.get(`${env.KC_URL}realms/${env.KC_REALM}/protocol/openid-connect/userinfo`, axiosData)
            .then((res) => {
                if(res.status ? res.status !== 200 : false){
                    let result = {
                        res: false,
                        user: res.data.preferred_username ? res.data.preferred_username : undefined
                    };

                    resolve(result);
                } else {
                    let result = {
                         res: true,
                         user: res.data.preferred_username ? res.preferred_username : undefined
                    }

                    resolve(result);
                }
            })
            .catch((err) => {
                reject(err);
            })
    })
}