import nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'tassistant4@gmail.com',
           pass: '123lalaLa'
       }
   });

   const mailOptions = {
    from: 'tassistant4@gmail.com',
    to: '', 
    subject: '',
    html: ''
  };

export function send(name: any, subject:any, content:any){
    mailOptions.to = name;
    mailOptions.subject = subject;
    mailOptions.html = '<p>' + content + '</p>';
    transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
}

