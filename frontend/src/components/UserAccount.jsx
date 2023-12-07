import { useEffect, useState, useContext } from 'react'
import { SearchContext } from '../contexts/SearchContext'
import { Link } from 'react-router-dom'

const UserAccount = () => {
  const [depositValue, setDepositValue] = useState("")
  const [account, setAccount] = useState(null)
  const [newEmail, setNewEmail] = useState("")
  const [newFirst, setNewFirst] = useState("")
  const [newLast, setNewLast] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [deposited, setDeposited] = useState(false)
  const { user } = useContext(SearchContext)


  const submitDeposit = (e) => {
    e.preventDefault()
    console.log(depositValue);
    fetch(`/api/user/deposit/dep/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({deposit: depositValue})})
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setDeposited(!deposited)
        setDepositValue("")
      })
      .catch(error => console.error(error))
  }

  const submitAccountChanges = (e) => {
    e.preventDefault()

    const newAccount = {...account}
    console.log(account);
    newAccount.email = newEmail === "" ? account.email : newEmail
    newAccount.first = newFirst === "" ? account.firstName : newFirst
    newAccount.last = newLast === "" ? account.lastName : newLast
    newAccount.phone = newPhone === "" ? account.phone : newPhone

    fetch(`/api/user/update/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccount)
    })
      .then(resp => resp.json())
      .then(data => {
        setAccount(data)
      })
  }

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const result = await fetch(`/api/user/info/${user.id}`)
        const data = await result.json()
        setAccount(data)
        console.log(account);

      } catch (error) {
        console.error(error)
      }
    }

    fetchAccount()
  }, [user, deposited])

  console.log(account);

  return (
    <>
     {account !== null ?
      (<>
      <div className='row'>
        <div className='col-md-4'>
          <h2>Account Information</h2>
          <label>Funds</label>
          <p>{account.deposit ? account.deposit : "No deposit"}</p>
          <label>Email:</label>
          <p>{account.email}</p>
          <label>Full name:</label>
          <p>{account.firstName} {account.lastName}</p>
          <lable>Phone:</lable>
          <p>{account.phone}</p>
          <label>Created at:</label>
          <p>{account.createdAt}</p>
        </div>
        <div className='col-md-4'>
          <h2>Edit profile</h2>
          <form onSubmit={submitAccountChanges} className='form-inline'>
            <div>
              <div className="form-group">
                <label>Email</label>
                <input className="form-control" value={newEmail} type="email" onChange={(e) => setNewEmail(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>First name</label>
                <input className="form-control" value={newFirst} type="text" onChange={(e) => setNewFirst(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input className="form-control" value={newLast} type="text" onChange={(e) => setNewLast(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input className="form-control" value={newPhone} type="text" onChange={(e) => setNewPhone(e.target.value)}/>
              </div>
              <div className="form-group">
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
        <div className='col-md-4'>
          <h2>Deposit</h2>
          <form onSubmit={submitDeposit}>
            <div className='col'>
              <div className='row-md-2'>
                <label>Make your deposit:</label>
                <input className="form-control" value={depositValue} type="text" onChange={(e) => setDepositValue(e.target.value)}/>
              </div>
              <div className='row-md-2'>
                <button type="submit">Deposit</button>
              </div>
            </div>
          </form>
        </div>
        <div className="row-md-12">
          <h2>Your Bets</h2>
          { account.bets.length > 0 ? (
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Match Id</th>
                  <th scope='col'>Bet amount</th>
                  <th scope='col'>Possible win</th>
                  <th scope='col'>Bet side</th>
                </tr>
              </thead>
              <tbody>
                {
                  account.bets.map((bet, i) => {
                    return (
                      <tr key={bet._id}>
                        <th scope='row'>{i+1}</th>
                        <td>{bet.matchId}</td>
                        <td>{bet.betAmount}</td>
                        <td>{bet.betWin}</td>
                        <td>{bet.betSide}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            ) : (
              <h5>You have no open bets currently.</h5>
            ) 
          }
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>) :
      (<div className='notlogged'>
        <h2>Please log in or Register here:</h2>  
        <Link to="/user/register">
          <button>Register</button>
        </Link>
      </div>)}
    </>
  )
}


export default UserAccount