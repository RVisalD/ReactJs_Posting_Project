import React, { useState,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from  "../helpers/AuthContext"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext)

  let navigate = useNavigate();
  const handleSubmit = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:4000/auth/login", data).then((response) => {
      if (response.data.error) alert(response.data.error);
      else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({username: response.data.username, id:response.data.id, status: true})
        navigate("/")
      }
    });
  };
  return (
    <div className="mt-20">
      <div className="w-96 h-52 border border-solid border-black rounded-md m-auto mt-4">
        <div className="mt-4">
          <label>Username: </label>
          <br />
          <input
            placeholder="(Ex... Visal)"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            className="border border-black border-solid rounded-md w-18 h-10 pl-2"
          />
          <br />
          <label className="">Password: </label>
          <br />
          <input
            placeholder="(Ex... 12345678)"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="border border-black border-solid rounded-md w-18 h-10 pl-2 mt-2"
            type="password"
          />
          <br />
          <button
            className="border border-sky-500/100 border-solid bg-sky-500/100 w-20 h-8 rounded-md mt-4"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
