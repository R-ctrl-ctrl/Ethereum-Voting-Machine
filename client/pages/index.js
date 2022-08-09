import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import votingContract from '../blockchain/voting'
export default function Home() {
  const [error, seterror] = useState("")
  const [web3, setweb3] = useState()
  const [address, setaddress] = useState("")
  const [vtContract, setVtContract] = useState()
  const [qnum, setqnum] = useState(2)
  const [poll, setpoll] = useState("")
  const [allPolls, setAllPolls] = useState([])
  const [allVotes, setAllVotes] = useState([])
  const [radioValue, setRadioValue] = useState()

  useEffect(() => {
    if (vtContract) getqnum()
    if (vtContract) {
      setAllPolls([])
      getAllPolls()
      setAllVotes([])
      getAllVotes()
    }



  }, [vtContract])

  const getqnum = async () => {
    const qnum = await vtContract.methods.qnum().call()
    setqnum(qnum)
  }

  const handleSubmit = async () => {
    try {
      setpoll("")
      await vtContract.methods.askQuestion(poll).send({
        from: address,
        gas: 300000,
        gasPrice: null
      })

    } catch (err) {
      seterror(err.message)
    }
  }

  const getAllPolls = async () => {
    let len = await vtContract.methods.questionLength().call()

    for (let i = 0; i < len; i++) {
      let result = await vtContract.methods.giveQuestion(i).call()
      const pollsObj = {}
      pollsObj.question = result[0]
      pollsObj.asker = result[1]
      pollsObj.questionNumber = result[2]

      let votesNumber = await vtContract.methods.noOfVotes(result[2]).call()
      pollsObj.mapyes = parseInt(votesNumber[0])
      pollsObj.mapno = parseInt(votesNumber[1])
      pollsObj.mapignore = parseInt(votesNumber[2])
      pollsObj.total = parseInt(votesNumber[0]) + parseInt(votesNumber[1]) + parseInt(votesNumber[2])

      setAllPolls(allPolls => [...allPolls, pollsObj])

    }
  }

  const getAllVotes = async () => {
    let len = await vtContract.methods.votesLength().call()
    for (let i = 0; i < len; i++) {
      let result = await vtContract.methods.giveVotes(i).call()
      let votesObj = {}
      votesObj.voterAddress = result[0]
      votesObj.option = result[1]
      votesObj.questionNumber = result[2]

      setAllVotes(allVotes => [...allVotes, votesObj])
    }

  }



  const radiochange = (e) => {
    setRadioValue(e.target.value)

  }


  const handleResponse = async (questionNumber) => {
    let isVoted = await vtContract.methods.isVoted(questionNumber).call()
    if (isVoted == true) {
      alert("ALready Voted")
    }

    if (isVoted == false) {
      try {
        await vtContract.methods.Vote(questionNumber, radioValue).send({
          from: address,
          gas: 300000,
          gasPrice: null
        })
        alert("Voting Successful")
      } catch (err) {
        console.log(err.message)
      }
    }
    setRadioValue(null)
  }













  const connectWallet = async () => {
    if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(window.ethereum)
        setweb3(web3)
        const accounts = await web3.eth.getAccounts()
        setaddress(accounts[0])

        const lc = votingContract(web3)
        setVtContract(lc)
        seterror('')

      } catch (err) {
        seterror(err.message)
      }
    }
    else {
      console.log("please install metamask")
    }

  }
  return (
    <div className={styles.main}>
      <div className={styles.conndiv}>
        <button className={styles.connectbtn} onClick={connectWallet} >Connect Wallet</button>
        <p className={styles.connectaddress}>Connected Account : {address}</p>
        <div className={styles.qnum}>Current No of Polls :  {qnum}</div>
      </div>


      <div className={styles.outer}>
        <div className={styles.inner}>
          <input type="text" placeholder='Enter your poll' onChange={e => setpoll(e.target.value)} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <div className={styles.cardcomponent}>
        {allPolls.map((poll, key) => {
          return (
            <div className={styles.card} key={key}>
              <p>Question : {poll.question}</p>
              <p>Asker : {poll.asker}</p>
              <p>QuestionNumber : {poll.questionNumber}</p>
              <div>

                <div className={styles.outside}>
                  <div className={styles.upper}><input className={styles.radio} type="radio" name={poll.questionNumber} value={0} onChange={radiochange} /> <div>Yes</div> </div>
                  <div className={styles.percentage}><div style={{ backgroundColor: "blue", borderRadius: "5px", height: "100%", width: `${poll.mapyes / (poll.total == 0 ? 0.001 : poll.total) * 100}%` }}></div></div>
                </div>
                <div className={styles.outside}>
                  <div className={styles.upper}><input className={styles.radio} type="radio" name={poll.questionNumber} value={1} onChange={radiochange} /> <div>No</div> </div>
                  <div className={styles.percentage}><div style={{ backgroundColor: "blue", borderRadius: "5px", height: "100%", width: `${poll.mapno / (poll.total == 0 ? 0.001 : poll.total) * 100}%` }}></div></div>
                </div>
                <div className={styles.outside}>
                  <div className={styles.upper}><input className={styles.radio} type="radio" name={poll.questionNumber} value={2} onChange={radiochange} /> <div>Ignore</div> </div>
                  <div className={styles.percentage}><div style={{ backgroundColor: "blue", borderRadius: "5px", height: "100%", width: `${poll.mapignore / (poll.total == 0 ? 0.001 : poll.total) * 100}%` }}></div></div>
                </div>
              </div>
              <p>Total Votes : {poll.total}</p>
              <button className={styles.vote} onClick={() => handleResponse(poll.questionNumber)}>Vote</button>


            </div>
          )
        })}
      </div>

      {/* <div className='votes'>
        <h2>All Votes List</h2>
        {
          allVotes.map((vote, key) => {
            return (
              <div className='xyz' key={key}>
                <p>{vote.voterAddress}</p>
                <p>option selected : {vote.option}</p>
                <p>questionNumber : {vote.questionNumber}</p>
              </div>
            )
          })
        }
      </div> */}
    </div>
  )
}
