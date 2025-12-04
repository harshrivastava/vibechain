import { useState } from "react";
import { ethers } from "ethers";

export default function ConnectWallet({ onConnected }) {
  const [address, setAddress] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is required!");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum); // React 19 uses BrowserProvider
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();

      setAddress(addr);
      onConnected({ provider, signer, address: addr });

    } catch (error) {
      console.log(error);
      alert("Wallet connection failed!");
    }
  };

  return (
    <button
      onClick={connectWallet}
      style={{
        padding: "10px 20px",
        background: "#000",
        color: "#fff",
        borderRadius: "8px",
      }}
    >
      {address ? `Connected: ${address.slice(0, 6)}...` : "Connect Wallet"}
    </button>
  );
}
