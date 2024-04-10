import React from 'react';
import { Link } from 'react-router-dom';
import theme from '../constants/colors';

export default function Header() {
	return (
		<div
			style={{
				display: 'flex',
				height: '10vh',
				backgroundColor: theme.primaryColor,
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingInline: '10%'
			}}
		>
			<Link to='/'>
				<h1 style={{ color: 'white' }}>V</h1>
			</Link>

			<Link to='/profile'>
				<img style={{
						width: '6vh',
						height: '6vh',
						filter: 'invert(1)'
					}}
					src={process.env.PUBLIC_URL + 'user.png'}
					alt='User'
				/>
			</Link>
		</div>
	);
}
