import axios from "axios";
import { ICatalog, IPublisher, ITransaction } from "../../types/type";
import { URL } from "../../component/helper/URl";

axios.defaults.baseURL = URL;

export async function getAllTransaction() {
  try {
    const res = await axios.get("/transactions");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {}
  return [];
}

export async function createTransaction(transaction: ITransaction) {
  try {
    const res = await axios.post(`/transactions`, transaction);
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {}
  return null;
}

export async function updateTransaction(transaction_id: string, transaction: ITransaction) {
  try {
    const res = await axios.put(`transactions/${transaction_id}`, transaction);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {}
  return null;
}

export async function deleteTransaction(transaction_id:string){
    try {
        const res = await axios.delete(`transactions/${transaction_id}`);
        if(res.status === 200){
            return true;
        }
    } catch (error) {
        
    }
    return false
}
