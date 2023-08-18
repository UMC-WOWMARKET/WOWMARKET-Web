import { useState } from "react";
import axios from "axios";

const useImageUploader = () => {
  const [presignedUrl, setPresignedUrl] = useState("");
  const [desiredUrl, setDesiredUrl] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const getPresignedUrl = async (selectedFile) => {
    if (!selectedFile) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }

    try {
      const response = await axios.get(
        "https://www.wowmkt.kr/register/image?dirname=demand"
      );
      setPresignedUrl(response.data);
      console.log("원래 주소");
      console.log(presignedUrl);

      const parts = presignedUrl.split('?');
      setDesiredUrl(parts[0]);
      console.log("자른 주소");
      console.log(desiredUrl);

      setUploaded(true);
      console.log("Presigned URL fetched successfully");
    } catch (error) {
      console.error("Error fetching presigned URL", error);
    }
  };

  const uploadImage = async (selectedFile) => {
    try {
      await axios.put(presignedUrl, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });

      setUploaded(true);
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return { getPresignedUrl, uploadImage, uploaded, desiredUrl };
};

export default useImageUploader;
