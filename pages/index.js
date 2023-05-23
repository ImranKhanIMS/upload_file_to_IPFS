import { useStorage, useStorageUpload } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from 'next';
import { useState } from "react";

export default function Home() {

  const [file, setFile] = useState();
  const [img, setImg] = useState();

  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    const uploadUrl = await upload({
      data: [file],
      options: {
        uploadWithGatewayUrl: true,
        uploadWithDirectory: true
      }
    })

    setImg(uploadUrl);
    console.log('Upload URL: ', uploadUrl);
  }

  return (
    <div className={styles.container}>
    <br /> <br />
      <input type="file" onChange={(e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      }} />
      <button onClick={uploadToIpfs}>Upload</button>

      {/* <img src={img?img:''} alt="ipfs image" /> */}
    </div>
  );
}
