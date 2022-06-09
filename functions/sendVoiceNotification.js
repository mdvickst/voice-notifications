exports.handler = function (context, event, callback) {
    const from = event.From;
    const to = event.To;
    const body = event.Body;
    const twiml = `<Response><Say>${body}</Say></Response>`;

    const twilioClient = context.getTwilioClient();

    twilioClient.calls
        .create({
            twiml: twiml,
            to: to,
            from: from,
            machineDetection: 'DetectMessageEnd'
        })
        .then((call) => {
            console.log('Call successfully placed');
            console.log(call.sid);
            return callback(null, `Success! Call SID: ${call.sid}`);
        })
        .catch((error) => {
            console.error(error);
            return callback(error);
        });
};
