import {
  USER_SINGUP,
  LOGIN,
  CITY,
  GET_SELLER,
  GET_ALLCITY,
  SKIP,
  GET_TIME,
  SHOPINFO,
  SET_TOKEN,
  LOGOUT,
} from "../actions/userLogin";

const initialState = {
  username: null,
  password: null,
  name: null,
  family: null,
  meli_code: null,
  card_number: null,
  bank_number: null, 
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SINGUP:
      return { ...state, datauser: action.data };
    case LOGIN:
      return { ...state, datalogin: action.data };
    case CITY:
      return { ...state, datacity: action.data };
    case GET_SELLER:
      return { ...state, dataseller: action.data };
    case GET_ALLCITY:
      return { ...state, dataallcity: action.data };
    case SKIP:
      return { ...initialState, isLogin: true, skip: true };
    case GET_TIME:
      return { ...state, datatime: action.data };
    case SHOPINFO:
      return { ...state, datatime: action.data };
    case SET_TOKEN:
      return { ...state, datatoken: action.data };
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
