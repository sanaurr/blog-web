"use client";
// import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { UserContext } from '@/contexts/user-context';
import { LoadingContext } from '@/contexts/loading-context';
import { createPost } from './api-calls';

// import { TextareaAutosize } from "@mui/material-nextjs" 
export default function Newblog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const {accessToken, id, name} = useContext(UserContext);
    const {setIsLoading} = useContext(LoadingContext);
    useEffect(() => {
       setIsLoading(false); 
       console.log("loading finish");
    },[]);

    async function handleSubmit(event) {
        event.preventDefault();
       
        if(title === '' || content === '' || category === '') {
            alert('Please fill all the fields');
            return;
        }
        let formdata = new FormData();
        formdata.append("content", content);
        formdata.append("title", title);
        formdata.append("category", category);
        formdata.append("author", name);
        formdata.append("authorid", id);
        
        // var requestOptions = {
        //     method: 'POST',
        //     body: formdata,
        //     redirect: 'follow'
        // };
        // axios.post('http://localhost:3005/posts/', formdata, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //       'authorization': accessToken,
        //     }
        //   })
        //   .then(response => {
        //     console.log('Response:', response.data);
        //   })
        //   .catch(error => {
        //     console.error('Error:', error);
        //   });
        createPost(formdata,accessToken).catch(error => console.error('There was a problem with the fetch operation:', error));

        setTitle('');
        setContent('');
        setCategory('');
    }
    return (
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


                    {/* Save Button */}
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
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


