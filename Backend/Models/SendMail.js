import nodemailer from 'nodemailer'
module.exports.sendMail=async function sendMail(str,data){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
       secure: true,
        auth: {
          user: 'hk5738058@gmail.com',
          pass: 'ftmdkpssmubhnqun'
        }
      });
      var Osubject,Ohtml;
      if(str=='signup'){
          Osubject=`Thankyou for signing ${data.name}`
          Ohtml=`<h1> ${data.name} Welcome to Keep-Notes community<h1/>
          name:${data.name} <br/>
          email:${data.email} <br/>             `
      }
      let info=await transporter.sendMail({
        from:'Keep Notes',
        to:data.email,
        subject:Osubject,
        html:Ohtml
      })
      console.log('message sent',info.messageId);
 }