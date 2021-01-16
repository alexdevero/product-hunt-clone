const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_URI = process.env.DB_URI || 'mongodb://' + DB_USERNAME + ':' + DB_PASSWORD + '@foo.mlab.com:33763/fullstack-express-react-mongodb-app'

module.exports = {
    mongoDBUri: DB_URI
}
