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


  console.log(req)
  const job = await JobCard.findOne({ id: req.query.id });


  res.status(200).json({ status: 'Completed',  job})
}
