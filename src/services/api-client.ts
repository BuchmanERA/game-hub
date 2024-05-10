import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "40dd7886ac0043cfaf088a618f0a4479",
  },
});