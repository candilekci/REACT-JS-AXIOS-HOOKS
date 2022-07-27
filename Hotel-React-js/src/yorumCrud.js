import { useState, useEffect } from "react";
import Axios from "axios";


const useCommentList = () => {
    const [comments, setComments]=useState([]);

    





    useEffect(() => {
        Axios.get("http://localhost:15252/api/comments").then((response) => {
            setComments(response.data)
        });

    }, []);

    const commentPost = async (data) => {
        const postCommentaxios = await Axios.post('http://localhost:15252/api/comments', data)
        if (commentPost.status === 200) {
          return postCommentaxios.data;
        }
      };

      const commentDelete = (id) => {
        Axios.delete(`http://localhost:15252/api/comments/${id}`)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      
      };


    return { comments ,  commentPost,commentDelete};
}

export default useCommentList;
