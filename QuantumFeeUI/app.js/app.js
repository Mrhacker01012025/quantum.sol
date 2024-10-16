// app.js
let web3;
let contract;
const contractAddress = "0x291edDd7e0090201a0EbBdf9dD2d40ccA3D40e4F"; // Replace with your deployed contract address
const contractABI =  [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "payer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FeePaid",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "payFee",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawFees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "feesPaid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
 ];

document.getElementById('connectWalletBtn').onclick = async function () {
    if (window.ethereum) {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Initialize Web3
            const web3 = new Web3(window.ethereum);
            
            // Get accounts
            const accounts = await web3.eth.getAccounts();
            console.log("Connected account:", accounts[0]);

            // Display the connected wallet address
            document.getElementById('walletAddress').innerText = `Connected: ${accounts[0]}`;

            // Show balance section
            document.querySelector('.balance-section').style.display = "block";

            // Initialize the contract
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            // Enable the Pay Fee button
            document.querySelector('.payment-section').style.display = "block";
            document.getElementById('payFeeBtn').disabled = false;

        } catch (error) {
            console.error("MetaMask connection failed", error);
            alert(`Failed to connect MetaMask: ${error.message}`);
        }
    } else {
        // MetaMask not detected
        alert("MetaMask is not installed. Please install MetaMask from https://metamask.io");
    }
};
