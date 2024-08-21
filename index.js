const express = require('express');
const app = express();

//Ingest JSON
app.use(express.json());

//ENV FILES
try {
    if(process.env.NODE_ENV)
        require('dotenv').config({ path: `./environment/${process.env.NODE_ENV}.env`});
    else
        require('dotenv').config({ path: `./environment/local-dev.env`});
} catch(e) {
    console.log('environment file does not exist in container, using local-dev.env');
    require('dotenv').config({ path: `./environment/local-dev.env`});
}

//CORS
const cors = require('cors');
if(process.env.ENV === 'dev'){
    app.use(cors());
} else {
    var corsOptions = {
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

//AUTH
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

//Endpoints
const discoveryEndpoint = require('./endpoints/discovery')(app, process.env);
const testEndpoints = require('./endpoints/test')(app, process.env);

//STARTS SERVER
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server Listening at port: ${PORT}`);
})