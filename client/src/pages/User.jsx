import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContract } from '../contexts/ContractContext';
import theme from '../constants/colors';
import Vit from '../components/Vit';
import '../App.css';
import './Profile.css';

export default function User() {
	const { contract, account } = useContract();

	const { address } = useParams();

	const [user, setUser] = useState('');
	const [vits, setVits] = useState([]);

	useEffect(() => {
		if (contract) {
			GetUserData();
			GetUserVits();
		}
	}, [contract]);

	const GetUserData = async () => {
		try {
			const user = await contract.methods.GetUser(address).call({ from: account });

			setUser(user);	
		} catch (e) {
			alert(e);
		}
	}

	const GetUserVits = async () => {
		try {
			const vits = await contract.methods.UserVits(address).call({ from: account })
		
			setVits(vits);
		} catch (e) {
			alert(e);
		}
	}

  return (
    <div className='main'>
      <div
      	className='container' 
        style={{
          justifyContent: 'flex-start',
          alignItems: 'start', 
          gap: '5vh'
        }}
       >
        <div>
          <img
          	src={user && user.image ? user.image : (process.env.PUBLIC_URL + '/user.png')}
          	alt='User'
          	className='user-image' 
          />
        </div>
        
        <div className='user-info'>
          <div style={{ marginTop: '5vh' }}>
            <h2>Account: <span style={{color: theme.primaryColor}}>{account}</span></h2>
          </div>
        </div>
      </div>

      <div
      	className='container'
      	style={{
          justifyContent: 'flex-start', 
          alignItems: 'start', 
          marginBottom: '5vh',
          gap: '5vh'
        }}
       >
        	<div className='sidebar'>
        		{user &&
        			<h2 style={{marginBottom: '4vh'}}>
            		<span style={{ color: 'gray' }}>Username:</span><br />@{user.username}
          		</h2>
       			}
        	</div>

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
