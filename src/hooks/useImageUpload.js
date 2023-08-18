import axios from "axios";

const useImageUpload = () => {
  const uploadImage = async (presignedUrl, selectedFile) => {
    try {
      await axios.put(presignedUrl, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });

      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image", error);
      throw error;
    }
  };

  return { uploadImage };
};

export default useImageUpload;
