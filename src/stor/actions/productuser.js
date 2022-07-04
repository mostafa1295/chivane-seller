export const PRODUCT_SEARCH = "PRODUCT_SEARCH";
export const GET_SHOP_ORDER = "GET_SHOP_ORDER";
export const GET_ORDER = "GET_ORDER";
export const GET_COUPEN = "GET_COUPEN";
export const Get_Category = "Get_Category";
export const GET_PRODUCT = "GET_PRODUCT";
export const GET_DETAILSPRODUCT = "GET_DETAILSPRODUCT";

import config from "../../constants/config";
import axios from "axios";
import FormData from "form-data";

export function createproduct(
  access_token,
  nameProduct,
  Description,
  Priceregular,
  PriceSale,
  Addone,
  AddPriceone,
  Addtwo,
  AddPricetwo,
  Addthree,
  AddPricethree,
  selectedImage,
  act,
  service
) {
  const Header = {
    Authorization: "Bearer " + access_token,
  };
  console.log(access_token);
  console.log(nameProduct);
  console.log(Description);
  console.log(Priceregular);
  console.log(PriceSale);
  console.log(Addone);
  console.log(AddPriceone);
  console.log(Addtwo);
  console.log(AddPricetwo);
  console.log(Addthree);
  console.log(AddPricethree);
  console.log(selectedImage);
  console.log(act);
  console.log(service);
  var formdata = new FormData();
  formdata.append("name", nameProduct);
  formdata.append("description", Description);
  formdata.append("regular_price", Priceregular);
  formdata.append("sale_price", PriceSale);
  formdata.append("extra_food_addon_one", Addone);
  formdata.append("extra_food_addon_price_one", AddPriceone);
  formdata.append("extra_food_addon_two", Addtwo);
  formdata.append("extra_food_addon_price_two", AddPricetwo);
  formdata.append("extra_food_addon_three", Addthree);
  formdata.append("extra_food_addon_price_three", AddPricethree);
  formdata.append("image", selectedImage);
  formdata.append("in_stock", act);
  formdata.append("category_id", service);

  var requestOptions = {
    method: "POST",
    headers: Header,
    body: formdata,
  };

  return fetch(config.baseUrl + "/wp-json/chivane/v1/products", requestOptions)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);

      return res;
    })

    .catch((error) => console.log("error", error));
}

export function productSearch(access_token, searching) {
  const Header = {
    Authorization: "Bearer " + access_token,
  };

  let formdata = new FormData();
  formdata.append("search", searching);

  var requestOptions = {
    method: "POST",
    headers: Header,
    body: formdata,
  };

  return fetch(
    "https://chivane.com/wp-json/chivane/v1/productsearch",
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      console.log(searching);

      return res;
    })

    .catch((error) => console.log("error", error));
}

export const getproduct = (access_token) => {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/shop/products";
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
        console.log(data);
        dispatch({ type: GET_PRODUCT, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};

export const getdetailsproduct = (access_token, ids) => {
  return async (dispatch) => {
    let Header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    };

    const url = config.baseUrl + "/wp-json/chivane/v1/shop/product/" + ids;

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
        dispatch({ type: GET_DETAILSPRODUCT, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};

export const getCategory = (access_token) => {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/shop/categories";
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
        const data = Object.keys(resData.data).map(function (key) {
          return resData.data[key];
        });
        //console.log(data);
        dispatch({ type: Get_Category, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};

export function getshoporder(access_token) {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/orders";
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
        dispatch({ type: GET_SHOP_ORDER, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
}

export const getcoupen = (access_token) => {
  return async (dispatch) => {
    const url = config.baseUrl + "/wp-json/chivane/v1/coupon";
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
        dispatch({ type: GET_COUPEN, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};

export function addcoupon(access_token, coupon1, coupon2, coupon3, price) {
  const Header = {
    Authorization: "Bearer " + access_token,
  };

  var formdata = new FormData();
  formdata.append("coupon_1", coupon1);
  formdata.append("coupon_2", coupon2);
  formdata.append("coupon_3", coupon3);
  formdata.append("min_spent", price);

  var requestOptions = {
    method: "POST",
    headers: Header,
    body: formdata,
  };

  return fetch(config.baseUrl + "/wp-json/chivane/v1/coupon", requestOptions)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);

      return res;
    })

    .catch((error) => console.log("error", error));
}

export const getorder = (access_token, ids) => {
  return async (dispatch) => {
    let Header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    };
    const url = config.baseUrl + "/wp-json/chivane/v1/orders/" + ids;

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
        dispatch({ type: GET_ORDER, data });
        return response;
      })
      .catch(function (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error);
      });
  };
};

export function accepttiming(access_token, time) {
  const Header = {
    Authorization: "Bearer " + access_token,
  };
  var formdata = new FormData();
  formdata.append("time", time);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: Header,
  };

  return fetch(
    config.baseUrl + "/wp-json/chivane/v1/order/23/accept",
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      console.log(res);

      return res;
    })

    .catch((error) => console.log("error", error));
}
