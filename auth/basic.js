module.exports = function(authHeader, env){
    return new Promise((resolve, reject) => {
        const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        const user = auth[0];
        const pass = auth[1];

        console.log(user);
        console.log(env.USERNAME);
        console.log(pass);
        console.log(env.PASSWORD);
        
        if(env.USERNAME === user && env.PASSWORD === pass){
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

            resolve(result);
        }
    })
}