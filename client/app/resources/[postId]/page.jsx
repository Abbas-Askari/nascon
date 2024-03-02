import React from "react";

async function ResourcePage({ params }) {
  const { postId } = params;
  const { post } = await fetch(`http://localhost:4000/posts/${postId}`).then(
    (res) => res.json()
  );
  console.log(post);
  return (
    <div>
      <h1>{post.title}</h1>
      {post.content.map((c) => {
        return <Content content={c} />;
      })}
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
