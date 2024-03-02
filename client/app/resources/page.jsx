import Link from "next/link";
import React from "react";

async function ResourcesPage() {
  const { posts } = await fetch("http://localhost:4000/posts").then((res) =>
    res.json()
  );

  return (
    <div>
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
}

function PostCard({ post }) {
  const image = post.content.find((c) => c.type === "image");
  console.log(
    "http://localhost:4000/" + image?.attachment.replaceAll(" ", "%20")
  );
  return (
    <Link href={`/resources/${post._id}`}>
      <img
        className=" w-96"
        src={"http://localhost:4000/" + image?.attachment}
        alt=""
      />
      <h2>{post.title}</h2>
    </Link>
  );
}

export default ResourcesPage;
