"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { revalidate } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

async function uploadImages(images) {
  let imageUrls = [];
  for (let image of images) {
    if (image.type === "text") {
      imageUrls.push(image.attachment);
      continue;
    }
    console.log(image);
    const form = new FormData();
    form.append("images", image.attachment, image.attachment.name);
    const res = await fetch("http://localhost:4000/images", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
      },
      body: form,
    });
    const { urls } = await res.json();
    imageUrls = [...imageUrls, ...urls];
  }
  return imageUrls;
}

function NewResourcePage() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([]);
  const router = useRouter();

  function submit(e) {
    e.preventDefault();

    uploadImages(contents).then((urls) => {
      fetch("http://localhost:4000/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          contents: contents.map((c, i) => ({
            type: c.type,
            attachment: urls[i],
          })),
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log("Resource Created");
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          revalidate("/resources").then(() => {
            router.push(`/resources/${json.post._id}`);
          });
        });
      console.log(urls);
    });

    // for (let content of contents) {
    //   if (content.type === "image" || content.type === "video") {
    //     uploadImages([content.attachment]);
    //   }
    // }
  }

  return (
    <div className="flex">
      <form onSubmit={submit} action="" className="flex flex-col gap-4">
        <div className="">
          <label htmlFor="">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </div>
        {contents.map((content) => {
          return (
            <Content
              key={content.id}
              {...content}
              setAttachment={(a) => {
                setContents((prev) => {
                  return prev.map((c) =>
                    c.id === content.id ? { ...c, attachment: a } : c
                  );
                });
              }}
              setType={(t) => {
                setContents((prev) => {
                  return prev.map((c) =>
                    c.id === content.id ? { ...c, type: t } : c
                  );
                });
              }}
            />
          );
        })}

        <Button
          onClick={() => {
            setContents((prev) => [
              ...prev,
              {
                id: new Date().getTime(),
                type: "text",
                attachment: "",
              },
            ]);
          }}
          type="button"
        >
          Add Content
        </Button>

        <Button type="submit">Create Resource</Button>
      </form>
    </div>
  );
}

function Content({ type, setType, attachment, setAttachment }) {
  return (
    <div className="flex flex-col gap-4">
      <select
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          if (e.target.value === "text") {
            setAttachment("");
          } else {
            setAttachment(null);
          }
        }}
        name="select"
        id=""
      >
        <option value="text">Text</option>
        <option value="video">Video</option>
        <option value="image">Image</option>
      </select>
      {type === "text" && (
        <textarea
          onChange={(e) => setAttachment(e.target.value)}
          value={attachment}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      )}

      {type === "video" && (
        <label>
          <div className=" pointer-events-none">Click to select Video</div>
          <input
            onChange={(e) => setAttachment(e.target.files[0])}
            type="file"
            className=" hidden"
          />
        </label>
      )}

      {type === "image" && (
        <label>
          <div className=" pointer-events-none">Click to select Image</div>
          <input
            onChange={(e) => setAttachment(e.target.files[0])}
            type="file"
            className=" hidden"
          />
        </label>
      )}
    </div>
  );
}

export default NewResourcePage;
