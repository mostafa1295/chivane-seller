export const GET_COMMENT = "GET_COMMENT";
export const GET_AVG = "GET_AVG";
export const GET_STATIC = "GET_STATIC";

import config from "../../constants/config";
import axios from "axios";
import FormData from "form-data";

export const getcomment = (access_token,ids) => {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/shop/"+ids+"/comments";
    let Header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    };

    return axios({
      method: "get",
      url: url,
      headers: Header,
    })
      .then(function (response) {
        //console.log(response);
        const resData = response;
        const data = resData.data;
        //console.log(data);
        dispatch({ type: GET_COMMENT, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};

export function replycomment(access_token, reply, id) {
  const Header = {
    Authorization: "Bearer " + access_token,
  };

  var formdata = new FormData();
  formdata.append("comment_content", reply ? reply : "");
  formdata.append("comment_id", id);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: Header,
  };

  return fetch(
    config.baseUrl + "/wp-json/chivane/v1/comments/reply",
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
     // console.log(res);

      return res;
    })

    .catch((error) => console.log("error", error));
}

export const getavg = (access_token) => {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/shop/analytic";
    let Header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    };

    return axios({
      method: "get",
      url: url,
      headers: Header,
    })
      .then(function (response) {
        //console.log(response);
        const resData = response;
        const data = resData.data;
        //console.log(data);
        dispatch({ type: GET_AVG, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};

export const getstatic = (access_token) => {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/shop/static";
    let Header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    };

    return axios({
      method: "get",
      url: url,
      headers: Header,
    })
      .then(function (response) {
        //console.log(response);
        const resData = response;
        const data = resData.data;
        //console.log(data);
        dispatch({ type: GET_STATIC, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};
