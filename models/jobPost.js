import { Schema, model, models } from 'mongoose';

const JobCardSchema = new Schema({
    id: {
      type: String,
      required: true,
      unique: true,
    },
    state: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    triesLeft: {
      type: Number,
      default: 3,
    },
    idEdit: {
      type: String,
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    location: {
      type: String,
    },
    minSalary: {
      type: Number
    },
    maxSalary: {
      type: Number
    },
    rate: {
      type: String
    },
    applyUrl: {
      type: String,
    },
    applyEmail: {
      type: String
    },
    companyTwitter: {
      type: String
    },
    companyEmail: {
      type: String,
      required: true,
    },
    invoiceNotes: {
      type: String,
    },
    jobType: {
      type: String,
    },
    tag1: {
      type: String,
    },
    tag2: {
      type: String,
    },
    tag3: {
      type: String,
    },
    tag4: {
      type: String,
    },
    tag5: {
      type: String,
    },
    jobOfficePolicy: {
      type: String,
    },
    customBrandColor: {
      type: Boolean
    },
    specifySalary: {
      type: Boolean,
    },
    brandColor: {
      type: String
    },
    sticky: {
      type: String
    },
    logo: {
      type: String
    },
    price: {
      type: String
    },
    imagePurchased: {
      type: Boolean
    },
    codeDate: {
      type: Date,
      default: null,
    },
    jobDescription: { type : Array , "default" : [] },
    creationDate: {
      type: Date,
      default: Date.now
    },
    searchTags: {
      type: Array,
      "default" : []
    },
    removeDate: {
      type: Date
    },
    stripeSessionId: {
      type: String
    },
    subscriptionId: {
      type: String
    },
    stripeUrl: {
      type: String
    }
  });

const JobCard = models.jobCard || model('jobCard', JobCardSchema);

export default JobCard;