module.exports = function(app, env){
    const db = require(`../db/${env.DB}`);

    //Check if can reach Server
    app.get('/test-db', async (req, res) => {
        console.log('ENDPOINT: test-db')

        try {
            let result = await db.testConnection();
            
            res.send(result.data);
        } catch(e) {
            console.log(e);
            res.send({message: 'Error communicating to DB'});
        }
    })

}