
'use client';

import { LoadingContext } from "@/contexts/loading-context";
import { UserContext } from "@/contexts/user-context";
import { useContext, useEffect, useState } from "react";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { deletePost, getPostById, updatePost } from "./api-calls";

export default function Viewblog({ article }) {
    const splitart = article.split("-");
    const artid = splitart[splitart.length - 1];
    const { setIsLoading } = useContext(LoadingContext);
    const { id, isloggedin } = useContext(UserContext);
    const [editMode, seteditMode] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const { accessToken, name } = useContext(UserContext);
    const [art, setArt] = useState({});
    const [date, setDate] = useState('');

    useEffect(() => {
        setIsLoading(false);
    }, []);


    useEffect(() => {

        // fetch(`http://localhost:3005/posts/${artid}`, {
        //     headers: {
        //         'Cache-Control': 'no-cache, no-store, must-revalidate',
        //     }
        // })
        //     .then(async response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         setArt({ ... await response.json(), id: artid });
        //     })
        //     .catch(error => {
        //         console.error('There was a problem with the fetch operation:', error);
        //     });
        getPostById(artid).then(article =>setArt({...article, id: artid})).catch(error => console.error('There was a problem with the fetch operation:', error));
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
        if (title === '' || content === '' || category === '') {
            alert('Please fill all the fields');
            return;
        }
        let formdata = new FormData();
        formdata.append("content", content);
        formdata.append("title", title);
        formdata.append("category", category);
        formdata.append("author", name);
        formdata.append("authorid", id);
        // axios.put(`http://localhost:3005/posts/${art.id}`, formdata, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'authorization': accessToken,
        //     }
        // })
        //     .then(response => {
        //         console.log('Response:', response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        updatePost(art.id, formdata, accessToken).catch(error => console.error('There was a problem with the fetch operation:', error));

        seteditMode(true);

    }
    const formattedDate = new Date(date).toLocaleDateString();

    async function handleDelete() {
        // axios.delete(`http://localhost:3005/posts/${artid}`, {
        //     headers: {
        //         'authorization': accessToken,
        //     }
        // })
        // .then(response => {
        //     console.log('Response:', response.data);
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });
        deletePost(artid, accessToken).catch(error => console.error('There was a problem with the fetch operation:', error));
        seteditMode(true);
    }

    return (
        editMode ?
            <div className="min-h-screen bg-gray-500 pt-10">
                <div className="max-w-4xl mx-auto bg-gray-700 text-white p-8 shadow-lg rounded-lg">
                    <div className="flex items-center justify-between mb-4" >
                        <h1 className="text-3xl font-bold mb-4" >{art.title}</h1>
                        <div>
                            {isloggedin && id == art.authorid &&
                                <div className="text-right">
                                    <button
                                        onClick={() => seteditMode(false)}
                                        className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Edit</button>
                                </div>
                            }
                            <h1 className="text-3xl font-bold mb-4" >Author: {art.author}</h1>
                            <h3 className="font-bold mb-4" >Created at: {formattedDate}</h3>
                        </div>
                    </div>
                    <p>{art.content}</p>
                    {/* <p>{category}</p> */}
                    {/* <p>{id}</p> */}
                </div>
            </div>
            :
            <div className="min-h-screen bg-gray-500 pt-10">
                <div className="max-w-4xl mx-auto bg-gray-700 text-white p-8 shadow-lg rounded-lg">

                    {/* Dropdown and Save button row */}
                    <div className="flex items-center justify-between mb-6">
                        {/* Dropdown Menu */}
                        <div>
                            <label htmlFor="category" className="mr-2">Choose a category:</label>
                            <select
                                id="category"
                                className="p-2 rounded-md text-gray-700"
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

                        <div className="flex space-x-4" >
                            <button 
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                            onClick={handleDelete}
                            >Delete</button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                                onClick={(event) => {
                                    handleSubmit(event);
                                }}

                            >
                                Save
                            </button>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div>
                        <form>
                            <TextareaAutosize
                                required
                                maxRows={1}
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black' }}

                            />
                            <TextareaAutosize
                                required
                                minRows={5}
                                placeholder="Write your article"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black' }}
                            />
                        </form>
                    </div>
                </div>

            </div>

    );
}