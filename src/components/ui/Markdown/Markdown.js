import ReactMarkdown from 'react-markdown';

const Markdown = ({ content }) => {
  return (
    <ReactMarkdown
      source={content}
    />
  );
};

export default Markdown;
