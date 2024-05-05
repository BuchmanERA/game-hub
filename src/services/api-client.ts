import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "a01dfd3de48448b9a0001134418ee41d",
  },
});