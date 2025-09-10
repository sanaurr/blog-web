"use client";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/user-context";
import { LoadingContext } from "@/contexts/loading-context";
import { createPost } from "./api-calls";

export default function Newblog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { accessToken, id, name } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(false);
    console.log("loading finish");
  }, [setIsLoading]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title || !content || !category) {
      alert("Please fill all the fields");
      return;
    }

    let formdata = new FormData();
    formdata.append("content", content);
    formdata.append("title", title);
    formdata.append("category", category);
    formdata.append("author", name);
    formdata.append("authorid", id);

    createPost(formdata, accessToken).catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );

    setTitle("");
    setContent("");
    setCategory("");
  }

  return (
    <div className="w-full p-8 rounded-2xl shadow-neu bg-neuBase flex flex-col">
      {/* Top row: Dropdown + Save */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        {/* Dropdown Menu */}
        <div className="flex items-center gap-2">
          <label htmlFor="category" className="font-semibold">
            Category:
          </label>
          <select
            id="category"
            className="p-2 rounded-lg text-neuText bg-neuBase shadow-neuInset focus:shadow-neuLg hover:shadow-neuLg transition focus:outline-none border-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Politics">Politics</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
            <option value="Health">Health</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          className="bg-neuBase text-neuText px-6 py-2 rounded-lg shadow-neu transition hover:shadow-neuLg active:shadow-neuInset focus:outline-none font-semibold"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <TextareaAutosize
          required
          minRows={5}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-6 p-4 rounded-lg bg-neuBase text-neuText shadow-neuInset border-none focus:outline-none text-2xl font-bold resize-none"
        />
        <textarea
          required
          placeholder="Write your article..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full flex-1 mb-6 p-4 rounded-lg bg-neuBase text-neuText shadow-neuInset border-none focus:outline-none resize-none overflow-y-auto"
          style={{ minHeight: "400px", maxHeight: "600px" }}
        />
      </form>
    </div>
  );
}
