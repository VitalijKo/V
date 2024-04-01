pragma solidity >=0.8.0 <0.9.0;

contract V {
	address owner;

	mapping(address => User) accounts;
	mapping(address => Vit[]) vits;
	mapping(address => bool) isLogged;

	uint usersCount = 0;

	struct User {
		address login;
		string password;
		string username;
		string image;
	}

	struct Vit {
		User author;
		string content;
		uint likes;
		uint created;
	}

	modifier onlyLogged() {
		require(isLogged[msg.sender], 'You must be logged in');
		_;
	}

	modifier onlyOwner() {
		require(msg.sender == owner, 'You are not the owner');
		_;
	}

	constructor() {
		owner = msg.sender;
	}

	function SignUp(string memory _username, string memory _password) public {
		require(accounts[msg.sender].login == address(0), 'The account already exists');

		accounts[msg.sender] = User({
			login: msg.sender,
			password: _password,
			username: _username,
			image: ''
		});

		++usersCount;
	}

	function Login(string memory _password) public {
		require(accounts[msg.sender].login != address(0), 'You dont have an account');
		require(keccak256(bytes(accounts[msg.sender].password)) == keccak256(bytes(_password)), 'Wrong password');

		isLogged[msg.sender] = true;
	}

	function Logout() public onlyLogged {
		isLogged[msg.sender] = false;
	}

	function AddVit(string memory _content) public onlyLogged {
		User memory _user = GetUser(msg.sender);

		vits[msg.sender].push(Vit({
			author: _user,
			content: _content,
			likes: 0,
			created: block.timestamp
		}));
	}

	function UserVits(address _user) external view onlyLogged returns(Vit[] memory) {
		return vits[_user];
	}

	function CheckSignUp(address _user) external view returns(bool) {
		return accounts[_user].login != address(0);
	}

	function GetUser(address _user) public view returns(User memory) {
		return accounts[_user];
	}

	function UpdateUser(string memory _image) public {
		User storage _user = accounts[msg.sender];

		_user.image = _image;
	}
}
