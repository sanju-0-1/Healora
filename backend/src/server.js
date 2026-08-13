import 'dotenv/config';
import connectDB from './config/db.js';
import app from './app.js';


const PORT = process.env.PORT || 5000;

// Connect to MongoDB & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[MediSense Server]: Running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('[Server Initialization Error]:', err);
});
