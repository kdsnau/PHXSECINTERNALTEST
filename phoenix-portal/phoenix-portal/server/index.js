require('dotenv').config();

const express = require('express');
const cors    = require('cors');

const authRoutes      = require('./routes/auth');
const ticketRoutes    = require('./routes/tickets');
const financialRoutes = require('./routes/financials');
const adminRoutes     = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 5000;

/* Middleware */
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

/* Routes */
app.use('/api/auth',       authRoutes);
app.use('/api/tickets',    ticketRoutes);
app.use('/api/financials', financialRoutes);
app.use('/api/admin',      adminRoutes);

/* Health check */
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

/* 404 catch-all */
app.use((_, res) => res.status(404).json({ error: 'Route not found.' }));

app.listen(PORT, () => {
    console.log(`Phoenix SecTech API running on port ${PORT}`);
});
