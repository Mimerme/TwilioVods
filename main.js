const twilio = require('twilio');
const creds = require('./creds.js');
const runs = require('./lastrun.js');
const list = require('./list.js');
const exec = require('child_process').exec;



// console.log(creds.accountSid);
// console.log(creds.authToken);

const client = new twilio(creds.accountSid, creds.authToken);

list.load();

client.messages.list({
    limit: 20,
    to: creds.phoneNumber,
    dateSentAfter: runs.last_run()
  })
  .then(messages => messages.forEach(m => {
    // console.log(m.to)
    // console.log(m.body)
    try {
      parse_sms(m.body);
    } catch (e) {
      console.log("Failed to parse text \'%s\' from \'%s\'", m.body, m.from);
    }

    console.log(m.body);
  }));

function parse_sms(text) {
  if (text.slice(0, 3) == "new") {
    let arr = text.split(" ");
    list.new(arr[1]);
  } else if (text.slice(0, 4) == "down") {
    list.save();
    exec('youtube-dl',
      function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
  }
}