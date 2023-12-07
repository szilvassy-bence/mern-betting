import { useContext, useState } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import { Link, useLocation } from "react-router-dom"
import "./Nav.css";

export default function Nav() {
  const { setSearch, setSort, setUser } = useContext(SearchContext);
  const [loginError, setLoginError] = useState(null);

  const location = useLocation();


  function onChangeInput(e) {
    setSearch(e.target.value);
  }

  function onChangeSelect(e) {
    setSort(e.target.value);
  }

  async function submitLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData);
    //console.log(loginData);

    // POST THE FORM IN THE REQ.BODY
    try {
      const resp = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (resp.ok) {
        const data = await resp.json();
        const { id } = data;
        setUser(id);
        console.log("success");
        // Handle successful login
      } else if (resp.status === 401) {
        throw new Error("Invalid email or password");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      //console.error(err.message);
      const { message } = err;
      setUser(null);
      setLoginError(message);
      document.querySelector(".dropdown-menu").classList.toggle("show");
      // INFO MESSAGE
    }
  }

  return (
    <div className="container-fluid p-0" id="nav">
      <div className="navbar bg-primary navbar-expand-lg">
        <div className="container py-3">
          <button type="button">Back</button>
          {location.pathname !== '/casino/blackjack' && <input
            className="form-control w-25"
            type="text"
            onChange={onChangeInput}
            placeholder="Search..."
          />}
          {location.pathname !== '/casino/blackjack' && <select
            onChange={onChangeSelect}
            className="form-select w-25"
            name="nav-select"
            id="nav-select"
          >
            <optgroup label="Sort by league name">
              <option value="league-az">A to Z</option>
              <option value="league-za">Z to A</option>
            </optgroup>
            <optgroup label="Sort by country name">
              <option value="country-az">A to Z</option>
              <option value="country-za">Z to A</option>
            </optgroup>
          </select>}
          <div className="dropdown" id="login-dropdown">
            <button
              type="button"
              className="btn btn-light dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Login
            </button>

            <div
              className="dropdown-menu dropdown-menu-left p-3"
              aria-labelledby="account-dropdown"
            >
              <div className="row">
                <div className="container">
                  <form
                    id="login-form"
                    className="row needs-validation"
                    noValidate
                    onSubmit={submitLogin}
                  >
                    <div className="form-group required has-feedback mb-3">
                      <label htmlFor="email" className="form-label">
                        E-mail
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email-login"
                        required
                      />
                    </div>
                    <div className="form-group required has-feedback mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password-login"
                        required
                      />
                    </div>
                    {loginError && (
                      <div>
                        <p className="text-danger">{loginError}</p>
                      </div>
                    )}
                    <div className="mb-3">
                      <Link to="/user/register">
                        Or register now!
                      </Link>
                    </div>
                    <div className="form-group">
                      <button
                        id="btn-login"
                        type="submit"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
