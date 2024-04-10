import React from 'react';
import { Link } from 'react-router-dom';
import { useContract } from '../contexts/ContractContext';
import theme from '../constants/colors';
import './Vit.css';

export default function Vit({ vit }) {
	const { account } = useContract();

	const isOwner = account === vit.author.login.toLowerCase();

	const date = new Date(Number(vit.created) * 1000);
	const formattedDate = date.toLocaleString();

	return (
		<div className='Vit'>
			<Link
				style={{ color: '#000' }}
				to={isOwner ? '/profile' : ('/user/' + vit.author.login)}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: '2vh'
					}}
				>
					<img
						src={vit.author.image ? vit.author.image : (process.env.PUBLIC_URL + 'user.png')}
						alt='User'
						className='vit-image'
					/>
					
					<div>
						<h3>@{vit.author.username}</h3>
						<h3 style={{ color: theme.primaryColor }}>{formattedDate}</h3>
					</div>
				</div>
			</Link>

			<h3 style={{ marginTop: '2vh' }}>{vit.content}</h3>

			<div className='likes'>
				<img
					src={process.env.PUBLIC_URL + '/like.png'}
					alt='Like'
					className='like' 
				/>
				<h3>{vit.likes.toString()}</h3>
			</div>
		</div>
	);
}
