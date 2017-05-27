const dotenv = require('dotenv');
const fs = require('fs');
const admins = require('./config/administrators.json');
const config = require('./config');
const twilio = require('twilio');

//const accountSid = 'AC386f8187941ecd98308590f187a634e9';
//const authToken = '{{c8cbc10b0dbcc21bed3884d32808f941}}';

//const client = new twilio(accountSid, authToken);

//client.messages.create({
  //body: 'hello from node',
  //to: '+16475487425',
  //from: process.env.TWILIO_NUMBER
//}).then((message) => console.log(message.sid));




const cfg = {};

cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;
cfg.sendingNumber = process.env.TWILIO_NUMBER;

const requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber];
const isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  const
 errorMessage =
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

  throw new Error(errorMessage);
}

// Export configuration object
module.exports = cfg;