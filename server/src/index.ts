import express from 'express';
import cors from 'cors';
import { getUserEmail, saveNewEmail } from './controller';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.route('/');

app.route('/email')
  .get(getUserEmail)
  .post(saveNewEmail);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});