import axios from "axios";
import { IMember } from "../../types/type";
import { URL } from "../../component/helper/URl";

axios.defaults.baseURL = URL;

export async function getAllMembers() {
  try {
    const res = await axios.get("/members");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {}
  return [];
}

export async function createMember(member: IMember) {
  try {
    const res = await axios.post(`/members`, member);
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {}
  return null;
}

export async function updateMember(member_id: string, member: IMember) {
  try {
    const res = await axios.put(`members/${member_id}`, member);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {}
  return null;
}

export async function deleteMember(member_id:string){
    try {
        const res = await axios.delete(`members/${member_id}`);
        if(res.status === 200){
            return true;
        }
    } catch (error) {
        
    }
    return false
}
