module.exports = function(authHeader, env){
    return new Promise((resolve, reject) => {
        const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        const user = auth[0];
        const pass = auth[1];

        if(env.USER === user && env.PASS === pass){
            let result = {
                res: true,
                user: user ? user : undefined
            };

            resolve(result);
        } else {
            let result = {
                res: false,
                user: user ? user : undefined
            }
        }
    })
}