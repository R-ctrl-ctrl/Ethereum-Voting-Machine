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
  const [radioValue,setRadioValue] = useState()

  useEffect(() => {
    if (vtContract) getqnum()
    if(vtContract)
    {
      setAllPolls([])
      getAllPolls()
    }
     
   

  }, [vtContract])

  const getqnum = async () => {
    const qnum = await vtContract.methods.qnum().call()
    setqnum(qnum)
  }

  const handleSubmit = async () => {
    try {
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
    console.log(len)

    for (let i = 0; i < len; i++) {
      let result = await vtContract.methods.giveQuestion(i).call()
      const pollsObj = {}
      pollsObj.question = result[0]
      pollsObj.asker = result[1]
      pollsObj.questionNumber = result[2]

      setAllPolls(allPolls => [...allPolls, pollsObj])
      allPolls.map((poll) => {
        console.log(poll.question)
      })

    }

  }


  const radiochange = (e)=>{
      setRadioValue(e.target.value)

  }


  const handleResponse = async (id)=>{
        console.log(radioValue)
  }



  const connectWallet = async () => {
    if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(window.ethereum)
        setweb3(web3)
        const accounts = await web3.eth.getAccounts()
        setaddress(accounts[0])

        const lc =  votingContract(web3)
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
    <div className="main">
      <div>Hello next</div>
      <button onClick={connectWallet} >Connect Wallet</button>
      <p>{address}</p>
      <p>{qnum}</p>

      <input type="text" placeholder='Enter your poll' onChange={e => setpoll(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        {allPolls.map((poll, key) => {
          return (
            <div className="xyz" key={key}>
              <p>{poll.question}</p>
              <p>{poll.asker}</p>
              <p>{poll.questionNumber}</p>
              <div>
                <input type="radio" name={poll.questionNumber} value={0} onChange={radiochange}/>
                <input type="radio" name={poll.questionNumber} value={1} onChange={radiochange}/>
                <input type="radio" name={poll.questionNumber} value={2} onChange={radiochange}/>

              </div>
              <button onClick={()=>handleResponse(poll.questionNumber)}>Click me</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
