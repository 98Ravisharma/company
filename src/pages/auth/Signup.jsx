import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name !== "" && email !== "" && password !== "") {
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          name,
          email,
          password,
        })
      );

      alert("Signup Successful");

      navigate("/jobs");
    } else {
      alert("Please fill all the fields");
    }
  };

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");

    if (userDetails) {
      let parsedUserDetails = JSON.parse(userDetails);
      if (
        parsedUserDetails.email !== "" &&
        parsedUserDetails.password !== "" &&
        parsedUserDetails.name !== ""
      ) {
        navigate("/jobs");
      }
    }
  }, []);

  return (
    <div className="vh-100 container d-flex justify-content-center align-items-center">
      <div className="border border-rounded p-4">
        <div className="mb-3">
          <h3>Signup Page</h3>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="nameHelp"
            onChange={(e) => setName(e.target.value)}
          />
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
          Signup
        </button>

        <div className="mt-3 text-center">
          Already a user ? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
