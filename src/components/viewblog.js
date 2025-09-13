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
    <div className="bg-neuBase dark:bg-neuBaseDark p-12 mb-12 shadow-neu dark:shadow-neuDark rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl max-w-3xl font-bold mb-4 text-neuText dark:text-neuTextDark">
          {art.title}
        </h1>
        <div>
          {isloggedin && id == art.authorid && (
            <div className="text-right p-2 rounded-lg">
              <button
                onClick={() => seteditMode(false)}
                className="mb-2 bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark hover:bg-neuInset dark:hover:bg-neuInsetDark text-neuText dark:text-neuTextDark font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
            </div>
          )}
          <h1 className="text-3xl font-bold mb-4 text-neuText dark:text-neuTextDark">
            Author: {art.author}
          </h1>
          <h3 className="font-bold mb-4 text-neuText dark:text-neuTextDark">
            Created at: {formattedDate}
          </h3>
        </div>
      </div>
      <p className="text-lg text-neuText dark:text-neuTextDark">
        {art.content}
      </p>
      {/* <p>{category}</p> */}
      {/* <p>{id}</p> */}
    </div>
  ) : (
    <div className="shadow-neu dark:shadow-neuDark bg-neuBase dark:bg-neuBaseDark p-10 mb-12 rounded-2xl flex flex-col ">
      {/* <div className=""> */}
      {/* Dropdown and Save button row */}
      <div className="flex items-center justify-between gap-4">
        {/* Dropdown Menu */}
        <div>
          <label
            htmlFor="category"
            className="mr-2 text-neuText dark:text-neuTextDark font-semibold"
          >
            Choose a category:
          </label>
          <select
            id="category"
            className="bg-neuBase dark:bg-neuBaseDark shadow-neuInset dark:shadow-neuInsetDark rounded-xl px-4 py-2 text-neuText dark:text-neuTextDark focus:outline-none focus:shadow-neuLg dark:focus:shadow-neuLgDark transition-shadow duration-200 border-none"
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
            className="bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark font-semibold px-6 py-2 rounded-xl hover:shadow-neuLg dark:hover:shadow-neuLgDark hover:bg-red-100 dark:hover:bg-red-900 transition-all duration-200 focus:outline-none text-neuText dark:text-neuTextDark"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark font-semibold px-6 py-2 rounded-xl hover:shadow-neuLg dark:hover:shadow-neuLgDark hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-200 focus:outline-none text-neuText dark:text-neuTextDark"
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
          className="w-full mb-6 p-4 rounded-lg bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark shadow-neuInset dark:shadow-neuInsetDark border-none focus:outline-none text-2xl font-bold resize-none"
        />
        <textarea
          required
          placeholder="Write your article"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full flex-1 mb-6 p-4 rounded-lg bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark shadow-neuInset dark:shadow-neuInsetDark border-none focus:outline-none resize-none overflow-y-auto"
          style={{ minHeight: "450px", maxHeight: "600px" }}
        />
      </form>
      {/* </div> */}
      </div>
  );
}
