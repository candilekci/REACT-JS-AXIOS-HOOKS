import axios from 'axios'


const putaxios = async (create) => {


  const putdegisken = await axios.put('http://localhost:15252/api/hotels', create)
  if (putdegisken.status === 200) {
    return putdegisken.data;
  }
}

export default putaxios
