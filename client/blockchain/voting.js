const votingabi = [{"inputs":[{"internalType":"uint256","name":"_questionNumber","type":"uint256"},{"internalType":"enum Voting.Options","name":"_option","type":"uint8"}],"name":"Vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"str","type":"string"}],"name":"askQuestion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"giveQuestion","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"giveVotes","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"enum Voting.Options","name":"","type":"uint8"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_questionNumber","type":"uint256"}],"name":"isVoted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"mapignore","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"mapno","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"mapyes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_questionNumber","type":"uint256"}],"name":"noOfVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"option","outputs":[{"internalType":"enum Voting.Options","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"qnum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"questionLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"questions","outputs":[{"internalType":"string","name":"question","type":"string"},{"internalType":"address","name":"asker","type":"address"},{"internalType":"uint256","name":"questionNumber","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"votes","outputs":[{"internalType":"address","name":"voterAddress","type":"address"},{"internalType":"enum Voting.Options","name":"option","type":"uint8"},{"internalType":"uint256","name":"questionNumber","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"votesLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const votingContract = web3 => {
    return new web3.eth.Contract(
        votingabi,
        "0x8Ae3E82B189BD24E684c605383640f6319C1edB3"
    )
}

export default votingContract