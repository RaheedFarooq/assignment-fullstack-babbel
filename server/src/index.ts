import express from 'express';
import { getUserEmail } from './controller';

const app = express();
const PORT = process.env.PORT || 3000;

app.route('/')
  .get(getUserEmail);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});