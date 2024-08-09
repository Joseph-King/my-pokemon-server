module.exports = async function(authHeader, env){
    return new Promise((resolve, reject) => {
        if(authHeader.startsWith('Basic')){
            require('./basic')(authHeader, env)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        } else if (authHeader.startsWith('Bearer')){
            require('./keycloak')(authHeader, env)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        }
    })
}