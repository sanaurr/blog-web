import axios from "axios";
const domain = "https://blog-server-sanaur-rahamans-projects.vercel.app/";
// const domain = 'http://localhost:3005/';

async function getAllPosts(category) {
  try {
    const response = await axios.get(`${domain}posts/category/${category}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

async function getPostById(id) {
  try {
    const response = await axios.get(`${domain}posts/id/${id}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
}
async function getPostByUserId(id, accessToken) {
  console.log(id, "userid in getpostbyuserid");
  try {
    const response = await axios.get(`${domain}posts/user/${id}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });

    console.log(response.data, "response in getpostbyuserid");
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with userid ${id}:`, error);
    throw error;
  }
}

async function getLatestPosts() {
  try {
    const response = await axios.get(`${domain}posts/latest/${10}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    throw error;
  }
}

async function generateByAI(topic, category, length, accessToken) {
  const formData = new FormData();
  formData.append("topic", topic);
  formData.append("category", category);
  formData.append("length", length);

  const response = await axios.post(`${domain}assistant/generate`, formData, {
    headers: {
          "Content-Type": "multipart/form-data",
        
      authorization: accessToken,
    },
  });
  return response.data;
}

async function createPost(post, accessToken) {
  const response = axios.post(`${domain}posts/`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: accessToken,
    },
  });
  const data = response.data;
  return data;
}

async function updatePost(id, post, accessToken) {
  const response = axios.put(`${domain}posts/${id}`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: accessToken,
    },
  });
  const data = await response.data;
  return data;
}

async function deletePost(id, accessToken) {
  const response = axios.delete(`${domain}posts/${id}`, {
    headers: {
      authorization: accessToken,
    },
  });
  const data = response.data;
  return data;
}

async function signup(formdata) {
  const response = await axios.post(`${domain}users/`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const data = response.data;
  return data;
}

async function logIn(formdata) {
  try {
    const response = await axios.post(`${domain}login`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = response.data;
    return data;
  } catch (e) {
    console.log(e, "api call catch");
  }
}

export {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  signup,
  logIn,
  getPostByUserId,
  getLatestPosts,
  generateByAI,
};
