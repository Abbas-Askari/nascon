import React from "react";
import CommentForm from "./commentForm";

async function ResourcePage({ params }) {
  const { threadId } = params;
  const { thread } = await fetch(
    `http://localhost:4000/threads/${threadId}`
  ).then((res) => res.json());
  console.log(thread);

  return (
    <div>
      <h1>{thread.title}</h1>
      <p>{thread.content}</p>
      {thread.messages.map((message) => (
        <div key={message._id}>
          <p>{message.content}</p>
        </div>
      ))}
      <CommentForm threadId={threadId} />
    </div>
  );
}

function Content({ content }) {
  if (content.type === "text") {
    return <p>{content.attachment}</p>;
  } else if (content.type === "image") {
    return <img src={"http://localhost:4000/" + content.attachment} alt="" />;
  } else if (content.type === "video") {
    return (
      <video width="320" height="240" controls>
        <source
          src={"http://localhost:4000/" + content.attachment}
          type="video/mp4"
        />
      </video>
    );
  }
}

export default ResourcePage;
