import { createContext, useEffect } from 'react';

const CloudinaryContext = createContext();

const CloudinaryProvider = ({ children }) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <CloudinaryContext.Provider value={''}>
      {children}
    </CloudinaryContext.Provider>
  );
};

export { CloudinaryContext, CloudinaryProvider };
