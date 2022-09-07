// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { JobPostDetailsInterface } from './jobPostInterface';
import { Schema, model }  from 'mongoose';
import  connectMongo from '../../utils/connectMongo';
import JobCard from '../../models/jobPost';

export default async function getPostsPage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo();
  const {page, filters } = req.body;

  console.log('FILTERS',filters)
  let jobs;
  if(filters.length === 0){
    jobs = await JobCard.find().sort({ sticky: 1, creationDate: -1 }).skip((parseInt(page) - 1) * 10).limit(10);
  }else{
    jobs = await JobCard.find({searchTags: { $all: filters }}).sort({ sticky: 1, creationDate: -1 }).skip((parseInt(page) - 1) * 10).limit(10);
  }
  res.status(200).json({ status: 'Completed', jobs })
}
