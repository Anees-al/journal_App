import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: ['https://journal-app-kappa-rose.vercel.app', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

// Routes
import journalRoutes from './routes/journalRoutes.js';
import authRoutes from './routes/authRoutes.js';

app.use('/api/journals', journalRoutes);
app.use('/api/auth', authRoutes);

// Simple Health Check
app.get('/', (req, res) => {
    res.send('API is running (ES Modules)...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
