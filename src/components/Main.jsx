import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { NameContext } from './../NameContext';
const Main = () => {
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({});
  const [refreshData, setRefreshData] = useState(false);
  const {name, setName} = useContext(NameContext)

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get("http://localhost:4000/api/comments");
      setComments(data);
    }
    console.log(name);
    getData();
    console.log(1);
  }, [refreshData]);

  useEffect(()=>{
    const token = localStorage.getItem("token");

    const decoded = jwtDecode(token);
    const nameDecode = decoded.name;
    setName(nameDecode)

  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const nameDecode = decoded.name;
    setName(nameDecode)
    console.log(nameDecode);
    setData({ ...data, name: nameDecode });
    const comment = {
      name: nameDecode,
      body: data.body,
    };
    // console.log(data);
    const result = await axios.post(
      "http://localhost:4000/api/comments",
      comment
    );
    // localStorage.setItem("token", result.data["x-auth-token"]);
    setRefreshData(!refreshData);
  };

  return (
    <div className="mainSpace">
      <div className="mainHeader">
        <h2>Hello {name}</h2>
      </div>
      <div className="formSpace2">
        <form className="commentForm" onSubmit={handleSubmit}>
          <label id="commentLabel" htmlFor="comment">
            Write a comment for our Database
          </label>
          <input
            onChange={(e) => setData({ ...data, body: e.target.value })}
            type="text"
            name="comment"
            placeholder="Insert a comment"
          />
          <button id="submitCom" className="submitBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="commentsSpace">
        {comments.map((comment) => (
          <div className="commentDiv" key={comment._id}>
            <p className="names">@ {comment.name}</p>
            <p className="bodies">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
