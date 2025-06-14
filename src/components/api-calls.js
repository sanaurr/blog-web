
import axios from 'axios';
const domain = 'https://blog-server-sanaur-rahamans-projects.vercel.app/';
// const domain = 'http://localhost:3001/';



async function getAllPosts() {
    try {
        const response = await axios.get(`${domain}posts`, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            }
        });
        return response.data;
       
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

async function getPostById(id) {
    try {
        const response = await axios.get(`${domain}posts/${id}`, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching post with id ${id}:`, error);
        throw error;
    }
}



async function createPost(post,accessToken) {
    
    const response =  axios.post(`${domain}posts/`, post, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': accessToken,
        }
      })
    const data = response.data;
    return data;
}

async function updatePost(id, post,accessToken) {
    const response = axios.put(`${domain}posts/${id}`, post, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'authorization': accessToken,
        }
    })
    const data = await response.data;
    return data;
}

async function deletePost(id,accessToken) {
   const response = axios.delete(`${domain}posts/${id}`, {
        headers: {
            'authorization': accessToken,
        }
    })
    const data =  response.data;
    return data;
}


async function signup(formdata) {
    const response =  await axios.post(`${domain}users/`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    const data = response.data;
    return data;
}

async function logIn(formdata) {
    try{
        const response =  await axios.post(`${domain}login`, formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        const data = response.data;
        return data;
    } catch (e){
        console.log(e,"api call catch");
    }
}


export { getAllPosts, getPostById, createPost, updatePost, deletePost, signup, logIn }