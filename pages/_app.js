import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// ABI
import GreetingABI from "../artifacts/contracts/Lock.sol/Lock.json";

// Deployed Greeting Address
const greetingAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const activeChain = "ethereum";

function MyApp({ Component, pageProps }) {

  const [owner, setOwner] = useState("");

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
        const owner = await contract.owner();
        setOwner(owner);
        console.log(owner);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Component {...pageProps} />
      <button onClick={fetchData}>fetchData</button>
    </ThirdwebProvider>
  );
}

export default MyApp;
