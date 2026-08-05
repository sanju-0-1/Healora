import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    symptoms: [
      {
        type: String,
        required: true,
        trim: true
      }
    ],
    predictedDisease: {
      type: String,
      required: true
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    doctorType: {
      type: String,
      required: true
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

const Prediction = mongoose.model('Prediction', predictionSchema);
export default Prediction;
