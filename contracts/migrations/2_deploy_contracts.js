const v = artifacts.require('./V.sol');

module.exports = function(deployer) {
	deployer.deploy(v);
}
