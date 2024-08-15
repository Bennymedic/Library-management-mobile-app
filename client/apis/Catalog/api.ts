import axios from "axios";
import { ICatalog, IPublisher } from "../../types/type";
import { URL } from "../../component/helper/URl";

axios.defaults.baseURL = URL;

export async function getAllCatalogs() {
  try {
    const res = await axios.get("/catalogs");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {}
  return [];
}

export async function createCatalog(catalog: ICatalog) {
  try {
    const res = await axios.post(`/catalogs`, catalog);
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {}
  return null;
}

export async function updateCatalog(catalog_id: string, catalog: ICatalog) {
  try {
    const res = await axios.put(`catalogs/${catalog_id}`, catalog);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {}
  return null;
}

export async function deleteCatalog(catalog_id:string){
    try {
        const res = await axios.delete(`catalogs/${catalog_id}`);
        if(res.status === 200){
            return true;
        }
    } catch (error) {
        
    }
    return false
}
