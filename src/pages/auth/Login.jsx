import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const userDetails = localStorage.getItem("userDetails");

    if (userDetails) {
      let parsedUserDetails = JSON.parse(userDetails);
      if (
        parsedUserDetails.email !== "" &&
        parsedUserDetails.password !== "" &&
        parsedUserDetails.name !== ""
      ) {
        if (parsedUserDetails.email === email && parsedUserDetails.password === password) {
          alert("Login Successful");
          navigate("/jobs");
        } else {
          alert("Invalid Credentials");
        }
      }
    } else {
      localStorage.clear();
       navigate("/signup");
    }
  };

  return (
    <div className="vh-100 container d-flex justify-content-center align-items-center">
      <div className="border border-rounded p-4">
        <div className="mb-3">
          <h3>Login Page</h3>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            onClick={() => setShowPassword(!showPassword)}
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Show Password
          </label>
        </div>
        <button
          onClick={() => handleSubmit()}
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>

        <div className="mt-3 text-center">
          New user ? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
