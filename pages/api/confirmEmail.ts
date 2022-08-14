// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { JobPostDetailsInterface } from './jobPostInterface';
import { Schema, model }  from 'mongoose';
import  connectMongo from '../../utils/connectMongo';
import JobCard from '../../models/jobPost';
import nodemailer from "nodemailer";


const sendEmail = (email: string,props:any) => {
    console.log(props);
    console.log(email)
    var transporter = nodemailer.createTransport({
        host: 'mail.privateemail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'support@cryptojobsportal.com', // your domain email address
          pass: 'estanamesclodico1' // your password
        }
      });
  
    const html = `
    <html>  
      <body>
        <h3>Edit code - ${props.title}</h3>
        <p>
            For editing the post ${props.title}, with the id ${props.idEdit}, use de code below:<br>
            <b>Code</b>: ${props.code}<br>
            Note: This code will expire in 15 minutes.
        </p>
      </body>
    </html>
    `
    const mailOptions = {
      from: 'support@cryptojobsportal.com',
      to: email,
      subject: `Crypto Jobs - Edit Code - ${props.title} 📝`,
      html: html
    };
      return {mailOptions: mailOptions,transporter: transporter};
  };

export default async function getJob(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo();
  const job = await JobCard.findOne({idEdit: req.body.id });
  const email = req.body.email;
  if(job && job.companyEmail === email){
    const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      job.code = code;
      job.codeDate = new Date();
      job.save();
      const {transporter , mailOptions} = sendEmail(email,{title: job.title,idEdit: job.idEdit,code: code});

      console.log({title: job.title,idEdit: job.idEdit,code: code})
      transporter.sendMail(mailOptions, (err:any) => {
        if (err) {
           const {transporter , mailOptions} = sendEmail(email,{title: job.title,idEdit: job.idEdit,code: code});
          transporter.sendMail(mailOptions)
          res.status(200).json({ status: 'Completed' })
        }else{
            console.log('Email sent');
            res.status(200).json({ status: 'Completed' })
        }
      });
    }else{
        res.status(200).json({ status: 'Completed' })
    }
}
