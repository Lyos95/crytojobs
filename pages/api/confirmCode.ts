// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { JobPostDetailsInterface } from './jobPostInterface';
import { Schema, model }  from 'mongoose';
import  connectMongo from '../../utils/connectMongo';
import JobCard from '../../models/jobPost';
import nodemailer from "nodemailer";


const sendEmail = (email: string,props:any) => {
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
  const code = req.body.code;
  if(job && job.companyEmail === email && job.codeDate){
    const startDate = job.codeDate;
    // Do your operations here
    const endDate   = new Date();
    const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    const minutes = Math.abs(Math.round(seconds / 60));
    if(minutes < 15 && job.code === code){
        res.status(200).json({ status: 'Completed',job })
    }

}
res.status(400).json({ status: 'Failed' })
}
