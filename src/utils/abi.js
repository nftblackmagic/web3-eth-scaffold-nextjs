import axios from "axios";
import { API_DB } from "../config/constant";

async function getAbi(address, chain) {
  const res = await axios.get(API_DB + "abi/" + chain + "/" + address);
  console.log(res.data.result);
  return res.data.result;
}

export default getAbi;
