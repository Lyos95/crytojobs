// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { JobPostDetailsInterface } from './jobPostInterface';
import { Schema, model }  from 'mongoose';
import  connectMongo from '../../utils/connectMongo';
import JobCard from '../../models/jobPost';
import nodemailer from 'nodemailer';

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
      <h3>Thank you for purchading a bundle with us ${email}!</h3>
      <p>
        Here you have the links of your job posts.They won't be active until you fill all the remaining information<br>
        ${props.html}
        <br>
        PD: Please, if you delete this email save the link and the code or you will not be able to edit the job anymore.
        </p>
    </body>
  </html>
  `
  const mailOptions = {
    from: 'support@cryptojobsportal.com',
    to: email,
    subject: 'Crypto Jobs - Bundle 🎉',
    html: html
  };
    return {mailOptions: mailOptions,transporter: transporter};
};

const createBundleJob = async(body:any) => {
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
        price: body.price,
        jobDescription: body.jobDescription,
        searchTags: [body.tag1, body.tag2, body.tag3, body.tag4, body.tag5, body.jobType,body.jobOfficePolicy]
      });
      
      let randomID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      let randomIDEdit = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      let jobPostFound = await JobCard.find({'id': randomID});
      let jobPostEditFound = await JobCard.find({'id': randomIDEdit});
    
      while(jobPostFound.length > 0 && jobPostEditFound.length > 0 ) {
        randomID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        randomIDEdit = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        jobPostFound = await JobCard.find({'id': randomID});
        jobPostEditFound = await JobCard.find({'id': randomIDEdit});
      }
      newJobPost.id = randomID;
      newJobPost.idEdit = randomIDEdit;
      newJobPost.state = 'bundle';
      await newJobPost.save();
      return {
        id: newJobPost.idEdit,
        email: newJobPost.companyEmail,
        code: newJobPost.code
      }
}

export default async function getPostsPage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo();
  const body:any = req.body;
  let html = ``;
    for(let i = 0; i < body.bundleValue; i++) {
      const {code,email,id} = await createBundleJob(body);
      html += 
      `<a href="https://www.cryptojobsportal.com/edit-job?${id}">https://www.cryptojobsportal.com/edit-job?${id}</a><br>
      - Email: ${email} <br>
      - Code: ${code}<br>`
    }
 
    sendEmail(body.companyEmail,{html: html});
  res.status(200).json({ status: 'Completed' })
}
