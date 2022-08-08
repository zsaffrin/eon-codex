import { string } from 'prop-types';
import ReactMarkdown from 'react-markdown';

/**
 * Description of function
 * 
 * @param {String} content Markdown content to display
 * 
 * @return {ReactElement} Description of return
 */
const Markdown = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
    />
  );
};
Markdown.propTypes = {
  content: string,
};

export default Markdown;
