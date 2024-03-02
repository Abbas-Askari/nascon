import { Button } from "@/components/ui/button";

import { revalidate } from "@/lib/actions";
import { uploadImages } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAppSelector } from "@/lib/hooks";
import { Label } from "../ui/label";

export const ResourceForm = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();

    uploadImages(contents).then((urls) => {
      fetch("http://localhost:4000/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: user._id,
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
  };

  const changeContentType = (index, type) => {
    const newContents = JSON.parse(JSON.stringify(contents));
    newContents[index].type = type;

    setContents(newContents);
  };

  const changeContentAttachment = (index, attachment) => {
    const newContents = JSON.parse(JSON.stringify(contents));
    newContents[index].type = type;

    setContents(newContents);
  };

  return (
    <div className="w-1/3">
      <form onSubmit={onSubmit} action="" className="flex flex-col space-y-2">
        <Label>{"Title"}</Label>
        <Input
          type="text"
          placeholder="Resource Title here"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {contents.map((content, index) => {
          return (
            <>
              <Label>{"Type"}</Label>
              <Select
                onValueChange={(value) => changeContentType(index, value)}
                defaultValue={"text"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a file type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
              <Label>{"Attachment"}</Label>
              {contents[index].type === "text" ? (
                <Input
                  type="text"
                  onChange={(e) =>
                    changeContentAttachment(index, e.target.value)
                  }
                  value={contents[index].attachment}
                  placeholder="Content Here"
                />
              ) : (
                <Input
                  type="file"
                  onChange={(e) =>
                    changeContentAttachment(index, e.target.value)
                  }
                  value={contents[index].attachment}
                />
              )}
            </>
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
          variant="outline"
        >
          Add Content
        </Button>

        <Button type="submit">Create Resource</Button>
      </form>
    </div>
  );
};
