// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { JobPostDetailsInterface } from './jobPostInterface';
import { Schema, model }  from 'mongoose';
import  connectMongo from '../../utils/connectMongo';
import JobCard from '../../models/jobPost';


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
      jobDescription: Array<JobSection>
}


export default async function getPostsPage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo();
  const body:Job = req.body;
 
  

  let jobPostEditFound = await JobCard.find({'id': randomIDEdit});

  await newJobPost.save();


  res.status(200).json({ status: 'Completed' })
}
