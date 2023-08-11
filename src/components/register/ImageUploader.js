import React, { useState } from "react";
import axios from "axios";

const ImageUploader = ({ImageUrlUploaded}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }

    try {
      const response = await axios.get(
        "http://13.125.190.15:8080/wowmarket/image?dirname=project"
      );
      const presignedUrl = response.data;
      console.log("원래 주소");
      console.log(presignedUrl);

      //URL 잘라서 String으로 보내기
      const parts = presignedUrl.split('?');
      const desiredPart = parts[0];
      ImageUrlUploaded(desiredPart);
      console.log("자른 주소");
      console.log(desiredPart);

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

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;
