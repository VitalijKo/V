import Web3 from 'web3';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { contract_address } from '../config/contracts';
import abi from '../config/abi.json';

const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
	const [contract, setContract] = useState(null);
	const [accounts, setAccounts] = useState([]);
	const [account, setAccount] = useState(null);
	const [balance, setBalance] = useState('');

	useEffect(() => {
		const initContract = async () => {
			const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');

			if (window.ethereum) {
				try {
					const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

					if (accounts && accounts.length > 0) {
						setAccounts(accounts);
						setAccount(accounts[0]);

						const weiBalance = await web3.eth.getBalance(accounts[0]);
						const ethBalance = web3.utils.fromWei(weiBalance, 'ether');

						setBalance(ethBalance.slice(0, 8));

						const contractInstance = new web3.eth.Contract(abi, contract_address);
						
						setContract(contractInstance);
					}

					else console.error('No accounts found');
				} catch (e) {
					console.error('An error occured while fetching account balance: ', e);
				}
			}

			else alert('Install MetaMask extension');
		}

		initContract();
	}, []);

	return (
		<ContractContext.Provider value={{ contract, account, balance, accounts }}>
			{children}
		</ContractContext.Provider>
	);
}

export const useContract = () => {
	const context = useContext(ContractContext);

	if (!context) throw new Error('useContract must be used within a ContractProvider');

	return context;
}
