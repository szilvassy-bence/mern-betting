import { useContext, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";

export default function Nav() {
  const { setSearch, setSort, setUser } = useContext(SearchContext);

  function onChangeInput(e) {
    setSearch(e.target.value);
  }

  function onChangeSelect(e) {
    setSort(e.target.value);
  }

  async function submitLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData)
    console.log(loginData);

    // POST THE FORM IN THE REQ.BODY
    try {
      const resp = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      });
    
      if (resp.ok) {
        const data = await resp.json();
        const {id} = data;
        setUser(id);
        // Handle successful login
      } else if (resp.status === 401) {
        throw new Error("Invalid email or password");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
    }
  }



  return (
    <div className="container-fluid p-0" id="nav">
      <div className="navbar bg-primary navbar-expand-lg">
        <div className="container py-3">
          <button type="button">Back</button>
          <input
            className="form-control w-25"
            type="text"
            onChange={onChangeInput}
            placeholder="Search..."
          />
          <select
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
          </select>
          <div className="dropdown" id="login-dropdown">
            <a
              href="#"
              id="account-dropdown"
              role="button"
              data-bs-toggle="dropdown"
              className="nav-link account dropdown-toggle"
              aria-haspopup="true"
            >
              <span className="menu-item-icon"></span>
              <span className="menu-item-label">Fiók</span>
            </a>

            <div
              className="dropdown-menu dropdown-menu-right"
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
                    <div className="form-group required has-feedback">
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
                    <div className="form-group required has-feedback">
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
