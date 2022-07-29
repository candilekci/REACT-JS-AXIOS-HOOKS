import axios from 'axios'
//import React, { useState } from 'react'


const axiosDeneme = async (data) => {
  const postaxios = await axios.post('http://localhost:15252/api/hotels', data)
  if (postaxios.status === 200) {
    return postaxios.data;
  }
}

export default axiosDeneme
