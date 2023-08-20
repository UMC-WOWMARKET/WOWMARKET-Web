import { useState } from "react";
import axios from "axios";

//이미지 업로드 커스텀 훅
const useImageUploader = () => {
  const [uploaded, setUploaded] = useState(false);
  const [desiredUrl, setDesiredUrl] = useState("");

  const handleImageUpload = async (selectedFile) => {
    if (!selectedFile) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }

    axios.interceptors.request.use((config) => {
      /* JWT 토큰 */
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }

      return config;
    });

    try {
      const response = await axios.get(
        "https://www.wowmkt.kr/register/image?dirname=demand"
      );
      const presignedUrl = response.data;
      console.log("원래 주소",presignedUrl);

      const parts = presignedUrl.split('?');
      const desiredPart = parts[0];
      setDesiredUrl(desiredPart);
      console.log("자른 주소",desiredUrl);

      
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

  return { handleImageUpload, uploaded, desiredUrl };
};

export default useImageUploader;
