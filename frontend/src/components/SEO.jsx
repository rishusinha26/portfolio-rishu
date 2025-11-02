import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Full-Stack Developer Portfolio', 
  description = 'Professional portfolio showcasing full-stack development projects built with React, Node.js, and MongoDB',
  keywords = 'full stack developer, react, node.js, mongodb, portfolio, web developer',
  author = 'Rishu Kumar Sinha'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
