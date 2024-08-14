module.exports = function(app, env){

    //Check if can reach Server
    app.get('/', async (req, res) => {
        console.log('ENDPOINT: discovery')
        res.send({ "message": `${env.NODE_ENV} - You have successfully reached the Server`});
    })

}