import axios from "axios";
import {ACTIVATODOES_FAIL, ACTIVATODOES_SUCCESS} from "./types";

export const verify = (uid, token) => async dispatch => {
  console.log(uid);
  console.log("^^^ verify uid");
  console.log(token);
  console.log("^^^ verify token");

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ uid, token });

  try {
    console.log(`${API_ROOT_URL}auth/users/activation/`);
    console.log("^^^ URL Activation");

    const res = await axios.post(
      `${API_ROOT_URL}auth/users/activation/`,
      body,
      config
    );

    if (res.data) {
      dispatch({
        type: ACTIVATODOES_SUCCESS,
        data: res.data
      });
    } else {
      dispatch({
        type: ACTIVATODOES_FAIL,
        data: res.data
      });
    }

    dispatch({
      type: ACTIVATODOES_SUCCESS,
      data: res.data
    });
  } catch (err) {
    dispatch({
      type: ACTIVATODOES_FAIL
    });
  }
};


