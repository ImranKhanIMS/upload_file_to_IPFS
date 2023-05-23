import { ThirdwebProvider, useStorage, useStorageUpload } from "@thirdweb-dev/react";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// ABI
import GreetingABI from "../artifacts/contracts/DAppDrive.sol/DAppDrive.json";

// Deployed Greeting Address
const greetingAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const activeChain = "ethereum";

function MyApp({ Component, pageProps }) {

  const [counter, setCounter] = useState("");

  // array to store mapping struct 'store'
  const [store, setStore] = useState([]);

  // for storing data into mapping 'setDriver'
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [cnic, setCnic] = useState("");
  const [image, setImage] = useState("");

  // for uploading image
  const [img, setImg] = useState();

  // const { mutateAsync: upload } = useStorageUpload();

  // Helper Functions
  const requestAccount = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
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
        const store = await contract.getDriver(0);
        setStore(store);

        console.log(store);
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
        const transaction = await contract.setDriver(address, name, age.toNumber(), cnic.toNumber(), uploadUrl);
  
        await transaction.wait();
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Component {...pageProps} /> <br /> <br /> <br />
      
      <div className={styles.container}>
        <button onClick={fetchData}>fetchData</button> <br /> <br />
        
        <img src={store.image} width="150px" />
        {/* <h4>Record: {store.id.toNumber()}</h4> */}
        <h2>{store.name}</h2>
        {/* <h4>Age: {store.age.toNumber()}</h4> */}
        {/* <h4>CNIC: {store.cardNo.toNumber()}</h4> */}
      </div>

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

<input
        onChange={(e) => setImage(e.target.value)}
        value={image} type='file'/> &nbsp;

<button className='button' onClick={pushDriver}>Add Driver</button>
      </div>
    </ThirdwebProvider>
  );
}

export default MyApp;
