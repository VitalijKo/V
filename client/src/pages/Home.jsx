import React, { useState, useEffect } from 'react';
import { useContract } from '../contexts/ContractContext';
import Vit from '../components/Vit';

export default function Home() {
	const { contract, accounts, account } = useContract();

	const [vits, setVits] = useState([]);

	const getAllVits = async () => {
		try {
			const uniqueVitsSet = new Set();

			for (const acc of accounts) {
				if (acc !== account) {
					const _vits = await contract.methods.UserVits(acc).call({ from: account });

					_vits.forEach((vit) => uniqueVits.add(vit));
				}
			}

			const uniqueVits = [...uniqueVitsSet];

			setVits(uniqueVits);
		} catch (e) {
			alert(e);
		}
	}

	useEffect(() => {
		if (contract) getAllVits();
	}, [contract]);

	return (
		<div className='main'>
			<div
				className='container'
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginBottom: '5vh'
				}}
			>
				<div
					style={{
						display: 'flex',
						width: '80%',
						flexDirection: 'column',
						gap: '5vh'
					}}
				>
					{
						vits.sort((a, b) => Number(b.created) - Number(a.created)).map((vit) => {
							return (
								<Vit key={vit.created} vit={vit} />
							);
						})
					}
				</div>
			</div>
		</div>
	);
}