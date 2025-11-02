import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Sample Projects Data
const sampleProjects = [
  {
    title: 'FinFlow - AI Powered Personal Finance Companion',
    description: 'Built a full-stack personal finance web application to simplify money management by helping users track expenses, manage investments, and monitor debts in one unified platform. Integrated real-time synchronization, secure authentication, AI-driven insights, interactive dashboards, and a chatbot assistant for personalized financial guidance and improved user engagement.',
    techStack: ['React 18', 'TypeScript', 'TailwindCSS', 'Recharts', 'Node.js', 'Express.js', 'Firebase', 'GEMINI API'],
    githubUrl: 'https://github.com/rishusinha26/fin-flow1',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    featured: true,
    order: 1
  },
  {
    title: 'CareerMitra – AI-Powered Educational Guidance Platform',
    description: 'Full-stack educational guidance platform addressing the lack of personalized mentorship, limited college awareness, and missed deadlines by providing a centralized hub for career discovery, college search, and application tracking. Features AI-powered aptitude quizzes, personalized career recommendations, searchable college directory, deadline tracker, multilingual support, dark/light mode, voice assistant, and secure authentication.',
    techStack: ['React 18', 'Vite', 'TailwindCSS', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Axios', 'React Context API'],
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
    githubUrl: 'https://github.com/rishusinha26/netlix.git ',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800',
    featured: false,
    order: 4
  },
  {
    title: 'Tic-Tac-Toe Game',
    description: 'Interactive Tic-Tac-Toe game with clean UI, game state management, winner detection, and score tracking. Features smooth animations and responsive design for an engaging user experience.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation'],
    githubUrl: 'https://github.com/rishusinha26/tic-tac-toe.git ',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800',
    featured: false,
    order: 5
  },
  {
    title: 'AI Image Generator',
    description: 'AI-powered image generator application that creates unique images from text prompts. Integrates with AI APIs to generate creative visuals based on user descriptions with an intuitive interface.',
    techStack: ['React', 'JavaScript', 'CSS3', 'OpenAI API', 'REST API'],
    githubUrl: 'https://github.com/rishusinha26/image-generator.git ',
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
    title: 'Bachelor of Engineering in Computer Science',
    organization: 'Siddagange Institute of Technology',
    location: 'Tumakuru, Karnataka',
    startDate: new Date('2021-09-01'),
    endDate: new Date('2025-06-01'),
    current: false,
    description: 'Pursuing B.E. in Computer Science and Engineering with focus on full-stack development, data structures, algorithms, and software engineering principles.',
    skills: ['Data Structures', 'Algorithms', 'Software Engineering', 'Database Management', 'Web Development'],
    order: 3
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
    certificateUrl: 'https://i.ibb.co/FbL9v3mJ/SIH.jpg', // Replace with your direct image URL (must be .jpg or .png)
    order: 4
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
    certificateUrl: 'https://i.ibb.co/27Jm4Gf8/cse-hack-literate.jpg', // Replace with your direct image URL (must be .jpg or .png)
    order: 5
  }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get collections
    const db = mongoose.connection.db;
    const projectsCollection = db.collection('projects');
    const experiencesCollection = db.collection('experiences');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await projectsCollection.deleteMany({});
    await experiencesCollection.deleteMany({});

    // Insert sample data
    console.log('📝 Inserting sample projects...');
    await projectsCollection.insertMany(sampleProjects);
    console.log(`✅ Inserted ${sampleProjects.length} projects`);

    console.log('📝 Inserting sample experiences...');
    await experiencesCollection.insertMany(sampleExperiences);
    console.log(`✅ Inserted ${sampleExperiences.length} experiences`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Projects: ${sampleProjects.length}`);
    console.log(`   Experiences: ${sampleExperiences.length}`);
    console.log('\n✨ You can now view your data at:');
    console.log('   Frontend: http://localhost:5173/projects');
    console.log('   Frontend: http://localhost:5173/experience');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
};

// Run the seeder
seedDatabase();
