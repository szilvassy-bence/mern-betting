import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import Main from "./League"

export default function Leagues () {

  const navigate = useNavigate();

  const [leagues, setLeagues] = useState(null);
  const [filteredLeagues, setFilteredLeagues] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [paginationArray, setPaginationArray] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [firstIndex, setFirstIndex] = useState(null);
  const [displayedLeagues, setDisplayedLeagues]= useState(null);
  const leaguesPerPage = 30;

  const { search, sort } = useContext(SearchContext);

  // set the leagues
  useEffect(() => {
    fetch('/api/betting/leagues')
      .then(resp => resp.json())
      .then(data => {
        setLeagues(data);
      })
      .catch(error => console.log(error))
  }, [])


  useEffect(() => {
    if (leagues) {
      const newFilteredLeagues = [...leagues]
      setFilteredLeagues(newFilteredLeagues)
    }
  }, [leagues])


  useEffect(() => {
    if (filteredLeagues) {
      const newTotalPage = Math.ceil(filteredLeagues.length / leaguesPerPage)
      setTotalPage(newTotalPage);
      console.log(filteredLeagues);
    }
  }, [filteredLeagues])

  
  useEffect(() => {
    if (totalPage) {
      const newArray = [...Array(totalPage + 1).keys()].slice(1)
      setPaginationArray(newArray);
      //console.log(totalPage);
    }
  }, [totalPage])


  useEffect(() => {
    if (paginationArray) {
      //console.log(paginationArray);
      
      setCurrentPage(prevPage => {
        // Update currentPage based on the previous state
        const newPage = 1;
        console.log(newPage);
        return newPage;
      });
    }
  }, [paginationArray]);
  
  useEffect(() => {
    // This useEffect will run after the currentPage state is updated
    //console.log(currentPage);
  
    if (filteredLeagues) {
      const newFirstIndex = (currentPage - 1) * leaguesPerPage;
      setFirstIndex(prev => newFirstIndex);
    }
  }, [currentPage, filteredLeagues, leaguesPerPage]);
  
  useEffect(() => {
    // This useEffect will run after the firstIndex state is updated
    //console.log(firstIndex);
  
    if (filteredLeagues) {
      const newArray = [...filteredLeagues];
      setDisplayedLeagues(prev => newArray.slice(firstIndex, (firstIndex + leaguesPerPage)));
    }
  }, [firstIndex, filteredLeagues, leaguesPerPage]);
  

  //change in search or sort
  useEffect(() => {
    if (leagues !== null){
      if (search !== null && search !== "") {
        const filtered = leagues.filter(league => league.name.toLowerCase().includes(search) || league.countries[0].name.toLowerCase().includes(search));
        if (sort === "league-az") {
          const newFiltered = filtered.sort((a, b) => a.name.localeCompare(b.name));
          setFilteredLeagues([...newFiltered]);
        } else if (sort === "league-za") {
          const newFiltered = filtered.sort((a, b) => b.name.localeCompare(a.name));
          setFilteredLeagues([...newFiltered]);
        } else if (sort === "country-az") {
          const newFiltered = filtered.sort((a, b) => a.countries[0].name.localeCompare(b.countries[0].name));
          setFilteredLeagues([...newFiltered]);
        } else {
          const newFiltered = filtered.sort((a, b) => b.countries[0].name.localeCompare(a.countries[0].name));
          setFilteredLeagues([...newFiltered]);
        }
      } else {
        if (sort === "league-az") {
          const newFiltered = leagues.sort((a, b) => a.name.localeCompare(b.name));
          setFilteredLeagues([...newFiltered]);
        } else if (sort === "league-za") {
          const newFiltered = leagues.sort((a, b) => b.name.localeCompare(a.name));
          setFilteredLeagues([...newFiltered]);
        } else if (sort === "country-az") {
          const newFiltered = leagues.sort((a, b) => a.countries[0].name.localeCompare(b.countries[0].name));
          setFilteredLeagues([...newFiltered]);
        } else {
          const newFiltered = leagues.sort((a, b) => b.countries[0].name.localeCompare(a.countries[0].name));
          setFilteredLeagues([...newFiltered]);
        }
        setFilteredLeagues([...leagues]);
      }
    } else return
  }, [search, sort])


  function handleClick(e) {
    const id = e.target.closest("tr").id;
    console.log(id);
    navigate(`/leagues/${id}`)
  }


   function prevPage () {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
  }


  function nextPage () {
    if(currentPage !== totalPage){
      setCurrentPage((prevPage) => prevPage + 1)
    }
  } 


// calling filter records inside return
  return (
    <>
      { (displayedLeagues && paginationArray) ? (
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">League name</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {displayedLeagues.map((league, i) => (
                <tr id={league.id} key={league.name + league.id} onClick={handleClick}>
                  <th scope="row" >{i + 1}</th>
                  <td>{league.name}</td>
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
                  paginationArray.map((num, i) => (
                    <li className={`page-item ${currentPage === num ? 'active' : ''}`} key={i}>
                      <a href="#" className="page-link" onClick={() => setCurrentPage(num)}>{num}</a> 
                    </li>
                  ))
                }
                <li className="page-item">
                  <a href="#" className="page-link" onClick={nextPage}>Next</a>
                </li>
            </ul>
          </nav>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  )
}

