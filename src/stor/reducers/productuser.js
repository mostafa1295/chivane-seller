import { PRODUCT_SEARCH, GET_SHOP_ORDER, GET_ORDER ,GET_COUPEN,Get_Category,GET_PRODUCT} from "../actions/productuser";




const initialState = {
    ID: null,
    post_author: null,
    post_date: null,
    post_date_gmt: null,
    post_content: null,
    post_title: null,
    post_excerpt: null,
    post_status: null,
    comment_status: null,
    ping_status: null,
    post_password: null,
    post_name: null,
    to_ping: null,
    pinged: null,
    post_modified: null,
    post_modified_gmt: null,
    post_content_filtered: null,
    post_parent: null,
    guid: null,
    menu_order: null,
    post_type: null,
    post_mime_type: null,
    comment_count: null,
    filter: null
}




export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_SEARCH:
            return { ...state, data: action.data };
        case GET_SHOP_ORDER:
            return { ...state, datashoporder: action.data };
        case GET_ORDER:
            return { ...state, dataorder: action.data };
            case GET_COUPEN:
            return { ...state, datacoupen: action.data };
            case Get_Category:
            return { ...state, datacategory: action.data };
            case GET_PRODUCT:
            return { ...state, dataproduct: action.data };


        default:
            return state
    }
}