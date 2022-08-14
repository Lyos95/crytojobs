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
    const job = await JobCard.findOne({ idEdit: req.body.post.idEdit });

    if(job.code === req.body.code && job.companyEmail === req.body.email) {
        job.overwrite(req.body.post);
        if(job.status === 'bundle'){
            job.status = 'live';
            job.creationDate = new Date();
        }
        if(req.body.post.images[0]){
            job.logo = req.body.post.images[0];
        }
        job.save();
        res.status(200).json({ status: 'Completed'});
    }else{
        console.log("JOB NOT FOUND")
        res.status(400).json({ status: 'Completed'});
    }


}
