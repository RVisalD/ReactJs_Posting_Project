import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
  let { id } = useParams();
  const [username, setUserName] = useState("");
  const [all, setall] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:4000/auth/info/${id}`).then((response) => {
      setUserName(response.data.username);
    });
    axios.get(`http://localhost:4000/post/byuserId/${id}`).then((response) => {
      setall(response.data);
    });
  }, []);
  let navigate = useNavigate()

  return (
    <div className="mt-20">
      <div className="flex w-fit m-auto">
        <div className="w-fit h-fit border-4 border-solid border-black rounded-md pl-4 pr-4 m-auto text-4xl font-bold">
            Username: {username}
        </div>
        {authState.username === username && <>
          <Link to="/changepassword"><button className="border-2 border-solid border-sky-500/100 bg-sky-500/100 ml-4 rounded-md pr-1 pl-2 h-8 mt-2">
          Change Password
        </button></Link>
        </>}
      </div>
      <br>
      </br>
      <h1 className="text-3xl font-bold">
        All Post
      </h1>
      {all.map((value, key) => {
        return(
          <div className="flex mt-4 w-fit m-auto h-fit" key={key}>
            <div className="flex border-4 w-4/4 border-black border-solid rounded-md pl-2">
              <div
                className="text-3xl font-bold w-18 m-auto"
                onClick={() => {
                  navigate(`/post/${value.id}`);
                }}
                key={key}
              >
                {value.title}
              </div>
              <div
                onClick={() => {
                  navigate(`/post/${value.id}`);
                }}
              >
                <p className="text-3xl font-bold w-18 m-auto" key={key}>
                  "{value.description}"
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Profile;
