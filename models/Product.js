import mongoose from 'mongoose';

const{String, Number, Array} = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
  person:{
    type: Number,
    required: true
  },
  titel:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  mediaUrl:{
    type: Array,
    required:false
  },
  embededLink:{
    type: Array,
    required: false
  },
  status:{
    type: String,
    default: "offline"
  }
},
{
  timestamps: true
})

export default mongoose.models.Product || mongoose.model('Product',ProductSchema)
