"use client";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/user-context";
import { LoadingContext } from "@/contexts/loading-context";
import { createPost, generateByAI } from "./api-calls";
import { useRouter } from "next/navigation";
import RichTextEditor from "./quil-editor";

export default function Newblog() {
  // Dialog state for PookieAI
  const [showPookieDialog, setShowPookieDialog] = useState(false);
  // Handle dialog submit
  function handlePookieDialogSubmit(e) {
    e.preventDefault();
    setShowPookieDialog(false);
    setTopic("");
    // Optionally, trigger AI generation here
    handleAIGenerate();
  }
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { accessToken, id, name } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [topic, setTopic] = useState("");

  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
    console.log("loading finish");
  }, [setIsLoading]);

  async function handleAIGenerate() {
    if (!category || category === "" || category === "Select a category") {
      alert("Please select a category before generating content.");
      return;
    }
    if (!topic || topic.trim() === "" || topic === "Enter a topic") {
      alert("Please enter a topic before generating content.");
      return;
    }
    setIsLoading(true);
    try {
      const aiContent = await generateByAI(topic, category, 500, accessToken);
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
    setIsLoading(true);
    router.push("/myblog");
  }

  return (
    <div className=" p-8 rounded-2xl shadow-neu dark:shadow-neuDark bg-neuBase dark:bg-neuBaseDark">
      {/* Top row: Dropdown + Save */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        {/* Dropdown Menu */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="category"
            className="font-semibold text-neuText dark:text-neuTextDark"
          >
            Category:
          </label>
          <select
            id="category"
            className="p-2 rounded-lg text-neuText dark:text-neuTextDark bg-neuBase dark:bg-neuBaseDark shadow-neuInset dark:shadow-neuInsetDark focus:shadow-neuLg dark:focus:shadow-neuLgDark hover:shadow-neuLg dark:hover:shadow-neuLgDark transition focus:outline-none border-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Politics">Politics</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
          </select>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-4">
          {/* AI Generate Button */}
          <button
            className="bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark
           px-6 py-2 rounded-lg shadow-neu dark:shadow-neuDark transition hover:shadow-neuLg 
           dark:hover:shadow-neuLgDark active:shadow-neuInset dark:active:shadow-neuInsetDark 
           focus:outline-none font-semibold mr-4"
            onClick={() => setShowPookieDialog(true)}
          >
            Generate with PookieAI
          </button>
          {/* Dialog for PookieAI topic input */}
          {showPookieDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white p-6 rounded shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4">
                  Enter a topic for PookieAI
                </h2>
                <form onSubmit={handlePookieDialogSubmit}>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter topic..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => {
                        setShowPookieDialog(false);
                        setTopic("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      disabled={!topic.trim()}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Save Button */}
          <button
            className="bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark px-6 py-2 rounded-lg shadow-neu dark:shadow-neuDark transition hover:shadow-neuLg dark:hover:shadow-neuLgDark active:shadow-neuInset dark:active:shadow-neuInsetDark focus:outline-none font-semibold"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <TextareaAutosize
          required
          minRows={5}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-6 p-4 rounded-lg bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark shadow-neuInset dark:shadow-neuInsetDark border-none focus:outline-none text-2xl font-bold resize-none"
        />
       
        <RichTextEditor initialvalue={content} setValue={(content) => {
          console.log(content);
          setContent(content);
        }} className="w-full flex-1 p-4 rounded-lg bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark shadow-neuInset dark:shadow-neuInsetDark border-none focus:outline-none resize-none" />
      </form>
    </div>
  );
}
