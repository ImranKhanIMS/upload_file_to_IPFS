import { useStorage, useStorageUpload } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from 'next';
import { useState } from "react";
import { ethers } from 'ethers';

// ABI
import GreetingABI from "../artifacts/contracts/DAppDrive.sol/DAppDrive.json";

// Deployed Greeting Address
const greetingAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export default function Home() {

  const [file, setFile] = useState();
  const [img, setImg] = useState();

  const [counter, setCounter] = useState("");

  // array to store mapping struct 'store'
  const [store, setStore] = useState([]);

  // test map array
  let [mapArr, setMapArr] = useState([]);
  let mapArray = [];

  // for storing data into mapping 'setDriver'
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [cnic, setCnic] = useState("");
  const [image, setImage] = useState("");

  // for uploading image
  // const [img, setImg] = useState();

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

  // Getting name and age from Greeting
  const fetchData = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greetingAddress, GreetingABI.abi, provider);
      try {
        const counter = await contract.counter();
        setCounter(counter);

        // getting mapping struct data and storing in an array state 'store'
        const store = await contract.getDriver(2);
        setStore(store);

        // console.log(counter.toNumber());

        let test;
        for (let i=0; i<counter.toNumber()+1; i++) {

          if (i!=0) {
            test = await contract.getDriver(i);
            mapArray[i] = test;
          }

          else {
            test = await contract.getDriver(0);
            mapArray[i] = test;
          }
        }

        // assigning mapping to array state 'mapArr'
        setMapArr(mapArray);

        console.log(mapArr);
        // console.log('Counter: ',counter.toNumber());
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Adding new value to mapping of structure 'setMapping'
  const pushDriver = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const uploadUrl = await upload({
          data: [image],
          options: {
            uploadWithGatewayUrl: true,
            uploadWithDirectory: true
          }
        })
    
        setImg(uploadUrl);
        console.log('Upload URL: ', uploadUrl);
  
        const contract = new ethers.Contract(greetingAddress, GreetingABI.abi, signer);
        // const transaction = await contract.setDriver(address, name, age, cnic, uploadUrl);
        const transaction = await contract.setDriver(address, name, age, cnic, uploadUrl[0]);
  
        await transaction.wait();
        // console.log(uploadUrl);
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.container}>
    <br /> <br />
      <input type="file" onChange={(e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      }} />
      <button onClick={uploadToIpfs}>Upload</button> <br /> <br />
      <button onClick={fetchData}>Fetch Record</button>

    <div className={styles.container}>
<input
        onChange={(e) => setAddress(e.target.value)}
        value={address} type='text' placeholder='Wallet Address' /> &nbsp;

<input
        onChange={(e) => setName(e.target.value)}
        value={name} type='text' placeholder='Name' /> &nbsp;

<input
        onChange={(e) => setAge(e.target.value)}
        value={age} type='text' placeholder='Age' /> &nbsp;

<input
        onChange={(e) => setCnic(e.target.value)}
        value={cnic} type='text' placeholder='ID Card Number' /> &nbsp;

<input type="file" onChange={(e) => {
        if (e.target.files) {
          setImage(e.target.files[0]);
        }
      }} /> &nbsp;

<button className='button' onClick={pushDriver}>Add Driver</button>
      </div>

      {/* <img src={img?img:''} alt="ipfs image" /> */}

      <br /> <br />

      {/* Looping through all the record store in the list of struct (struct array) */}
{  
    mapArr.map((rec, i) => {
      return (    
      <>
        <div className={styles.container}> 
          <h2>{rec[2]}</h2>       
          <img src={rec[5]} width="150px" />
          <h6>Record Number: {rec[0].toNumber()}</h6>
          <h5>Wallet Address: {rec[1]}</h5>
          <h5>Age: {rec[3]?rec[3].toNumber():''}</h5>
          <h5>CNIC: {rec[4]?rec[4].toNumber():''}</h5>
        </div> <br /> <br /> <br />
      </>
        );
    })
}
    </div>
  );
}
