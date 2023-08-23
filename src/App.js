import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Create from "./pages/Create";
import PageNotFound from "./pages/PageNotFound";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App mb-20">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          {!authState.status && (
            <>
              <AppBar className="flex bg-color-sky-500/100 w-3/3">
                <Toolbar className="justify-space">
                  <div className="w-1/3 flex">
                    <Typography className=""></Typography>
                  </div>
                  <div className="w-1/3 flex"></div>
                  <div className="w-1/3 flex justify-end">
                    <Typography className="">
                      <Link to="/createuser" className="">
                        Create User
                      </Link>
                    </Typography>
                    <Typography className="pl-4">
                      <Link to="/login">Login</Link>
                    </Typography>
                  </div>
                </Toolbar>
              </AppBar>
            </>
          )}
          {authState.status && (
            <>
              <AppBar className="flex bg-color-sky-500/100 w-3/3">
                <Toolbar className="justify-space">
                  <div className="w-1/3 flex">
                    <Typography className="">
                      <Link to="/register" className="">
                        Post
                      </Link>
                    </Typography>
                    <Typography className="pl-4">
                      <Link to="/">Home</Link>
                    </Typography>
                  </div>
                  <div className="w-1/3 flex"></div>
                  <div className="w-1/3 flex justify-end">
                    <Typography>{authState.username}</Typography>
                    <button className="pl-4" onClick={logout}>
                      Logout
                    </button>
                  </div>
                </Toolbar>
              </AppBar>
            </>
          )}
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/register" exact Component={Register} />
            <Route path="/post/:id" exact Component={Post} />
            <Route path="/createuser" exact Component={Create} />
            <Route path="/login" exact Component={Login} />
            <Route path="/profile/:id" exact Component={Profile} />
            <Route path="/changepassword" exact Component={ChangePassword} />
            <Route path="*" exact Component={PageNotFound} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
