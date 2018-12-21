import web3 from './web3';

const address = '0x3C267e5B24727E8E22c6e5b1A13879861f7E18ba';

const abi = [
  {
  "constant": false,
  "inputs": [{"name": "newMessage", "type": "string"}],
  "name": "setMessage",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
  {
  "constant": true,
    "inputs": [],
    "name": "message",
    "outputs": [{"name": "", "type": "string"}],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
  {
  "inputs": [{"name": "initialMessage", "type": "string"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}
];

export default new web3.eth.Contract(abi, address);
