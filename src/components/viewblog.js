"use client";

import { LoadingContext } from "@/contexts/loading-context";
import { UserContext } from "@/contexts/user-context";
import { useContext, useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { deletePost, getPostById, updatePost } from "./api-calls";

export default function Viewblog({ article }) {
  const splitart = article.split("-");
  const artid = splitart[splitart.length - 1];
  const { setIsLoading } = useContext(LoadingContext);
  const { id, isloggedin } = useContext(UserContext);
  const [editMode, seteditMode] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { accessToken, name } = useContext(UserContext);
  const [art, setArt] = useState({});
  const [date, setDate] = useState("");

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getPostById(artid)
      .then((article) => setArt({ ...article, id: artid }))
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error)
      );
  }, []);

  useEffect(() => {
    console.log(editMode, "editmode");
    console.log(art, "article");
    if (editMode) {
      console.log("editmode");
      setTitle(art.title);
      setContent(art.content);
      setCategory(art.category);
      setDate(art.date);
    }
  }, [editMode, art]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (title === "" || content === "" || category === "") {
      alert("Please fill all the fields");
      return;
    }
    let formdata = new FormData();
    formdata.append("content", content);
    formdata.append("title", title);
    formdata.append("category", category);
    formdata.append("author", name);
    formdata.append("authorid", id);
    updatePost(art.id, formdata, accessToken).catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );

    seteditMode(true);
  }
  const formattedDate = new Date(date).toLocaleDateString();

  async function handleDelete() {
    deletePost(artid, accessToken).catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );
    seteditMode(true);
  }

  return editMode ? (
    // <div className="min-h-screen bg-red pt-10">
    <div className="w-full bg-neu p-12 mb-12 shadow-neu rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl max-w-3xl font-bold mb-4">{art.title}</h1>
        <div>
          {isloggedin && id == art.authorid && (
            <div className="text-right p-2 rounded-lg">
              <button
                onClick={() => seteditMode(false)}
                className="mb-2 bg-neu shadow-neu hover:bg-neuInset text-neuText font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
            </div>
          )}
          <h1 className="text-3xl font-bold mb-4">Author: {art.author}</h1>
          <h3 className="font-bold mb-4">Created at: {formattedDate}</h3>
        </div>
      </div>
      <p className="text-lg">{art.content}</p>
      {/* <p>{category}</p> */}
      {/* <p>{id}</p> */}
    </div>
  ) : (
    // </div>
    <div className="w-full shadow-neu bg-neuBase p-10 mb-12 rounded-2xl">
      {/* <div className=""> */}
      {/* Dropdown and Save button row */}
      <div className="flex items-center justify-between gap-4">
        {/* Dropdown Menu */}
        <div>
          <label htmlFor="category" className="mr-2 text-neuText font-semibold">
            Choose a category:
          </label>
          <select
            id="category"
            className="bg-neuBase shadow-neuInset rounded-xl px-4 py-2 text-neuText focus:outline-none focus:shadow-neuLg transition-shadow duration-200 border-none"
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

        <div className="flex space-x-4">
          <button
            className="bg-neuBase shadow-neu font-semibold px-6 py-2 rounded-xl hover:shadow-neuLg hover:bg-red-100 transition-all duration-200 focus:outline-none"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-neuBase shadow-neu font-semibold px-6 py-2 rounded-xl hover:shadow-neuLg hover:bg-blue-100 transition-all duration-200 focus:outline-none"
            onClick={(event) => {
              handleSubmit(event);
            }}
          >
            Save
          </button>
        </div>
      </div>

      {/* Form Section */}
      {/* <div className="bg-neuBase shadow-neu rounded-2xl p-6 flex flex-col gap-4 max-w-xl mx-auto mt-8"> */}
      <form className="flex pt-8 flex-col flex-1" onSubmit={handleSubmit}>
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
          placeholder="Write your article"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full flex-1 mb-6 p-4 rounded-lg bg-neuBase text-neuText shadow-neuInset border-none focus:outline-none resize-none overflow-y-auto"
          style={{ minHeight: "450px", maxHeight: "600px" }}
        />
      </form>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
