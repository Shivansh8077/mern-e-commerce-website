const nodeMailer = require('nodemailer')

const sendEmail = async function (options) {
     
    const transporter = nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_EMAIL,
            pass:process.env.SMPT_PASSWORD
        }


     })

     const mailOptions = {
        from: process.env.SMPT_EMAIL,
        to:options.email,
        subject:options.subject,
        text:options.message


     }

    await transporter.sendMail(mailOptions);


}

module.exports = sendEmail;