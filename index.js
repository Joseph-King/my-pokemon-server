const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
if(process.env.ENV === 'dev'){
    app.use(cors());
} else {
    var corOptions = {
        origin: (origin, callback) => {
            if(process.env.ALLOWED_ORIGNS.indexOf(origin) !== -1){
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        optionsSuccessStatus: 204
    }
    app.use(cors(corsOptions));
}

app.use(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(`ORIGIN: ${req.headers.origin}`);
    console.log(`PATH: ${req.originalUrl}`);

    if(!authHeader){
        let err = new Error('You are not authenticated!');
        err.status = 401
        return next(err);
    }

    console.log(`AUTH: ${authHeader}`);

    try {
        let result = await require(`./auth/${process.env.AUTH}`)(authHeader, process.env);

        if(result.res === true){
            console.log('AUTH_RES: Authenticated');
            next();
        } else {
            console.log('AUTH_RES: Not Authenticated');
            let err = new Error('You are not authenticated!');
            err.status = 401;
            return next(err);
        }
    } catch(err) {
        console.log('Catch error, Not Authenticated');
        return next(err);
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server Listening at port: ${PORT}`);
})