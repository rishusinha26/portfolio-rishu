import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Experience from '../models/Experience.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const run = async () => {
  const mongoUri = (process.env.MONGO_URI || '').trim();
  if (!mongoUri) {
    throw new Error('MONGO_URI is missing in backend/.env');
  }

  await mongoose.connect(mongoUri);

  const doc = {
    type: 'work',
    title: 'Aurora Club - Theatrical Club of SIT',
    organization: 'Siddagange Institute of Technology',
    location: 'Tumakuru, Karnataka',
    startDate: new Date('2024-01-01'),
    endDate: null,
    current: true,
    description:
      'Core member leading activities, mentoring juniors, and coordinating productions and events.',
    skills: ['Leadership', 'Event Coordination', 'Mentoring', 'Team Collaboration', 'Communication'],
    order: 4,
  };

  const result = await Experience.updateOne(
    { type: 'work', title: doc.title },
    { $set: doc },
    { upsert: true }
  );

  console.log('Upserted Aurora Club work experience');
  console.log(result);

  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error('Failed to upsert Aurora Club experience:', error.message);
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
  process.exit(1);
});
