import { GET_COMMENT,GET_AVG,GET_STATIC } from "../actions/commandreport";



const initialState = {
    username: null,
    rating:null,
    first_name:null,
    last_names:null,
    comment_content:null,
    comment_date:null,
    password: null,
    name: null,
    family: null,
    meli_code: null,
    card_number: null,
    bank_number: null
}




export default (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENT:
            return { ...state, data: action.data };
            case GET_AVG:
            return { ...state, data: action.data };
            case GET_STATIC:
                return { ...state, data: action.data };
    


        default:
            return state
    }
}