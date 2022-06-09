
exports.handler = async function (context, event, callback) {
  const twilioClient = context.getTwilioClient();
  const axios = require('axios');

  // Query parameters or values sent in a POST body can be accessed from `event`
  const from = event.From;
  const to = event.To;
  const body = event.Body;

  twilioClient.messages
    .create({ body, to, from, statusCallback: `${context.BASE_URL}/smsStatusCallback` })
    .then((message) => {
      console.log('SMS successfully sent');
      console.log(message.sid);
      return callback(null, `Success! Message SID: ${message.sid}`);
    })
    .catch((error) => {
      console.log("errorCode:", error.code);

      if (error.code != null && error.code == '21610') {
        // for unsubscribes send voice notification
        axios
          .post(`${context.BASE_URL}/sendVoiceNotification`, {
            From: from,
            To: to,
            Body: body
          })
          .then(res => {
            console.log(`statusCode: ${res.status}`)
            return callback("", "Tried to send to unsubscribed user, call placed instead");
          })
          .catch(voiceNotiferror => {
            // Error with both SMS and Voice, log both and return original SMS error to API request
            console.error("Error with sending SMS:", error);
            console.error("Error with sending Call:", voiceNotiferror)
            return callback(error);
          })
      } else {
        // else log the error and return 500 to API request
        console.log("other error other and 21610");
        return callback(error);
      }
    });
};

