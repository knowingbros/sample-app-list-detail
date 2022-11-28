import axios from "axios";

import {SEARCH_URL} from "../constants";
import {tokenContextObj} from "../apiUtils";

export const searchApi = (q, token) =>
  axios
    .get(SEARCH_URL, { params: { q }, ...tokenContextObj(token) })
    .then(response => response.data);
