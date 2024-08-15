import axios from "axios";
import { IPublisher } from "../../types/type";
import { URL } from "../../component/helper/URl";

axios.defaults.baseURL = URL;

export async function getAllPublishers() {
  try {
    const res = await axios.get("/publishers");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {}
  return [];
}

export async function createPublisher(publisher: IPublisher) {
  try {
    const res = await axios.post(`/publishers`, publisher);
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {}
  return null;
}

export async function updatePublisher(publisher_id: string, publisher: IPublisher) {
  try {
    const res = await axios.put(`publishers/${publisher_id}`, publisher);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {}
  return null;
}

export async function deletePublisher(publisher_id:string){
    try {
        const res = await axios.delete(`publishers/${publisher_id}`);
        if(res.status === 200){
            return true;
        }
    } catch (error) {
        
    }
    return false
}
