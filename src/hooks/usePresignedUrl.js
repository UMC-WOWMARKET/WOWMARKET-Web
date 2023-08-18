import { useState } from "react";
import axios from "axios";

const usePresignedUrl = () => {
  const [presignedUrl, setPresignedUrl] = useState("");
  const [desiredUrl, setDesiredUrl] = useState("");

  const fetchPresignedUrl = async (selectedFile) => {
    if (!selectedFile) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }

    try {
      const response = await axios.get(
        "https://www.wowmkt.kr/register/image?dirname=project"
      );
      const newPresignedUrl = response.data;
      setPresignedUrl(newPresignedUrl);
      console.log("원래 주소");
      console.log(presignedUrl);

      const parts = newPresignedUrl.split('?');
      setDesiredUrl(parts[0]);
      console.log("자른 주소");
      console.log(desiredUrl);

      console.log("Presigned URL fetched successfully");
      return newPresignedUrl;
    } catch (error) {
      console.error("Error fetching presigned URL", error);
      throw error;
    }
  };

  return { fetchPresignedUrl, desiredUrl };
};

export default usePresignedUrl;
