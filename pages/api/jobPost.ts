// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { JobPostDetailsInterface } from './jobPostInterface';
import { Schema, model }  from 'mongoose';
import  connectMongo from '../../utils/connectMongo';
import JobCard from '../../models/jobPost';
import nodemailer from 'nodemailer';
const stripe = require('stripe')("sk_test_51LMWfGDsPNfwkE4bp07Xkt7tFrEB7l6lDRGhmODonDjv3NfcbFNNJwqMqQU7YU6JrukALAKmZC7tCnbKuzTPGCuB00v7Sy9dIk")

type JobSection = {
  title: string,
  description: string
}

type Job = {
      companyName: string,
      position: string,
      location: string,
      minSalary: number,
      maxSalary:  number,
      applyUrl: string | null,
      applyEmail: string | null,
      companyTwitter: string | null,
      companyEmail: string,
      invoiceNotes: string,
      jobType: string,
      tag1: string,
      tag2: string,
      tag3: string,
      tag4: string,
      tag5: string,
      rate: string,
      jobOfficePolicy: string,
      customBrandColor: string | null,
      brandColor: string | null,
      sticky: string | null,
      images: Array<any>,
      price: number,
      specifySalary: boolean,
      jobDescription: Array<JobSection>,
      removeDate: Date | null,
      imagePurchased: boolean,
}

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
      <h3>Thank you for sharing an opportunity with our community ${email}!</h3>
      <p>
        If you want to edit it, please click on the link below.<br>
        <a href="https://www.cryptojobsportal.com/edit-job?${props.editEdit}">https://www.cryptojobsportal.com/edit-job?${props.editEdit}</a><br>
          - Email: ${email} <br>
          - Code: ${props.code}<br><br>

        PD: Please, if you delete this email save the link and the code or you will not be able to edit the job anymore.
        </p>
    </body>
  </html>
  `
  const mailOptions = {
    from: 'support@cryptojobsportal.com',
    to: email,
    subject: 'Crypto Jobs - Edit Link 📝',
    html: html
  };
    return {mailOptions: mailOptions,transporter: transporter};
};


export default async function getPostsPage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body:any = req.body;
  
  console.log(body.list)



  connectMongo();

  

 
  const newJobPost = new JobCard({
    companyName: body.companyName,
    title: body.position,
    location: body.location,
    minSalary: body.minSalary,
    maxSalary: body.maxSalary,
    rate: body.rate,
    applyUrl: body.applyUrl,
    applyEmail: body.applyEmail,
    companyTwitter: body.companyTwitter,
    companyEmail: body.companyEmail,
    invoiceNotes: body.invoiceNotes,
    jobType: body.jobType,
    tag1: body.tag1,
    tag2: body.tag2,
    tag3: body.tag3,
    tag4: body.tag4,
    tag5: body.tag5,
    jobOfficePolicy: body.jobOfficePolicy,
    customBrandColor: body.customBrandColor,
    brandColor: body.brandColor,
    sticky: body.sticky,
    logo: body.images[0],
    imagePurchased: body.images[0] ? true : false,
    price: body.price,
    jobDescription: body.jobDescription,
    specifySalary: body.specifySalary,
    searchTags: [body.tag1, body.tag2, body.tag3, body.tag4, body.tag5, body.jobType,body.jobOfficePolicy],
    code: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
  });
  
  let randomID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  let randomIDEdit = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  let jobPostFound = await JobCard.find({'id': randomID});
  let jobPostEditFound = await JobCard.find({'id': randomIDEdit});

  while(jobPostFound.length > 0 && jobPostEditFound.length > 0 ) {
    randomID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+Math.random().toString(36).substring(2, 15)+Math.random().toString(36).substring(2, 15);
    randomIDEdit = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+Math.random().toString(36).substring(2, 15)+Math.random().toString(36).substring(2, 15);
    jobPostFound = await JobCard.find({'id': randomID});
    jobPostEditFound = await JobCard.find({'id': randomIDEdit});
  }
  newJobPost.id = randomID;
  newJobPost.idEdit = randomIDEdit;
  newJobPost.state = 'pending';
  let date = new Date(); 
  date.setDate(date.getDate() + 30);
  newJobPost.removeDate = date;

  // const {transporter , mailOptions} = sendEmail(body.companyEmail,{editEdit: newJobPost.idEdit, code: newJobPost.code});
  // transporter.sendMail(mailOptions, (err:any) => {
  //   if (err) {
  //     const {transporter , mailOptions} = sendEmail(body.companyEmail,{editEdit: newJobPost.idEdit, code: newJobPost.code});
  //     transporter.sendMail(mailOptions)
  //   }
  // })
   await newJobPost.save();

   const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    success_url: 'http://localhost:3000/thankyouPage',
    cancel_url: 'https://example.com/cancel',
    line_items: body.list,
    metadata: {
      job: String(newJobPost.id)
    }
  })
  res.status(200).json({ status: 'Completed', url: session.url })
  console.log(session)
  // res.status(200).json({ status: 'Completed' })
}
