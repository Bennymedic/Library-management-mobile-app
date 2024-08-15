import axios from "axios";
import { IBook, IPublisher } from "../../types/type";
import { URL } from "../../component/helper/URl";

axios.defaults.baseURL = URL;

export async function getAllBooks() {
  try {
    const res = await axios.get("/books");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {}
  return [];
}

export async function createBook(book: IBook) {
  try {
    const res = await axios.post(`/books`, book);
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {}
  return null;
}

export async function updateBook(book_id: string, book: IBook) {
  try {
    const res = await axios.put(`books/${book_id}`, book);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {}
  return null;
}

export async function deleteBook(book_id:string){
    try {
        const res = await axios.delete(`books/${book_id}`);
        if(res.status === 200){
            return true;
        }
    } catch (error) {
        
    }
    return false
}
