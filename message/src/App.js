import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "./ABI.json";

function App() {
  const contractAddress = "0xd9909205a2C72A5760616D28Ce7c5cb8302e8243";

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const [inputMessage, setInputMessage] = useState(""); // Renamed state variable

  async function sendMessageToContract() {
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
        const transaction = await contract.setMessage(inputMessage);
        await transaction.wait();
        console.log("Message set successfully");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Enter your message"
          value={inputMessage}
          onChange={handleMessageChange}
        />
        <button onClick={sendMessageToContract}>Set Message</button>
      </div>
      <div>
        <p>{inputMessage}</p>
      </div>
    </div>
  );
}

export default App;
