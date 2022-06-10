exports.handler = function (context, event, callback) {
  const twilioClient = context.getTwilioClient();
  const axios = require('axios');
  const smsStatus = event.SmsStatus;
  const smsTwilioErrors = {
    '30003': 'Unreachable destination handset',
    '30004': 'Message blocked',
    '30005': 'Unknown destination handset',
    '30006': 'Landline or unreachable carrier',
    '30007': 'Message filtered',
    '30008': 'Unknown error',
    '30017': 'Carrier network congestion',
    '30018': 'Destination carrier requires sender ID pre-registration',
    '30022': 'US A2P 10DLC - Rate Limits Exceeded',
    '30023': 'US A2P 10DLC - Daily Message Cap Reached carrier requires sender ID pre-registration',
    '30027': 'US A2P 10DLC - T-Mobile Daily Message Limit Reached'
  };

  console.log("Status Callback Received\n SmsStatus: ", smsStatus);

  if (event.SmsStatus === "undelivered") {
    let errorCode = event.ErrorCode;
    console.log("ErrorCode: ", errorCode);

    if (smsTwilioErrors.hasOwnProperty(errorCode)) {
      // retrieve Message and get original Body param
      twilioClient.messages(event.MessageSid)
        .fetch()
        .then(message => {
          // send a voice notification with that same body
          axios
            .post('/sendVoiceNotification', {
              From: event.From,
              To: event.To,
              Body: message.body
            })
            .then(res => {
              console.log(`statusCode: ${res.status}`)
              return callback(null, "");
            })
            .catch(error => {
              console.error("Could not send voice notification", error);
              return callback(error);
            })
        })
        .catch(error => {
          console.error("Could not retrieve message: ", error);
          return callback(error);
        })
    } else {
      console.log("not a voice notification relevant error");
      return callback(null, "Callback Received");
    }
  } else {
    return callback(null, "Callback Received");
  }
}
