export const SET_TOKEN = "SET_TOKEN";
export const LOGOUT = "LOGOUT";
export const USER_SINGUP = "USER_SINGUP";
export const SHOPINFO = "SHOPINFO";
export const LOGIN = "LOGIN";
export const CITY = "CITY";
export const GET_SELLER = "GET_SELLER";
export const GET_ALLCITY = "GET_ALLCITY";
export const SKIP = "SKIP";
export const GET_TIME = "GET_TIME";

import config from "../../constants/config";
import axios from "axios";
import FormData from "form-data";

export const setAccessToken = (token) => {
  return async (dispatch) => {
    dispatch({ type: SET_TOKEN, data: token });
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};

export const singup = (
  username,
  password,
  name,
  family,
  codmeli,
  numberCard,
  numberBank
) => {
  return async (dispatch) => {
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("name", name);
    formdata.append("family", family);
    formdata.append("meli_code", codmeli);
    formdata.append("card_number", numberCard);
    formdata.append("bank_number", numberBank);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    return fetch(config.baseUrl + "/wp-json/chivane/v1/signup", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        const data = res;
        dispatch({ type: USER_SINGUP, data });
        return res;
      })

      .catch((error) => console.log("error", error));
  };
};

export const infoShop = (
  access_token,
  nameShop,
  NumberShop,
  phone,
  City,
  Address,
  Position,
  Positionlon,
  imageshop
) => {
  return async (dispatch) => {
    console.log(nameShop);
    const Header = {
      Authorization: "Bearer " + access_token,
    };

    var formdata = new FormData();
    formdata.append("shop_name", nameShop);
    formdata.append("shop_main_phone_number", NumberShop);
    formdata.append("shop_phone_number", phone);
    formdata.append("shop_city", City);
    formdata.append("shop_address", Address);
    formdata.append("shop_location", Position + Positionlon);
    formdata.append("shop_image", imageshop);

    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: Header,
    };

    return fetch(
      config.baseUrl + "/wp-json/chivane/v1/shopinfo",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        const data = res;
        dispatch({ type: SHOPINFO, data });
        return res;
      })

      .catch((error) => console.log("error", error));
  };
};

export const login = (userName, pass) => {
  return async (dispatch) => {
    var formdata = new FormData();
    formdata.append("username", userName);
    formdata.append("password", pass);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    return fetch(config.baseUrl + "/wp-json/jwt-auth/v1/token", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        const data = res;
        dispatch({ type: LOGIN, data });
        return res;
      })

      .catch((error) => console.log("error", error));
  };
};

export const getCity = (access_token) => {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/shop/cities";
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
        dispatch({ type: CITY, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};

export async function sendShopActive(access_token) {
  const Header = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token,
  };

  const url = config.baseUrl + "/wp-json/chivane/v1/sellerstatus/toggle";
  try {
    const response = await axios({
      method: "post",
      url: url,
      headers: Header,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

// export const uploadimage = async (access_token,upload ) => {

//   const Header = {
//     'Content-Type': 'application/json',
//     Authorization: "Bearer " + access_token,
//   }
//   const url = config.baseUrl + "/wp-json/wp/v2/media"

//   var formdata = new FormData();
//   formdata.append("file",upload );

//   try {
//     const response = await axios({
//       method: "POST",
//       url: url,
//       data: formdata,
//       headers: Header,
//     });
//     console.log(response.data);
//     return response;
//   } catch (error) {
//     console.log(error);

//   }
// }

// export const uploadimage = async (access_token, upload) => {

//   const Header = {
//     'Accept': 'application/json',
//     'Content-Type': "multipart/form-data",
//     Authorization: "Bearer " + access_token,
//   }

// //console.log(upload);
//   var formdata = new FormData();
//   formdata.append('file', upload);

//   var requestOptions = {
//     method: 'POST',
//     body: formdata,
//     headers: Header
//   };

//   return fetch(config.baseUrl + "/wp-json/wp/v2/media", requestOptions)
//   .then(response => response.json())
//     .then(function (response) {
//       console.log(response);
//       // if (type == "*/*")
//       //   return response.data.source_url;
//       // if (type == "image/*")
//       //   return response.data.media_details.sizes.full.source_url;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   // try {
//   //   const response = await fetch("https://chivane.com/wp-json/wp/v2/media", requestOptions)
//   //   const res = await response.json()
//   //   console.log(res)
//   //   return res
//   // } catch (error) {
//   //   return console.log('error', error)
//   // }
// };

export const getsellerinfo = (access_token) => {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/seller";
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
        dispatch({ type: GET_SELLER, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};

export const getAllcity = (access_token) => {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/address/price";
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
        dispatch({ type: GET_ALLCITY, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};

export const updateshopcity = (access_token, myData) => {
  const Header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token,
  };
  var requestOptions = {
    method: "POST",
    headers: Header,
    body:JSON.stringify(myData),
  };

  return fetch(
    config.baseUrl + "/wp-json/chivane/v1/address/price",
    requestOptions
  )
    .then((response) => {
      if (response.status != 200) {
        return { ok: false, data: response.statusText };
      }
      response.json();
    })
    .then((res) => {
      return { ok: true, data: res };
    })

    .catch((error) => console.log("error", error));
};


export const skip = () => {
  return async (dispatch) => {
    dispatch({ type: SKIP });
  };
};

export const gettime = (access_token) => {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/shop/30/times";
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
        // const resData = response;
        const data = response.data;
        //console.log(data);
        dispatch({ type: GET_TIME, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};

// export function gettime(access_token) {
//   return async (dispatch) => {
//     const Header = {
//       'Content-Type': 'application/json',
//       Authorization: "Bearer " + access_token,
//     }

//     var requestOptions = {
//       method: "get",
//       headers: Header,
//     }

//     return fetch(config.baseUrl + "/wp-json/chivane/v1/shop/29/times", requestOptions)
//       .then(response => response.json())
//       .then(res => {
//         // console.log(res)
//         dispatch({ type:  GET_TIME, res });
//         return res
//       })

//       .catch(error => console.log('error', error))
//   }
// }

export const settime = async (access_token, data) => {
  const Header = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token,
  };
  // var formdata = new FormData();
  // formdata.append("shop_open_1", data.saturday2 + ":" + data.saturday1);
  // formdata.append("shop_close_1", data.saturday4 + ":" + data.saturday3);
  // formdata.append("shop_open_two_1", data.saturday6 + ":" + data.saturday5);
  // formdata.append("shop_close_two_1", data.saturday8 + ":" + data.saturday7);
  // console.log(formdata);
  let myBody = {
    shop_open_1: "22:22",
  };
  const url = config.baseUrl + "/wp-json/chivane/v1/shop/30/times";
  try {
    const response = await axios({
      method: "post",
      url: url,
      headers: Header,
      data: myBody,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
