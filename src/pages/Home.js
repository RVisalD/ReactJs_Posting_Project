import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { AuthContext } from "../helpers/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";

function Home() {
  const [all, setall] = useState([]);
  const [likedPost, setLikedPost] = useState([]);
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:4000/post", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setall(response.data.all);
          setLikedPost(
            response.data.likedPost.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);
  const likePost = (postId) => {
    axios
      .post(
        "http://localhost:4000/like",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setall(
          all.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likedArray = post.Likes;
                likedArray.pop();
                return { ...post, Likes: likedArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likedPost.includes(postId)) {
          setLikedPost(
            likedPost.filter((id) => {
              return id != postId;
            })
          );
        } else {
          setLikedPost([...likedPost, postId]);
        }
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:4000/post/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setall(
          all.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  return (
    <div className="App mt-20">
      {all.map((value, key) => {
        return (
          <div className="flex mt-4 w-fit m-auto h-fit" key={key}>
            <div className="flex border-4 w-4/4 border-black border-solid rounded-md pl-2">
              <div
                className="text-3xl font-bold w-18 m-auto"
                onClick={() => {
                  navigate(`/post/${value.id}`);
                }}
                key={key}
              >
                {value.id}. {value.title}
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
              <br></br>
              <div className="pt-1.5 pl-4 pr-2">
                <Link to={`/profile/${value.UserId}`}><p className="text-gray-500"> By {value.username}</p></Link>
              </div>
            </div>
            {authState.username === value.username && (
              <>
                <DeleteIcon
                  className="mt-2 ml-2"
                  onClick={() => {
                    deletePost(value.id);
                  }}
                ></DeleteIcon>
              </>
            )}
            {!likedPost.includes(value.id) && (
              <>
                <ThumbUpIcon
                  className="ml-4 mt-2 h-8 w-10 "
                  onClick={() => {
                    likePost(value.id);
                  }}
                ></ThumbUpIcon>
              </>
            )}
            {likedPost.includes(value.id) && (
              <>
                <ThumbDownAltIcon
                  className="ml-4 mt-2 h-8 w-10"
                  onClick={() => {
                    likePost(value.id);
                  }}
                />
              </>
            )}
            <label className="mt-2 ml-4">{value.Likes.length}</label>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
