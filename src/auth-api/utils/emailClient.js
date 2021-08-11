const dotenv = require('dotenv');
const SibApiV3Sdk = require('sib-api-v3-sdk');

class Email {
  constructor(){
    dotenv.config()
    this.defaultClient = SibApiV3Sdk.ApiClient.instance;
    this.apiKey = this.defaultClient.authentications['api-key'];
    this.apiKey.apiKey = process.env.EMAIL_API_KEY;
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    this.sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    this.sendSmtpEmail.sender = {"name":"Dipen Vadodaria","email":"dipen.vadodaria@pridevel.com"};
    this.sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
    this.sendSmtpEmail.replyTo = {"email":"virat.shah@pridevel.com","name":"Virat Shah"};
    this.sendSmtpEmail.subject = "{{params.Subject}}";
    this.sendSmtpEmail.htmlContent = `<html> <body> <h1> {{params.Header}} </h1> <a href={{params.Link}}> {{params.LinkText}} </a> <small> This link is only valid for the next 24 hours. </small> </body> </html>`;
  }

  resetPassword = async function (userEmail, username, resetLink){
    this.sendSmtpEmail.to = [{"email": userEmail,"name": username}];
    this.sendSmtpEmail.params = {
      "Header": "Reset your PolySets password",
      "Subject": "[Polyset] Please reset your password",
      "Link": resetLink,
      "LinkText": "Click here to reset your password."
    };
    await this.apiInstance.sendTransacEmail(this.sendSmtpEmail).then((data)=>{
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      return {success:true, data};
    }, (error)=>{
      console.error(error);
      return {success:true, error};
    });
  }
  
  verifyEmail = async function(userEmail, username, verifyLink){
    this.sendSmtpEmail.to = [{"email": userEmail,"name": username}];
    this.sendSmtpEmail.params = {
      "Header": "Reset your PolySets password",
      "Subject": "[Polyset] Please reset your password",
      "Link": verifyLink,
      "LinkText": "Click here to reset your password."
    };
    this.apiInstance.sendTransacEmail(this.sendSmtpEmail).then((data)=>{
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      return {success: true, data};
    }, (error)=>{
      console.error(error);
      return {success: false, error};
    });

    testEmail = function(res,req) {
      this.sendSmtpEmail.to = [{"email":"viratwip@yahoo.com","name":"Virat Shah"}];
      this.sendSmtpEmail.subject = "My Test";
      this.sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
      this.sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};
      this.sendSmtpEmail.cc = [{"email":"virat.shah@pridevel.com","name":"Virat SHah"}];
      this.sendSmtpEmail.bcc = [{"email":"viratwfh@gmail.com","name":"Virat Shah"}];
      this.apiInstance.sendTransacEmail(this.sendSmtpEmail).then(function(data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        return res.json({success:true, json:JSON.stringify(data)})
      }, function(error) {
        console.error(error);
        return res.json({success:false, json:JSON.stringify(error)})
      });
    }
  }
}
Email = new Email();
module.exports = Email;

