var config = require('./config');

module.exports.sendSms = function(message) {
  var client = require('twilio')(config.accountSid, config.authToken);
  // console.log(client.api.messages.create())
  return client.api.messages
    .create({
      body: message,
      to: '+16475487425',
      from: config.sendingNumber
    }).then(function(data) {
      console.log('Administrator notified');
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
};