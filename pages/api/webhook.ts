// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { JobPostDetailsInterface } from './jobPostInterface';
import { Schema, model }  from 'mongoose';
import  connectMongo from '../../utils/connectMongo';
import JobCard from '../../models/jobPost';
import { buffer } from 'micro';
const stripe = require('stripe')("sk_test_51LMWfGDsPNfwkE4bp07Xkt7tFrEB7l6lDRGhmODonDjv3NfcbFNNJwqMqQU7YU6JrukALAKmZC7tCnbKuzTPGCuB00v7Sy9dIk")
const endpointSecret = "whsec_170edda23d4ff63b88588d6f846638d9ec329295738f09d4b244d61250da487c";

export const config = {
  api: {
    bodyParser: false,
  }
}

export default async function getJob(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const buf = await buffer(request);
  const payload = request.body;
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err:any) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
  let subscription;
  console.log(event.type);
  switch(event.type){
    case 'checkout.session.completed':
      subscription = event.data.object;
      
      console.log('checkout.session.completed');
      console.log(subscription)
    case 'payment_intent.succeeded':
      console.log('payment_intent.succeeded');
       subscription = event.data.object;
       console.log(subscription)
    default:
      console.log('default');
  }

  response.status(200);
}
