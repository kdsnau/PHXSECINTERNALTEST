require('dotenv').config();

const express = require('express');
const cors    = require('cors');

const authRoutes      = require('./routes/auth');
const ticketRoutes    = require('./routes/tickets');
const financialRoutes = require('./routes/financials');
const adminRoutes     = require('./routes/admin');
const fleetRoutes     = require('./routes/fleet');
const importRoutes    = require('./routes/import');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth',       authRoutes);
app.use('/api/tickets',    ticketRoutes);
app.use('/api/financials', financialRoutes);
app.use('/api/admin',      adminRoutes);
app.use('/api/fleet',      fleetRoutes);
app.use('/api/import',     importRoutes);

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use((_, res) => res.status(404).json({ error: 'Route not found.' }));

app.listen(PORT, () => {
    console.log(`Phoenix SecTech API running on port ${PORT}`);
});