const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  eventPoster: {
    type: String,
    required: true,
  },
  isOnline: {
    type: Boolean,
    required: true,
  },
  timingStart: {
    type: String,
    required: true,
  },
  timingEnd: {
    type: String,
    required: true,
  },
  hostedBy: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  speakers: [
    {
      name: { type: String, required: true },
      profession: { type: String, required: true },
      photo: { type: String, required: true },
    },
     ],
     eventDetails: {
       type: String
     },
     dressCode: {
          type: String
     },
     ageRestrictions: {
          type: String,
          required: true
     },
     eventTags: [
          {
               type: String
          }
     ]
},
     {
     timestamps: true
     })

const Event = mongoose.model("Event", eventSchema)
     module.exports = Event