import { useRef, useState, useEffect } from "react";
import bcrypt from "bcryptjs";

const plain = "jelszo";
const saltRounds = 10;
bcrypt.genSalt(saltRounds, function (err, salt) {
  bcrypt.hash(plain, salt, function (err, hash) {
    if (err) {
      console.error(err);
    } else {
      console.log("Hashed Password:", hash);
    }
  });
});

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
      console.log(data);
    }
  }

  return (
    <div className="container mt-3">
      <form onSubmit={onSubmit} ref={formRef}>
        <div className="mb-3">
          <label htmlFor="first-name" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="first-name"
            name="firstName"
            placeholder="First name"
          />
          <label htmlFor="last-name" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="last-name"
            name="lastName"
            placeholder="Last name"
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email"
          />
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Phone"
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
          />
          <div className="form-check">
            <input
              className="form-check-input is-invalid"
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
