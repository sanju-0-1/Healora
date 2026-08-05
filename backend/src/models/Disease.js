import mongoose from 'mongoose';

const diseaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Disease name is required'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    symptoms: [
      {
        type: String,
        required: true,
        trim: true
      }
    ],
    precautions: [
      {
        type: String,
        trim: true
      }
    ],
    treatments: [
      {
        type: String,
        trim: true
      }
    ],
    doctorType: {
      type: String,
      required: [true, 'Doctor specialty type is required'],
      trim: true
    },
    severity: {
      type: String,
      enum: ['Low', 'Moderate', 'High', 'Critical'],
      default: 'Moderate'
    }
  },
  {
    timestamps: true
  }
);

const Disease = mongoose.model('Disease', diseaseSchema);
export default Disease;
