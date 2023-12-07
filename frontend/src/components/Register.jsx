import { useRef, useState, useEffect } from "react";

const userRegex = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
  const userRef = useRef();
  const errRef = useRef();
  const formRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const userData = Object.fromEntries(formData);
    console.log(userData);

    const resp = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (resp.status === 200) {
      const data = await resp.json();
      console.log("Successful posting the registration");
    } else {
      console.log("There is an error posting the registration");
      const data = await resp.json();
      const { errors } = data;

      const inputs = document.querySelectorAll(".form-control-registration")
      const errorPaths = errors.map(error => error.path);
      console.log(errorPaths);
      inputs.forEach(input => {
        if (errorPaths.includes(input.id)) {
          input.classList.remove("is-valid");
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
          input.classList.add("is-valid");
        }
      })
    }
  }

  return (
    <div className="container mt-3">
      <form onSubmit={onSubmit} ref={formRef} className="needs-validation">
        <div className="mb-3">
          <label htmlFor="first-name" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control form-control-registration"
            id="firstName"
            name="firstName"
            placeholder="First name"
          />
          <div className="invalid-feedback">
            First name must not be empty, must have at least two characters, the
            first character must be a character from a-z or A-Z.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="last-name" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control form-control-registration"
            id="lastName"
            name="lastName"
            placeholder="Last name"
          />
          <div className="invalid-feedback">
            Last name must not be empty, must have at least two characters, the
            first character must be a character from a-z or A-Z.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control form-control-registration"
            id="email"
            name="email"
            placeholder="Email"
          />
          <div className="invalid-feedback">
            Email must be a valid email address.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control form-control-registration"
            id="phone"
            name="phone"
            placeholder="Phone"
          />
          <div className="invalid-feedback">
            Phone must not be empty, and have at least 7 numbers.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control form-control-registration"
            id="password"
            name="password"
            placeholder="Password"
          />
          <div className="invalid-feedback">
            Password must be at least 8 characters and include at least one
            small letter, one capital letter, and one number, and one special
            characters from: !@#$%.
          </div>
        </div>

        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="invalidCheck3"
              aria-describedby="invalidCheck3Feedback"
              required
            />
            <label className="form-check-label" htmlFor="invalidCheck3">
              Agree to terms and conditions
            </label>
            <div className="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
