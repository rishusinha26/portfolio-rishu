import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Sample Projects Data
const sampleProjects = [
  {
    title: 'FinFlow - AI Powered Personal Finance Companion',
    description: 'Built a full-stack personal finance web application to simplify money management by helping users track expenses, manage investments, and monitor debts in one unified platform. Integrated real-time synchronization, secure authentication, AI-driven insights, interactive dashboards, and a chatbot assistant for personalized financial guidance and improved user engagement.',
    techStack: ['Node.js', 'NumPy', 'Pandas', 'Matplotlib', 'LRM Model', 'Firebase'],
    githubUrl: 'https://github.com/rishusinha26/fin-flow1',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    featured: true,
    order: 1
  },
  {
    title: 'CareerMitra – AI-Powered Educational Guidance Platform',
    description: 'Full-stack educational guidance platform addressing the lack of personalized mentorship, limited college awareness, and missed deadlines by providing a centralized hub for career discovery, college search, and application tracking. Features AI-powered aptitude quizzes, personalized career recommendations, searchable college directory, deadline tracker, multilingual support, dark/light mode, voice assistant, and secure authentication.',
    techStack: ['Node.js', 'MongoDB', 'Firebase'],
    githubUrl: 'https://github.com/rishusinha26/SIH-HACK',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
    featured: true,
    order: 2
  },
  {
    title: 'WasteNot: AI-Powered Food Waste Reduction Platform',
    description: 'Built WasteNot, a modern food waste reduction platform designed to minimize food loss by connecting farms, restaurants, and food banks, while providing clear impact tracking and user engagement metrics. Features home page with hero banner and stats, 3-step process, testimonials, newsletter signup, About & Contact pages, sticky header, mobile menu, dark/light mode, animations, WCAG 2.1 AA compliance, and Firebase authentication.',
    techStack: ['Next.js 15+', 'TypeScript', 'TailwindCSS', 'shadcn/ui', 'React Hook Form', 'Zod', 'next-themes', 'Inter font', 'Firebase'],
    githubUrl: 'https://github.com/rishusinha26/wasteNott',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
    featured: true,
    order: 3
  },
  {
    title: 'Netflix Clone',
    description: 'A Netflix clone built with modern web technologies featuring user authentication, movie browsing, search functionality, and responsive design. Implements movie database API integration for real-time content.',
    techStack: ['React', 'JavaScript', 'CSS3', 'Firebase', 'TMDB API'],
    githubUrl: 'https://github.com/rishusinha26/netlix.git',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800',
    featured: false,
    order: 4
  },
  {
    title: 'Tic-Tac-Toe Game',
    description: 'Interactive Tic-Tac-Toe game with clean UI, game state management, winner detection, and score tracking. Features smooth animations and responsive design for an engaging user experience.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation'],
    githubUrl: 'https://github.com/rishusinha26/tic-tac-toe.git',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800',
    featured: false,
    order: 5
  },
  {
    title: 'AI Image Generator',
    description: 'AI-powered image generator application that creates unique images from text prompts. Integrates with AI APIs to generate creative visuals based on user descriptions with an intuitive interface.',
    techStack: ['React', 'JavaScript', 'CSS3', 'OpenAI API', 'REST API'],
    githubUrl: 'https://github.com/rishusinha26/image-generator.git',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=800',
    featured: false,
    order: 6
  }
];

// Sample Experience Data
const sampleExperiences = [
  {
    type: 'education',
    title: '10th Grade - CBSE',
    organization: 'Delhi Public School Hazaribagh',
    location: 'Hazaribagh, Jharkhand',
    startDate: new Date('2019-04-01'),
    endDate: new Date('2020-03-31'),
    current: false,
    description: 'Completed 10th grade with 82% in CBSE board examination.',
    skills: ['Mathematics', 'Science', 'English'],
    order: 1
  },
  {
    type: 'education',
    title: '12th Grade - CBSE',
    organization: 'D.A.V Public School Hazaribagh',
    location: 'Hazaribagh, Jharkhand',
    startDate: new Date('2021-04-01'),
    endDate: new Date('2022-03-31'),
    current: false,
    description: 'Completed 12th grade with 88% in CBSE board examination.',
    skills: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
    order: 2
  },
  {
    type: 'education',
    title: 'Bachelor of Engineering in Information Science and Engineering',
    organization: 'Siddagange Institute of Technology',
    location: 'Tumakuru, Karnataka',
    startDate: new Date('2023-09-01'),
    endDate: new Date('2027-06-01'),
    current: false,
    cgpa: '9.1',
    description: 'Pursuing B.E. in Information Science and Engineering with current CGPA 9.1, focused on full-stack development, data structures, algorithms, and software engineering principles.',
    skills: ['Data Structures', 'Algorithms', 'Software Engineering', 'Database Management', 'Web Development', 'SQL', 'NumPy', 'Pandas', 'Operating Systems', 'OOPS', 'Computer Networks'],
    order: 3
  },
  {
    type: 'work',
    title: 'Aurora Club - Theatrical Club of SIT',
    organization: 'Siddagange Institute of Technology',
    location: 'Tumakuru, Karnataka',
    startDate: new Date('2024-01-01'),
    endDate: null,
    current: true,
    description: 'Core member leading activities, mentoring juniors, and coordinating productions and events.',
    skills: ['Leadership', 'Event Coordination', 'Mentoring', 'Team Collaboration', 'Communication'],
    order: 4
  },
  {
    type: 'hackathon',
    title: 'SIH College Hackathon - Top 15',
    organization: 'Smart India Hackathon',
    location: 'India',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-03'),
    current: false,
    description: 'Secured Top 15 position among 70 teams in the Smart India Hackathon college round. Contributed to coding, problem-solving, and project development, demonstrating programming, analytical, and teamwork skills.',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'Problem Solving'],
    certificateUrl: 'https://i.ibb.co/FbL9v3mJ/SIH.jpg',
    order: 5
  },
  {
    type: 'hackathon',
    title: 'HACK-CSE-LERATE',
    organization: 'SIDDHAGANGE INSTITUTE OF TECHNOLOGY',
    location: 'Tumakuru, Karnataka',
    startDate: new Date('2025-04-05'),
    endDate: new Date('2025-04-05'),
    current: false,
    description: 'Participated in CSE HACK LITRATE hackathon. Demonstrated technical skills, problem-solving abilities, and teamwork.',
    skills: ['Problem Solving', 'Teamwork', 'Technical Skills'],
    certificateUrl: 'https://i.ibb.co/27Jm4Gf8/cse-hack-literate.jpg',
    order: 6
  }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    // Get MONGO_URI from environment
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.error('❌ Error: MONGO_URI is not defined in environment variables');
      console.error('\n💡 Please ensure you have a .env file in the backend directory');
      console.error('   Location: backend/.env');
      console.error('\n   Content should be:');
      console.error('   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database');
      console.error('\n   Note: Special characters in password must be URL-encoded');
      console.error('   @ = %40, < = %3C, > = %3E');
      process.exit(1);
    }

    // Clean the URI - remove any "MONGO_URI=" prefix if accidentally included
    mongoUri = mongoUri.trim();
    if (mongoUri.includes('MONGO_URI=')) {
      console.warn('⚠️  Warning: Removing "MONGO_URI=" prefix from connection string');
      mongoUri = mongoUri.replace(/^MONGO_URI=/, '').trim();
    }

    // Remove quotes if present
    if ((mongoUri.startsWith('"') && mongoUri.endsWith('"')) ||
      (mongoUri.startsWith("'") && mongoUri.endsWith("'"))) {
      mongoUri = mongoUri.slice(1, -1).trim();
    }

    // Validate URI format
    if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
      console.error('❌ Error: Invalid MongoDB connection string format');
      console.error('   Connection string must start with "mongodb://" or "mongodb+srv://"');
      console.error(`\n   Current value: ${mongoUri.substring(0, 100)}`);
      console.error(`   First 20 chars: "${mongoUri.substring(0, 20)}"`);
      console.error('\n💡 Your backend/.env file should contain exactly:');
      console.error('   MONGO_URI=mongodb+srv://rishu:Rishu%4054321@cluster-portfolio.kuv9nyx.mongodb.net/portfolio');
      console.error('\n   Important:');
      console.error('   - No quotes around the value');
      console.error('   - No spaces around the = sign');
      console.error('   - Password must be URL-encoded (@ becomes %40)');
      process.exit(1);
    }

    console.log('🔌 Connecting to MongoDB Atlas...');
    const maskedUri = mongoUri.replace(/:[^:@]+@/, ':****@');
    console.log(`   URI: ${maskedUri.substring(0, 70)}...`);

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ Connected to MongoDB Atlas');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    const deletedProjects = await Project.deleteMany({});
    const deletedExperiences = await Experience.deleteMany({});
    console.log(`   Deleted ${deletedProjects.deletedCount} projects`);
    console.log(`   Deleted ${deletedExperiences.deletedCount} experiences`);

    // Insert sample data using Mongoose models
    console.log('\n📝 Inserting sample projects...');
    const createdProjects = await Project.insertMany(sampleProjects);
    console.log(`✅ Inserted ${createdProjects.length} projects`);

    console.log('\n📝 Inserting sample experiences...');
    const createdExperiences = await Experience.insertMany(sampleExperiences);
    console.log(`✅ Inserted ${createdExperiences.length} experiences`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Projects: ${createdProjects.length}`);
    console.log(`   Experiences: ${createdExperiences.length}`);
    console.log('\n✨ You can now view your data at:');
    console.log('   Frontend: http://localhost:5173/projects');
    console.log('   Frontend: http://localhost:5173/experience');

  } catch (error) {
    console.error('\n❌ Error seeding database:', error.message);
    console.error('\n💡 Troubleshooting:');

    if (error.name === 'MongoParseError') {
      console.error('   MongoDB Parse Error - Invalid connection string format');
      console.error('   Check your backend/.env file');
      console.error('   Ensure MONGO_URI is on a single line without quotes');
    } else if (error.name === 'MongoServerError') {
      console.error('   MongoDB Server Error - Check connection string and network access');
    } else if (error.name === 'MongooseError') {
      console.error('   Mongoose Error - Check connection string format');
    } else if (error.message.includes('timeout')) {
      console.error('   Connection Timeout - Check internet and MongoDB Atlas status');
    } else {
      console.error('   Error type:', error.name);
      console.error('   Full error:', error);
    }

    console.error('\n📝 Fix your backend/.env file:');
    console.error('   1. Open: backend/.env');
    console.error('   2. Ensure it contains (replace with your actual values):');
    console.error('      MONGO_URI=mongodb+srv://rishu:Rishu%4054321@cluster-portfolio.kuv9nyx.mongodb.net/portfolio');
    console.error('   3. No quotes, no spaces around =');
    console.error('   4. Password URL-encoded (@ = %40)');
    console.error('   5. Save and try again');

    process.exit(1);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('\n👋 Database connection closed');
    }
    process.exit(0);
  }
};

// Run the seeder
seedDatabase();
