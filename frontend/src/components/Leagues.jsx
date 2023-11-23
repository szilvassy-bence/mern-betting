import { useState, useEffect } from "react";
import Main from "./Main"

export default function Leagues ({ searchValue }) {
  const [id, setId] = useState(null)
  const [leagues, setLeagues] = useState([])

  //Required variables for the pagination
  const [currentPage, setCurrentPage] = useState(1)
  const leaguesPerPage = 30
  const lastIndex = currentPage * leaguesPerPage
  const firstIndex = lastIndex - leaguesPerPage
  const records = leagues.slice(firstIndex, lastIndex)
  const nPage = Math.ceil(leagues.length / leaguesPerPage)
  const numbers = [...Array(nPage + 1).keys()].slice(1)

  let filtered;

  if(searchValue !== null || searchValue !== ""){
    filtered = leagues.filter(league => league.name.toLowerCase().includes(searchValue))
    console.log(filtered);
  }

  useEffect(() => {
    fetch('/api/betting/league/list')
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setLeagues(data)
      })
      .catch(error => console.log(error))
  }, [])

  function giveId (id) {
    setId(id)
  }

  function prevPage () {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
  }

  function changeCurrPage (id) {
    setCurrentPage(id)
  }

  function nextPage () {
    if(currentPage !== nPage){
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
    { id === null ?
      <div>
        <table>
          <thead>
            <th>League</th>
            <th>Country</th>
          </thead>
          <tbody>
            {records.map((league, i) => (
            <tr key={i}>
              <td onClick={() => giveId(league.id)}>{league.name}</td>
              <td>{league.countries[0].name}</td>
            </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
              <li className="page-item">
                <a href="#" className="page-link" onClick={prevPage}>Prev</a>
              </li>
              {
                numbers.map((num, i) => (
                  <li className={`page-item ${currentPage === num ? 'active' : ''}`} key={i}>
                     <a href="#" className="page-link" onClick={() => changeCurrPage(num)}>{num}</a> 
                  </li>
                ))
              }
              <li className="page-item">
                <a href="#" className="page-link" onClick={nextPage}>Next</a>
              </li>
          </ul>
        </nav>
      </div> :
      <Main id={id}/>
    }
			
    </>
  )
}