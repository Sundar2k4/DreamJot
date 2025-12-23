import React, { useState, useEffect } from "react";

const Comment = ({ dreamId }) => {
  const token = localStorage.getItem("token");
  const [content, setContent] = useState("");
  const [commentdata, setCommentdata] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/getname", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setName(data.name))
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    if (!dreamId || !token) return;

    fetch(`http://localhost:5000/getcomment/${dreamId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }
        return res.json();
      })
      .then((commentdata) => {
        setCommentdata(commentdata);
        console.log("Successfully got comments");
      })
      .catch((err) => console.error(err));
  }, [dreamId, token]);

  const handleSend = async () => {
    if (!content.trim()) return;

    await fetch("http://localhost:5000/pushcomments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dreamId,
        name,
        content,
      }),
    });

    setContent("");
  };

  return (
    <div className="w-full max-w-md mt-6">
      <div className="relative">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add comment"
          className="w-full pr-12 pl-4 py-3 rounded-full bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none"
        />

        <button
          type="button"
          onClick={handleSend}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {commentdata.length > 0 ? (
          commentdata.map((comment, index) => (
            <div
              key={index}
              className="p-4 bg-white/10 rounded-xl border border-white/20"
            >
              <p className="text-white font-semibold">{comment.name}</p>
              <p className="text-white/80 mt-1">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-white/50 text-sm">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
