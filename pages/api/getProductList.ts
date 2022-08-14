// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { JobPostDetailsInterface } from './jobPostInterface';
import { Schema, model }  from 'mongoose';
import  connectMongo from '../../utils/connectMongo';
import JobCard from '../../models/jobPost';
const stripe = require('stripe')("sk_test_51LMWfGDsPNfwkE4bp07Xkt7tFrEB7l6lDRGhmODonDjv3NfcbFNNJwqMqQU7YU6JrukALAKmZC7tCnbKuzTPGCuB00v7Sy9dIk")

export default async function getJob(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const products = await stripe.products.list();
  const prices = await stripe.prices.list();

  const list:any = {};
  for (let j = 0; j < products.data.length; j++) {
    let product = products.data[j];
    for (let i = 0; i < prices.data.length; i++) {
      if (prices.data[i].product === product.id) {
        list[product.name] = {
          id: prices.data[i].id,
          price: prices.data[i].unit_amount / 100,
        };
      }
    }
  }

  res.status(200).json({ status: 'Completed',  list})
}
