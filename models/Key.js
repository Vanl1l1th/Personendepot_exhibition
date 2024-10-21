import mongoose from 'mongoose';

const{Number,Date} = mongoose.Schema.Types;



const KeySchema = new mongoose.Schema({
  person:{
    type: Number,
    required: true
  },
  code:{
    type: String,
    required: true
  }
})

export default mongoose.models.Key || mongoose.model('Key',KeySchema)
