"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill (to avoid SSR issues in Next.js)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function RichTextEditor({ initialvalue, setValue }) {
  // Custom toolbar: bold, italic, underline, bullet list
  const modules = {
    toolbar: [["bold", "italic", "underline"], [{ list: "bullet" }]],
  };

  // Responsive height and width
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    // Set initial size
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate editor size (e.g., 80% of width, 50% of height)
  const editorWidth = Math.max(320, Math.floor(dimensions.width * 0.92));
  const editorHeight = Math.max(300, Math.floor(dimensions.height * 0.5));

  return (
    <div className="mb-6">
      <ReactQuill
        theme="snow"
        value={initialvalue || ""}
        onChange={setValue}
        modules={modules}
        className="w-full flex-1 rounded-lg bg-neuBase dark:bg-neuBaseDark 
                   text-neuText dark:text-neuTextDark 
                   shadow-neuInset dark:shadow-neuInsetDark border-none 
                   focus:outline-none overflow-y-auto"
        style={{
          width: editorWidth,
          minHeight: editorHeight,
          maxHeight: editorHeight,
        }}
      />

      {/* Inline style overrides */}
      <style jsx global>{`
        /* Remove toolbar background & border */
        .ql-toolbar.ql-snow {
          border: none !important;
          background: transparent !important;
          padding: 4px 0 !important;
        }

        /* Style toolbar buttons */
        .ql-toolbar button {
          color: inherit !important;
          border-radius: 6px;
          transition: background 0.2s;
        }

        .ql-toolbar button:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        /* Match editor body styles */
        .ql-container.ql-snow {
          border: none !important;
          font-size: 16px;
          line-height: 1.6;
          padding: 12px;
          background: transparent !important;
          color: inherit;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}
