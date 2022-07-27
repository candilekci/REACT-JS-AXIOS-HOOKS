import axios from 'axios'



const axiosDelete = (id) => {
  axios.delete(`http://localhost:15252/api/hotels/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

};
export default axiosDelete
