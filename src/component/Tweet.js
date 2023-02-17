import React, { useState, useEffect } from "react";
import Axios from "./request";

const Tweet = () => {
  const [user, setUser] = useState({});
  const [allTweet, setAllTweet] = useState([]);
  const [tweet, setTweet] = useState("");
  const [comment, setComment] = useState("");
  const handleTweetChange = (event) => {
    setTweet(event.target.value);
  };
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/";
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("/api/tweet/", {
      content: tweet,
    })
      .then(({ data }) => {
        // console.log(data)
        alert("tweet added successfully");
      })
      .catch((err) => {});
  };
  const handleDelete = (id) => {
    Axios.delete(`/api/tweet/${id}`)
      .then(({ data }) => {
        alert("tweet delete successfully");
      })
      .catch((err) => {
        alert("error occur while on tweet deletion");

        console.log(err);
      });
  };
  const handleComment = (id) => {
    console.log(comment);
    Axios.post(`/api/comment/${id}`, {
      content: comment,
    })
      .then(({ data }) => {
        alert("comment added successfully");
      })
      .catch((err) => {
        alert(err.response.data.error[0]);
      });
  };

  const getTweet = () => {
    Axios.get("/api/tweet/all")
      .then(({ data }) => {
        console.log(data);
        setAllTweet(data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (!token) {
      window.location = "/";
      return;
    }
    getTweet();
    setUser(JSON.parse(localStorage.user));
    return;
  }, []);
  return (
    <div>
      <span>
        {" "}
        <button onClick={handleLogout}>log out </button>
      </span>
      <span>
        <h1>Post tweet</h1>
      </span>
      <form onSubmit={handleSubmit}>
        <label>
          content:
          <input type="text" value={tweet} onChange={handleTweetChange} />
        </label>

        <button type="submit">Tweet</button>
      </form>

      <h1>All Tweet</h1>
      {allTweet.length > 0 ? (
        allTweet.map((tweet, key) => (
          <div key={key}>
            <div>
              <h3>Tweet {key + 1}</h3>
              <h3></h3>Tweet content: {tweet.content}
              {user.userId === tweet.user.id && (
                <span>
                  {" "}
                  <button
                    onClick={() => {
                      handleDelete(tweet.id);
                    }}
                  >
                    {" "}
                    Delete Tweet
                  </button>{" "}
                </span>
              )}
            </div>
            <div>Tweeted by: {tweet.user.name} </div>
            <br />
            <br />
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              onClick={() => {
                handleComment(tweet.id);
              }}
            >
              comment
            </button>
            <br />
            <br />
            <h4>All comment</h4>
            {tweet.comment.map((comment, key) => (
              <div key={key}>{comment.content}</div>
            ))}
            <br />
            <br />
          </div>
        ))
      ) : (
        <h1>No tweet at the moment. be the first to tweet</h1>
      )}
    </div>
  );
};

export default Tweet;
