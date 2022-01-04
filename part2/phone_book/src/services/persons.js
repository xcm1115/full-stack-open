import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
}

const create = async newPerson => {
  const res = await axios.post(baseUrl, newPerson);
  return res.data;
}

const remove = async id => {
  const res = await axios.delete(`${baseUrl}/${id}`);
  return res.data;
}

const update = async person => {
  const res = await axios.put(`${baseUrl}/${person.id}`, person);
  return res.data;
}

const exportObj = {
  getAll,
  create,
  remove,
  update,
}

export default exportObj;