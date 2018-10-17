// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, mongo, postgre, env } = require('./config/vars');
const sqldb = require('./config/sequelize');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

function startServer() {
    try {
        app.listen(port, async () => {
            console.info(`server started on port ${port} (${env})`)
        });
    } catch (err) {
        console.log(err, "this is the err");
    }
}


// Sequelize connection
if (postgre.enabled === 'true') {

    sqldb.sequelize.sync({
        force: false,
    })
        .then(startServer)
        .catch(function (err) {
            console.log('Server failed to start due to error: %s', err);
        });

}


/**
* Exports express
* @public
*/
module.exports = app;
