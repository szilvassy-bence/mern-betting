import { useState } from 'react'

const Deposit = () => {
  const [depositValue, setDepositValue] = useState("")

  const submitDeposit = () => {
    
  }

  return (
    <>
			<form onSubmit={submitDeposit}>
				<label>Make your deposit:</label>
				<input value={depositValue} type="text" onChange={(e) => setDepositValue(e.target.value)}/>
				<button type="submit">Deposit</button>
			</form>
    </>
  )
}


export default Deposit