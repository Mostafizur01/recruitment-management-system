import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  attributes: [{
    attributeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attribute', 
      required: true
    },
    value: {
      type: mongoose.Schema.Types.Mixed, 
      required: true
    }
  }],
  version: {
    type: Number,
    default: 1
  }
}, {timestamps: true})

const Profile = mongoose.model('Profile', profileSchema)
export default Profile