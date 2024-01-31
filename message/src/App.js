import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "./abi.json";
import "./index.css";

function App() {
  const contractAddress = "0x03aF3B8CF46ac99e00F7153ccB5Acdd17ddC4f54";

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const [inputMessage, setInputMessage] = useState("");
  const [contractMessage, setContractMessage] = useState("");

  async function sendMessageToContract() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.setMessages(inputMessage);
        await transaction.wait();
        console.log("Message set successfully");
        // getMessageFromContract(); // Retrieve updated message after setting
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  async function getMessageToContract() {
    // Renamed function
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.getMassage();
        setContractMessage(transaction);
        console.log(transaction);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Enter your message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessageToContract}>Set Message</button>
      </div>
      <div>
        <button onClick={getMessageToContract}>Get Message</button>
        <p>contractMessage: {contractMessage}</p>
      </div>
    </div>
  );
}

export default App;
