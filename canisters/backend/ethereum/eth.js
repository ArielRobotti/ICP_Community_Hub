const Web3 = require('web3');

// Conecta a un nodo Ethereum (puede ser local o remoto)
const web3 = new Web3('URL_DEL_NODO_ETH');

// Dirección del contrato y abi
const contractAddress = 'DIRECCION_DEL_CONTRATO';
const contractAbi = [
  // ... (abi del contrato aquí)
];

// Crea una instancia del contrato
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Escucha el evento ReceivedSepolia
const receivedSepoliaEvent = contract.events.ReceivedSepolia();

// Maneja los eventos recibidos
receivedSepoliaEvent.on('data', (event) => {
  console.log('Evento ReceivedSepolia:', event.returnValues);
});

// Maneja los errores
receivedSepoliaEvent.on('error', (error) => {
  console.error('Error en el evento ReceivedSepolia:', error);
});