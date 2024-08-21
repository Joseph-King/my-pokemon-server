const axios = require('axios');

const config = {
    url: process.env.DB_URL,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
}

module.exports = {
    testConnection(){
        return new Promise((resolve, reject) => {
            let headers = {
                'Authorization': `Basic ${Buffer.from(`${config.user}:${config.pass}`).toString('base64')}`,
                'Content-Type': 'application/json'
            };

            axios.get(config.url, { headers: headers })
                .then((resp) => {
                    resolve(resp);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}

