import React, { useState, useEffect } from 'react';
import { useContract } from '../contexts/ContractContext';
import theme from '../constants/colors';
import Vit from '../components/Vit';
import '../App.css';
import './Profile.css';

export default function Profile() {
	const { contract, balance, account } = useContract();

	const [user, setUser] = useState('');
	const [link, setLink] = useState('');

	const [content, setContent] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [isOpened, setIsOpened] = useState(false);
	const [isLogged, setIsLogged] = useState(false);
	const [isSignedUp, setIsSignedUp] = useState(false);

	const [vits, setVits] = useState([]);

	useEffect(() => {
		if (contract) {
			setIsLogged(localStorage.getItem('isLogged') === 'true');
			
			CheckSignUp();

			if (isLogged) {
				GetUserData();
				GetUserVits();
			}
		}
	}, [isLogged, isSignedUp, contract]);

	const sendTransaction = async (method, args) => {
		try {
			const gasEstimation = await method(...args).estimateGas({ from: account });

			await method(...args).send({ from: account, gas: gasEstimation });
		} catch (e) {
			alert(e);
		}
	}

	const AddVit = async (_content) => {
		if (!_content) return;

		try {
			await sendTransaction(contract.methods.AddVit, [_content]);

			setContent('');
			GetUserVits();
		} catch (e) {
			alert(e.message);
		}
	}

	const SignUp = async (_username, _password) => {
		if (!_username || !_password) return;

		try {
			await sendTransaction(contract.methods.SignUp, [_username, _password]);

			setIsSignedUp(true);
		} catch (e) {
			alert(e.message);
		}
	}

	const Login = async (_password) => {
		if (!_password) return;

		try {
			await sendTransaction(contract.methods.Login, [_password]);

			setIsLogged(true);
			localStorage.setItem('isLogged', true);
			
		} catch (e) {
			alert(e);
		}
	}

	const GetUserData = async () => {
		try {
			const user = await contract.methods.GetUser(account).call({ from: account });

			setUser(user);	
		} catch (e) {
			alert(e);
		}
	}

	const GetUserVits = async () => {
		try {
			const vits = await contract.methods.UserVits(account).call({ from: account });
		
			setVits(vits);
		} catch (e) {
			alert(e);
		}
	}

	const UpdateImage = async (link) => {
		if (!link) return;

		try {
			await sendTransaction(contract.methods.UpdateUser, [link]);

			setLink('');
			setIsOpened(false);
			GetUserData();
		} catch (e) {
			alert(e);
		}
	}

	const Exit = async () => {
		try {
			await sendTransaction(contract.methods.Logout, []);

			setIsLogged(false);
			localStorage.setItem('isLogged', false);
			setVits([]);
		} catch (e) {
			alert(e);
		}
	}

	const CheckSignUp = async () => {
		try {
			const result = await contract.methods.CheckSignUp(account).call({ from: account });

			setIsSignedUp(result);
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
          <div>
            <h2>Account: <span style={{color: theme.primaryColor}}>{account}</span></h2>
            <h2>Balance: {balance} vits</h2>
          </div>

          {isLogged ? (
          	<button className='edit-btn' onClick={() => Exit()}>Logout</button>
          ) : (isSignedUp ? (
            <div className='sign-up'>
              <input
              	type='password'
              	value={password}
              	placeholder='Password'
              	onChange={e => setPassword(e.target.value)}
              />
              <button
              	className='edit-btn'
              	style={{ margin: '0' }}
              	onClick={() => Login(password)}
              >
              	Login
              </button>
            </div>
         	) : (
            <div className='sign-up'>
              <input
              	type='text'
              	value={username}
              	placeholder='Username'
              	onChange={e => setUsername(e.target.value)}
              />
              <input
              	type='password'
              	value={password}
              	placeholder='Password'
              	onChange={e => setPassword(e.target.value)}
              />
              <button
              	className='edit-btn'
              	style={{ margin: '0' }}
              	onClick={() => SignUp(username, password)}
              >
              	Sign Up
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div
      	className='container'
      	style={{
          justifyContent: 'flex-start', 
          alignItems: 'start',
          gap: '5vh'
        }}
       >
        {isLogged &&
        	<div className='sidebar'>
        		{user &&
        			<h2 style={{ marginBottom: '5.8vh' }}>
            		<span style={{ color: 'gray' }}>Username:</span><br />@{user.username}
          		</h2>
       			}
		        {isOpened &&
		        	<input
		        		type='text'
		        		value={link}
		        		placeholder='Link to image'
		        		style={{ marginBottom: '1vh' }}
		        		onChange={e => setLink(e.target.value)}
		        	/>
		        }
		        {isOpened
		        	? <button className='edit-btn' onClick={() => UpdateImage(link)}>Save</button>
		          : <button className='edit-btn' onClick={() => setIsOpened(true)}>Update</button>
		        }
        	</div>
        }
        <div
        	style={{
        		display: 'flex',
        		width: '80%',
        		flexDirection: 'column',
        		gap: '5vh'
        	}}
        >
          {isLogged &&
          	<div className='add-vit'>
            	<textarea
            		type='text'
            		value={content}
            		placeholder='What are you thinking?'
            		className='input-vit'
            		onChange={e => setContent(e.target.value)}
            	/>
            	<button
            		onClick={() => AddVit(content)}
            		disabled={!isLogged}
            		className='add-btn'
            	>
            		V it
            	</button>
          	</div>
         	}
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
