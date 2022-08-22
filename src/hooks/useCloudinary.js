const useCloudinary = () => {
  const cloudinary = window.cloudinary;

  const createUploadWidget = (config = {}, onSuccess = () => {}, onError = () => {}) => {    
    return cloudinary.createUploadWidget({
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
      apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
      ...config,
    }, (error, result) => {
      if (result && result.event) {
        if (error) {
          onError(error, result);
        } else if (result.event === 'success') {
          onSuccess(result.info);
        }
      }
    });
  };
  
  return { createUploadWidget };
};

export default useCloudinary;
