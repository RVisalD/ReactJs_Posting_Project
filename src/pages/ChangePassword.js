import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let navigate = useNavigate()
  const ChangePassword = () => {
    axios
      .put(
        "http://localhost:4000/auth/changepassword",
        { oldPassword: oldPassword, newPassword: newPassword},
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
        alert (response.data.error)
        }
          navigate('/')
      });
  };
  return (
    <div className="mt-20">
      <input
        placeholder="Old Password"
        className="border-4 h-12 border-black border-solid rounded-md pl-2"
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />
      <br />
      <input
        placeholder="New Password"
        className="border-4 h-12 border-black border-solid rounded-md pl-2 mt-4"
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <br />
      <button
        className="border border-sky-500/100 border-solid bg-sky-500/100 w-20 h-8 rounded-md mt-4"
        type="submit"
        onClick={ChangePassword}
      >
        Submit
      </button>
    </div>
  );
}

export default ChangePassword;
