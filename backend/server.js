const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(categoryRoutes);
app.use(equipmentRoutes);
app.use(profileRoutes); // Utiliser les routes du profil

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));