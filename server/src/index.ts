import express from 'express';
import { getUserEmail, saveNewEmail } from './controller';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.route('/')
  .get(getUserEmail)
  .post(saveNewEmail);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});