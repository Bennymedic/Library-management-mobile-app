import axios from "axios";
import { IAuthor } from "../../types/type";
import { URL } from "../../component/helper/URl";

axios.defaults.baseURL = URL;

export async function getAllAuthors() {
  try {
    const res = await axios.get("/authors");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {}
  return [];
}

export async function createAuthor(author: IAuthor) {
  try {
    const res = await axios.post(`/authors`, author);
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {}
  return null;
}

export async function updateAuthor(author_id: string, author: IAuthor) {
  try {
    const res = await axios.put(`authors/${author_id}`, author);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {}
  return null;
}

export async function deleteAuthor(author_id:string){
    try {
        const res = await axios.delete(`authors/${author_id}`);
        if(res.status === 200){
            return true;
        }
    } catch (error) {
        
    }
    return false
}

export async function isElegibleUser(email: string) {
    try {
      if (email.trim() !== "") {
        const res = await axios.get(`/users?email=${email}`);
        console.log(res);
        if (res.status === 200 && res.data.length > 0) {
          return true;
        }
      }
    } catch (error) {}
    return false;
  }