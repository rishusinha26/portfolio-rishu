import { resumeData } from '../data/resumeData';

const ResumePDF = () => {
  return (
    <div id="resume-content" style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'white',
      color: 'black'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
          {resumeData.name.toUpperCase()}
        </h1>
        <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
          <p>
            GitHub: <a href={`https://github.com/${resumeData.github}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>{resumeData.github}</a> | 
            LinkedIn: <a href={`https://www.${resumeData.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>{resumeData.linkedin}</a>
          </p>
          <p>
            Email: <a href={`mailto:${resumeData.email}`} style={{ color: '#0066cc', textDecoration: 'underline' }}>{resumeData.email}</a> | 
            Mobile: <a href={`tel:${resumeData.mobile.replace(/\s/g, '')}`} style={{ color: '#0066cc', textDecoration: 'underline' }}>{resumeData.mobile}</a>
          </p>
          <p>
            LeetCode: <a href={`https://leetcode.com/${resumeData.leetcode}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>{resumeData.leetcode}</a>
          </p>
        </div>
      </div>

      {/* Education */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ 
          fontSize: '16px', 
          fontWeight: 'bold', 
          borderBottom: '2px solid black',
          paddingBottom: '5px',
          marginBottom: '15px'
        }}>
          EDUCATION
        </h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <strong>{edu.institution}</strong>
              <span>{edu.location}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span>{edu.degree || `CBSE: Percentage: ${edu.percentage}`}</span>
              <span>{edu.duration}</span>
            </div>
            {edu.cgpa && <div style={{ fontSize: '14px' }}>CGPA: {edu.cgpa}</div>}
          </div>
        ))}
      </div>

      {/* Technical Skills */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ 
          fontSize: '16px', 
          fontWeight: 'bold', 
          borderBottom: '2px solid black',
          paddingBottom: '5px',
          marginBottom: '15px'
        }}>
          TECHNICAL SKILLS
        </h2>
        <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8' }}>
          <li><strong>Languages:</strong> {resumeData.technicalSkills.languages}</li>
          <li><strong>Databases/Hosting:</strong> {resumeData.technicalSkills.databases}</li>
          <li><strong>Frameworks and Libraries:</strong> {resumeData.technicalSkills.frameworks}</li>
          <li><strong>Developer Tools:</strong> {resumeData.technicalSkills.tools}</li>
        </ul>
      </div>

      {/* Projects */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ 
          fontSize: '16px', 
          fontWeight: 'bold', 
          borderBottom: '2px solid black',
          paddingBottom: '5px',
          marginBottom: '15px'
        }}>
          PROJECTS
        </h2>
        {resumeData.projects.map((project, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <strong>{project.name}</strong>
              <span style={{ fontSize: '12px', fontStyle: 'italic' }}>[{project.link}]</span>
            </div>
            <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '13px', lineHeight: '1.6', marginBottom: '5px' }}>
              <li>{project.description}</li>
              {project.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <div style={{ fontSize: '13px', marginTop: '5px' }}>
              <strong>Tech Stack:</strong> {project.techStack}
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ 
          fontSize: '16px', 
          fontWeight: 'bold', 
          borderBottom: '2px solid black',
          paddingBottom: '5px',
          marginBottom: '15px'
        }}>
          ACHIEVEMENTS
        </h2>
        <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '13px', lineHeight: '1.8' }}>
          {resumeData.achievements.map((achievement, index) => (
            <li key={index}>
              <strong>{achievement.title}:</strong> {achievement.description}
              {achievement.certificate && ` (${achievement.certificate})`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumePDF;
