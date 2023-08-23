import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [post, setpost] = useState({});
  const [review, setReview] = useState([]);
  const [newReview, setnewReview] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:4000/post/byId/${id}`).then((response) => {
      setpost(response.data);
    });
    axios.get(`http://localhost:4000/review/${id}`).then((response) => {
      setReview(response.data);
    });
  }, []);
  const addReview = () => {
    axios
      .post(
        "http://localhost:4000/review",
        { review: newReview, PostId: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const addedreview = {
            review: newReview,
            username: response.data.username,
          };
          setReview([...review, addedreview]);
          setnewReview("");
        }
      });
  };
  const deleteReview = (id) => {
    axios
      .delete(`http://localhost:4000/review/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setReview(
          review.filter((val) => {
            return val.id != id;
          })
        );
      });
  };
  const edit = (option) => {
    if (option === "title") {
      let newTitle = prompt("Enter new Title: ");
      axios.put(
        "http://localhost:4000/post/title",
        { newTitle: newTitle, id: id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      );
      setpost({...post, title: newTitle})
    } else {
      let newDescription = prompt("Enter new Description: ");
      axios.put(
        "http://localhost:4000/post/description",
        { newDescription: newDescription, id: id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      );
      setpost({...post, description: newDescription})
    }
  };

  return (
    <div className="mt-20">
      <div className="border-4 border-solid border-black rounded-md pl-2 w-40 font-bold text-xl m-auto">
        <div
          onClick={() => {
            if (authState.username === post.username) {
              edit("title");
            }
          }}
        >
          {post.title}
        </div>
        <p
          onClick={() => {
            if (authState.username === post.username) {
              edit("description");
            }
          }}
        >
          {post.description}
        </p>
      </div>
      <div className="w-60 border-4 border-solid border-black m-auto mt-4 rounded-md">
        <input
          type="text"
          placeholder="Review..."
          value={newReview}
          className="mt-4 w-40 h-8 border-4 border-solid border-#eee pl-2 rounded-md"
          onChange={(event) => {
            setnewReview(event.target.value);
          }}
        />
        <br />
        <button
          className="border border-sky-500/100 border-solid bg-sky-500/100 w-20 h-8 rounded-md mt-4 mb-4"
          onClick={addReview}
        >
          Submit
        </button>
      </div>
      <details className="border-4 border-solid border-black rounded-md w-96 font-bold text-xl m-auto mt-4">
        <summary>Reviews</summary>
        {review.map((value, key) => {
          return (
            <div key={key} className="w-80 flex m-auto pb-4">
              <div className="w-80 m-auto">
                {value.username}: {value.review}
                <br></br>
                {authState.username === value.username && (
                  <button
                    className="w-40 border-sky-500/100 border-1 border-solid bg-sky-500/100 rounded-md m-auto"
                    onClick={() => {
                      deleteReview(value.id);
                    }}
                  >
                    DELETE
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </details>
    </div>
  );
}

export default Post;
