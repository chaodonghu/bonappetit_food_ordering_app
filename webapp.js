// Mount middleware to notify Twilio of errors
app.use(twilioNotifications.notifyOnError);