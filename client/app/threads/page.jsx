import React from "react";

async function ForumsPage() {
  const { threads } = await fetch("http://localhost:4000/threads").then((res) =>
    res.json()
  );

  console.log(threads, `/threads/${threads[0]?._id.toString()}`);
  return (
    <div>
      {threads.map((thread) => (
        <div herf={`/threads/${thread?._id.toString()}`} key={thread._id}>
          <h1>{thread.title}</h1>
          <p>{thread.content}</p>
          {/* <p>{thread?._id.toString()}</p> */}
        </div>
      ))}
    </div>
  );
}

export default ForumsPage;
