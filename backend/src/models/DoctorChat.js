import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'doctor'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  medicalContext: {
    diseaseName: String,
    symptoms: [String],
    confidence: Number
  }
});

const doctorChatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      default: 'General Medical Consultation'
    },
    messages: [messageSchema],
    activeDiseaseContext: {
      diseaseName: String,
      symptoms: [String]
    }
  },
  {
    timestamps: true
  }
);

const DoctorChat = mongoose.model('DoctorChat', doctorChatSchema);
export default DoctorChat;
