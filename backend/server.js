const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const profileRoutes = require('./routes/profileRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', equipmentRoutes);
app.use('/api', profileRoutes);
app.use('/api', reservationRoutes);

app.use('/uploads/images', express.static('uploads'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));