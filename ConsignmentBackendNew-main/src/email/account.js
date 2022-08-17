const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = (email, proID, contnet, status)=>{
    sgMail.send({
        to:email,
        from:'',
        subject:"Order "+proID+" is "+status,
        text: contnet
    }).catch(e =>{
        console.log(e)
        })
}

const sendMailForService = (email, issueID, info, attachment, status)=>{
    sgMail.send({
        to:email,
        from:'',
        subject:"Service Request "+issueID+" is "+status,
        text: info,
        attachments:[{
            content: attachment,
            filename:"issue image",
            type:"image/jpg",
            disposition:"attachment"
        }]
    }).catch(e =>{
        console.log(e)
        })
    
}

const sendMailForEmailVerification = (email,name, secretCode)=>{
    sgMail.send({
        to:email,
        from:'',
        subject:"Verification Code ",
        text: "One Time Password For Verification, Please use this unique 4 characters :  ( "+secretCode+" )",
       
    }).catch(e =>{
        console.log(e)
        })
    }

module.exports = {
    sendMail,
    sendMailForService,
    sendMailForEmailVerification
}