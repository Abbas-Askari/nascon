"use client";

import { revalidate } from "@/lib/actions";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

function CommentForm({ threadId }) {
  const [cotent, setCotent] = useState("");
  const { token } = useAppSelector((state) => state.auth);

  const router = useRouter();

  function submit(e) {
    e.preventDefault();

    fetch("http://localhost:4000/threads/" + threadId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        content: cotent,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Comment Created");
        }
        return res.json();
      })
      .then((json) => {
        console.log(json);
        revalidate("/threads/" + threadId);
        router.push("/threads/" + threadId);
      });
  }

  return (
    <form onSubmit={submit}>
      <input
        onChange={(e) => setCotent(e.target.value)}
        value={cotent}
        type="text"
        name=""
        id=""
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;
