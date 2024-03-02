import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const uploadImages = async (images) => {
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