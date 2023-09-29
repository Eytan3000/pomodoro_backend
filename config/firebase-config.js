const admin = require("firebase-admin");
const { serviceAccountData } = require("./serviceAccount");

const serviceAccount = require('./serviceAccount');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
 
module.exports = admin;