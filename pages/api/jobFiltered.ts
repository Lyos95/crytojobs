// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { JobPostDetailsInterface } from './jobPostInterface';
import { Schema, model }  from 'mongoose';
import  connectMongo from '../../utils/connectMongo';
import JobCard from '../../models/jobPost';
export default async function getJob(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo();

  const page: any = req.query.page;
  const filters: any = req.query.filters;
  //find jobs where the filters are present in the job tags
    const jobs = await JobCard.find({ tag1: { $in: filters }, tag2: { $in: filters }, tag3: { $in: filters }}).sort({ sticky: -1, creationDate: -1 }).skip((parseInt(page) - 1) * 10).limit(10);


  res.status(200).json({ status: 'Completed',  jobs})
}
