const dotenv = require('dotenv');
const SibApiV3Sdk = require('sib-api-v3-sdk');

class Email {
  constructor(){
    dotenv.config()
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.EMAIL_API_KEY;
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = {"name":"Dipen Vadodaria","email":"dipen.vadodaria@pridevel.com"};
    sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
    sendSmtpEmail.replyTo = {"email":"virat.shah@pridevel.com","name":"Virat Shah"};
    sendSmtpEmail.subject = "{{params.Subject}}";
    sendSmtpEmail.htmlContent = `<html> <body> <h1> {{params.Header}} </h1> <a href={{params.Link}}> {{params.LinkText}} </a> <small> This link is only valid for the next 24 hours. </small> </body> </html>`;
  }

  resetPassword(userEmail, username, resetLink){
    sendSmtpEmail.to = [{"email":userEmail,"name":username}];
    sendSmtpEmail.params = {
      "Header":"Reset your PolySets password",
      "Subject":"[Polyset] Please reset your password",
      "Link":resetLink,
      "LinkText":"Click here to reset your password."
    };
    apiInstance.sendTransacEmail(sendSmtpEmail).then((data)=>{
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, (error)=>{
      console.error(error);
    });
  }

  verifyEmail(userEmail, username, verifyLink){
    sendSmtpEmail.to = [{"email":userEmail,"name":username}];
    sendSmtpEmail.params = {
      "Header":"Reset your PolySets password",
      "Subject":"[Polyset] Please reset your password",
      "Link":verifyLink,
      "LinkText":"Click here to reset your password."
    };
    apiInstance.sendTransacEmail(sendSmtpEmail).then((data)=>{
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      return JSON.stringify(data);
    }, (error)=>{
      console.error(error);
    });

    
  }
}

export default Email;
sendSmtpEmail.subject = "My Test";
sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
sendSmtpEmail.to = [{"email":"viratwip@yahoo.com","name":"Virat Shah"}];
sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};
sendSmtpEmail.cc = [{"email":"virat.shah@pridevel.com","name":"Virat SHah"}];
sendSmtpEmail.bcc = [{"email":"viratwfh@gmail.com","name":"Virat Shah"}];


apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function(error) {
  console.error(error);
});
