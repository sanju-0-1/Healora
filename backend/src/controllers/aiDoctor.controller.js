import { getDoctorResponse } from '../services/gemini.service.js';
import DoctorChat from '../models/DoctorChat.js';

/**
 * @desc    Chat with Dr. Healora AI Doctor
 * @route   POST /api/ai-doctor/chat
 * @access  Public / Optional Auth
 */
export const chatWithDoctor = async (req, res, next) => {
  try {
    const { message, history = [], medicalContext = null, sessionId } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Message content is required.'
      });
    }

    // Call Gemini Service
    const aiResult = await getDoctorResponse({
      history,
      userPrompt: message,
      medicalContext
    });


    if (!aiResult.success && aiResult.needsApiKey) {
      return res.status(200).json({
        success: false,
        needsApiKey: true,
        response: aiResult.response,
        message: 'Gemini API Key is missing.'
      });
    }

    if (!aiResult.success) {
      return res.status(500).json({
        success: false,
        message: aiResult.error || 'Failed to get doctor response',
        response: aiResult.response
      });
    }

    let activeSessionId = sessionId;

    // If user is authenticated, automatically persist or update the chat session in database
    if (req.user && req.user._id) {
      try {
        let chatSession;
        if (sessionId) {
          chatSession = await DoctorChat.findOne({ _id: sessionId, user: req.user._id });
        }

        if (!chatSession) {
          const firstTopic = message.length > 35 ? `${message.substring(0, 35)}...` : message;
          chatSession = new DoctorChat({
            user: req.user._id,
            title: medicalContext?.diseaseName ? `Consultation: ${medicalContext.diseaseName}` : `Topic: ${firstTopic}`,
            messages: [],
            activeDiseaseContext: medicalContext
          });
        }

        // Push user message and doctor message
        chatSession.messages.push({
          sender: 'user',
          text: message,
          timestamp: new Date(),
          medicalContext
        });

        chatSession.messages.push({
          sender: 'doctor',
          text: aiResult.response,
          timestamp: new Date()
        });

        await chatSession.save();
        activeSessionId = chatSession._id;
      } catch (dbErr) {
        console.error('[DoctorChat Persistence Error]:', dbErr);
      }
    }

    return res.status(200).json({
      success: true,
      response: aiResult.response,
      modelUsed: aiResult.modelUsed,
      sessionId: activeSessionId
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's past AI doctor chat sessions
 * @route   GET /api/ai-doctor/history
 * @access  Private
 */
export const getChatHistory = async (req, res, next) => {
  try {
    const sessions = await DoctorChat.find({ user: req.user._id })
      .sort({ updatedAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single chat session details
 * @route   GET /api/ai-doctor/history/:sessionId
 * @access  Private
 */
export const getChatSession = async (req, res, next) => {
  try {
    const session = await DoctorChat.findOne({
      _id: req.params.sessionId,
      user: req.user._id
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    res.status(200).json({
      success: true,
      data: session
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a chat session
 * @route   DELETE /api/ai-doctor/history/:sessionId
 * @access  Private
 */
export const deleteChatSession = async (req, res, next) => {
  try {
    const session = await DoctorChat.findOneAndDelete({
      _id: req.params.sessionId,
      user: req.user._id
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Chat session deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Verify Gemini API Key configuration status
 * @route   GET /api/ai-doctor/status
 * @access  Public
 */
export const getAiDoctorStatus = async (req, res) => {
  const hasEnvKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');
  res.status(200).json({
    success: true,
    hasApiKey: hasEnvKey,
    doctorName: 'Dr. Healora',
    specialty: 'Chief AI Clinical Consultant',
    supportedModels: ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash']
  });
};
