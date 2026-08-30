import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import Logo from './assets/Logo.png';

function App() {
  const [wallet, setWallet] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [metadataHash, setMetadataHash] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [property, setProperty] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalProperties, setTotalProperties] = useState(0);

  const contractAddress = "0xD432f0A68841e8B826984E2804cfaEB0a521EaD3";

  const abi = [
    "function registerProperty(string,string,string)",
    "function listProperty(uint256)",
    "function requestPurchase(uint256)",
    "function transferOwnership(uint256)",
    "function propertyCount() view returns(uint256)",
    "function properties(uint256) view returns(uint256,address,string,string,uint256,string,bool,address)"
  ];

  // Dedicated read-only provider — bypasses MetaMask's flaky eth_call handling
  const readProvider = new ethers.JsonRpcProvider("https://rpc.hoodi.ethpandaops.io");

  function getReadContract() {
    return new ethers.Contract(contractAddress, abi, readProvider);
  }

  let provider;
  let signer;
  let contract;

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask.");
        return;
      }
      provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = await provider.getSigner();
      contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      const address = await signer.getAddress();
      setWallet(address);

      const readContract = getReadContract();
      const count = await readContract.propertyCount();
      setTotalProperties(Number(count));

      setStatus("✅ Wallet Connected");
    } catch (err) {
      console.log(err);
      setStatus("❌ Wallet Connection Failed");
    }
  }

  async function getContract() {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );
    return contract;
  }

  async function registerProperty() {
    if (!location || !propertyType || !metadataHash) {
      setStatus("⚠️ All fields Compulsory");
      return;
    }
    try {
      setLoading(true);
      setStatus("⏳ Waiting for wallet confirmation...");
      const c = await getContract();
      const tx = await c.registerProperty(
        location,
        propertyType,
        metadataHash
      );
      setStatus("⛏️ Transaction in process....");
      await tx.wait();
      const readContract = getReadContract();
      const count = await readContract.propertyCount();
      setTotalProperties(Number(count));
      setStatus("✅ Property Registered Successfully!");
      setLocation("");
      setPropertyType("");
      setMetadataHash("");
    } catch (err) {
      console.log(err);
      setStatus("❌ Registration Failed");
    } finally {
      setLoading(false);
    }
  }

  async function listProperty() {
    if (!propertyId) {
      setStatus("Enter Property ID");
      return;
    }
    try {
      setLoading(true);
      setStatus("📋 Listing Property...");
      const c = await getContract();
      const tx = await c.listProperty(propertyId);
      await tx.wait();
      setStatus("✅ Property Listed Successfully!");
    } catch (err) {
      console.log(err);
      setStatus("❌ Listing Failed");
    } finally {
      setLoading(false);
    }
  }

  async function requestPurchase() {
    if (!propertyId) {
      setStatus("Enter Property ID");
      return;
    }
    try {
      setLoading(true);
      setStatus("💰 Sending Purchase Request...");
      const c = await getContract();
      const tx = await c.requestPurchase(propertyId);
      await tx.wait();
      setStatus("✅ Purchase Request Sent");
    } catch (err) {
      console.log(err);
      setStatus("❌ Purchase Request Failed");
    } finally {
      setLoading(false);
    }
  }

  async function transferOwnership() {
    if (!propertyId) {
      setStatus("Enter Property ID");
      return;
    }
    try {
      setLoading(true);
      setStatus("🔄 Transferring Ownership...");
      const c = await getContract();
      const tx = await c.transferOwnership(propertyId);
      await tx.wait();
      setStatus("✅ Ownership Transferred");
    } catch (err) {
      console.log(err);
      setStatus("❌ Transfer Failed");
    } finally {
      setLoading(false);
    }
  }

  async function viewProperty() {
    if (!propertyId) {
      setStatus("Enter Property ID");
      return;
    }
    try {
      setLoading(true);
      setStatus("🔍 Fetching Property...");
      const c = getReadContract();
      const p = await c.properties(propertyId);
      setProperty({
        id: p[0].toString(),
        owner: p[1],
        location: p[2],
        type: p[3],
        date: new Date(
          Number(p[4]) * 1000
        ).toLocaleString(),
        hash: p[5],
        sale: p[6] ? "Yes" : "No",
        buyer: p[7]
      });
      setStatus("Property Loaded");
    } catch (err) {
      console.log(err);
      setStatus("Invalid Property ID");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 p-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center mb-10">
            <img
               src={Logo}
               alt="PropertyShield Logo"
               className="absolute top-0 right-6 w-45 h-35 drop-shadow-lg"
            />

           <h1 className="text-6xl font-black tracking-tight text-indigo-700">🏠 Property<span className="text-purple-700">Shield 🛡️</span></h1>
           <p className="text-gray-600 text-lg py-6">🔒Secure Real Estate Transactions with Blockchain</p>
          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 duration-300 text-white px-6 py-3 rounded-xl shadow-lg">
            {wallet?"Wallet Connected!":"Connect Wallet"}
          </button>
          </div>
        </div>

        {wallet && (
          <div className="mt-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-5">
            <h3 className="font-semibold text-green-700">Connected Wallet</h3>
            <p className="break-all mt-2">{wallet}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
            <h3 className="text-gray-500">Total Properties</h3>
            <p className="text-3xl font-bold mt-2"> {totalProperties}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
            <h3 className="text-gray-500">Contract Address </h3>
            <p className="text-sm break-all mt-2">{contractAddress}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
            <h3 className="text-gray-500">Blockchain</h3>
            <p className="text-2xl font-bold mt-2">Ethereum</p>
          </div>
        </div>

        {status && (
          <div className={`mt-5 border rounded-xl p-4 shadow ${
            status.includes("❌")
              ? "bg-red-100 border-red-300 text-red-800"
              : status.includes("⚠️")
              ? "bg-yellow-100 border-yellow-300 text-yellow-800"
              : "bg-green-100 border-green-300 text-green-800"
          }`}>
            {status}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-6">Register Property</h2>

            <input
              className="border w-full p-3 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
              placeholder="Property Location"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
            />

            <input
              className="border w-full p-3 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
              placeholder="Property Type"
              value={propertyType}
              onChange={(e)=>setPropertyType(e.target.value)}
            />

            <input
              className="border w-full p-3 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-500"
              placeholder="Metadata Hash"
              value={metadataHash}
              onChange={(e)=>setMetadataHash(e.target.value)}
            />

            <button
              onClick={registerProperty}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:scale-105 duration-300 disabled:bg-gray-400"
            >
              {loading ? "⏳ Registering..." : "Register Property"}
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-6">Property Actions</h2>
            <input
              className="border w-full p-3 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-500"
              placeholder="Property ID"
              value={propertyId}
              onChange={(e)=>setPropertyId(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={listProperty}
                disabled={loading}
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 rounded-xl duration-300"
              >List
              </button>

              <button
                onClick={requestPurchase}
                disabled={loading}
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-xl duration-300"
              >Buy
              </button>

              <button
                onClick={transferOwnership}
                disabled={loading}
                className="bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-xl duration-300"
              >Transfer
              </button>

              <button
                onClick={viewProperty}
                disabled={loading}
                className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white py-3 rounded-xl duration-300"
              >View
              </button>
            </div>
          </div>
        </div>
            
        {property && (
          <div className="mt-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Property Details</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="bg-indigo-50 rounded-xl p-5 shadow">
                <h3 className="font-semibold text-indigo-700">Property ID</h3>
                <p className="mt-2 text-lg font-bold">{property.id}</p>
              </div>

              <div className="bg-green-50 rounded-xl p-5 shadow">
                <h3 className="font-semibold text-green-700">Location</h3>
                <p className="mt-2 font-medium">{property.location}</p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-5 shadow">
                <h3 className="font-semibold text-yellow-700">Property Type</h3>
                <p className="mt-2 font-medium">{property.type}</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5 shadow">
                <h3 className="font-semibold text-blue-700">Owner</h3>
                <p className="mt-2 break-all text-sm">{property.owner}</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-5 shadow">
                <h3 className="font-semibold text-purple-700">Metadata Hash</h3>
                <p className="mt-2 break-all text-sm">{property.hash}</p>
              </div>

              <div className={`rounded-xl p-5 shadow ${property.sale.includes("Yes")? "bg-green-100":"bg-red-100"}`} >
                <h3 className="font-semibold">For Sale</h3>
                <p className="mt-2 text-xl font-bold">{property.sale}</p>
              </div>

              <div className="bg-orange-50 rounded-xl p-5 shadow lg:col-span-2">
                <h3 className="font-semibold text-orange-700">Requested Buyer</h3>
                <p className="mt-2 break-all text-sm">{property.buyer}</p>
              </div>

              <div className="bg-gray-100 rounded-xl p-5 shadow">
                <h3 className="font-semibold text-gray-700">Registration Date</h3>
                <p className="mt-2">{property.date}</p>
              </div>
            </div>
          </div>
        )}
        </div>
    </div>
  );
}
export default App;