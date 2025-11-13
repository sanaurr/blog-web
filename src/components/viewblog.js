"use client";

import { LoadingContext } from "@/contexts/loading-context";
import { UserContext } from "@/contexts/user-context";
import { useContext, useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { deletePost, editByAI, getPostById, updatePost } from "./api-calls";
import RichTextEditor from "./quil-editor";

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
  const [showPookieDialog, setShowPookieDialog] = useState(false);
  const [instruction, setInstruction] = useState("");

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

   function handlePookieDialogSubmit(e) {
     e.preventDefault();
     setShowPookieDialog(false);
     setInstruction("");
     // Optionally, trigger AI generation here
     handleAIGenerate();
  }
  
  async function handleAIGenerate() {
    if (!category || category === "" || category === "Select a category") {
      alert("Please select a category before generating content.");
      return;
    }
    if (!instruction || instruction.trim() === "" || instruction === "Enter instructions") {
      alert("Please enter a topic before generating content.");
      return;
    }
    setIsLoading(true);
    try {
      const aiContent = await editByAI(instruction, title, content, category, 500, accessToken);
      console.log("AI Content:", aiContent);
      setTitle(aiContent.title || "");
      setContent(aiContent.content || "");
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating AI content:", error);
      setIsLoading(false);
    }
  }
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
   await updatePost(art.id, formdata, accessToken).catch((error) =>
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
            <div className="flex space-x-4 p-4 ">
              <button
                onClick={() => seteditMode(false)}
                className="bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark font-semibold px-6 py-2 rounded-xl hover:shadow-neuLg dark:hover:shadow-neuLgDark hover:bg-red-100 dark:hover:bg-red-900 transition-all duration-200 focus:outline-none text-neuText dark:text-neuTextDark"
              >
                Edit
              </button>
              <button
                className="bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark font-semibold px-6 py-2 rounded-xl hover:shadow-neuLg dark:hover:shadow-neuLgDark hover:bg-red-100 dark:hover:bg-red-900 transition-all duration-200 focus:outline-none text-neuText dark:text-neuTextDark"
                onClick={handleDelete}
              >
                Delete
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
      <div
        className="text-lg text-neuText dark:text-neuTextDark"
        dangerouslySetInnerHTML={{ __html: art.content }}
      />
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
            className="bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark
           px-6 py-2 rounded-lg shadow-neu dark:shadow-neuDark transition hover:shadow-neuLg 
           dark:hover:shadow-neuLgDark active:shadow-neuInset dark:active:shadow-neuInsetDark 
           focus:outline-none font-semibold mr-4"
            onClick={() => setShowPookieDialog(true)}
          >
            Edit with PookieAI
          </button>
          {/* Dialog for PookieAI topic input */}
          {showPookieDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white p-6 rounded shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4">
                  Enter a instruction for PookieAI
                </h2>
                <form onSubmit={handlePookieDialogSubmit}>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter instructions..."
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => {
                        setShowPookieDialog(false);
                        setInstruction("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      disabled={!instruction.trim()}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
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
        {/* <textarea
          required
          placeholder="Write your article"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full flex-1 mb-6 p-4 rounded-lg bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark shadow-neuInset dark:shadow-neuInsetDark border-none focus:outline-none resize-none overflow-y-auto"
          style={{ minHeight: "450px", maxHeight: "600px" }}
        /> */}
        <RichTextEditor initialvalue={content} setValue={setContent} />
      </form>
      {/* </div> */}
    </div>
  );
}
