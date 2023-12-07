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
    fetch(`/api/user/deposit/dep/${user}`, {
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
    newAccount.email = newEmail
    newAccount.first = newFirst
    newAccount.last = newLast
    newAccount.phone = newPhone

    fetch(`/api/user/update/${user}`, {
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
        const result = await fetch(`/api/user/info/${user}`)
        const data = await result.json()
        setAccount(data)

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
          <lable>Email:</lable>
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