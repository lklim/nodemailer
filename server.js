// https://w3collective.com/react-contact-form/
// https://www.crazydomains.sg/help/article/550-blocked-error-explained
// https://resend.com/docs/send-with-nodemailer-smtp
// https://render.com/docs/deploy-node-express-app
// http://cron-job.org/

const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

SMTP_HOST="smtp.mail.yahoo.com";
SMTP_PORT=465;
SMTP_SERVICE="yahoo";

  const contactEmail = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: 'resend',
      pass:'re_LB79ju62_MLFvEWALLT1drr5bVJ6tmdr2',
    },
    debug: false,
    logger: true
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

  router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
      from: "johnlim@advancedtechsys.co",
      to: "enquiry@advancedtechsys.co",
      subject: `"Contact Form Submission for " ${name}`,
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: error.message });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });