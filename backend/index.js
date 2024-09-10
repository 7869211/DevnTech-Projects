const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes'); 
const cors = require('cors');




app.use(cors({
  origin: 'http://localhost:3000'  
}));

app.use(cors());
dotenv.config();
app.use(express.json());

//user managemant
app.use('/api/users', userRoutes);

//posts management  
app.use('/api/posts', postRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
