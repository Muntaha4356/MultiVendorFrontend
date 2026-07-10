import axios from "axios";
import {server} from "../../server";
// create Product
export const createProduct = (newForm) => async (dispatch) => {
    try {
        dispatch({ type: "productCreateRequest" });
        // only for sending request
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const { data } = await axios.post(`${server}/product/create-product`, newForm, config);

        dispatch({ type: "productCreateSuccess", payload: data?.product });

    }

    catch (error) {
        const message = error.response?.data?.message || error.message || "Something went wrong";
        dispatch({ type: "productCreateFail", payload: message });
    }
};

// get all products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
    try {
        dispatch({ type: "getAllProductsShopRequest" });
        const { data } = await axios.get(`${server}/product/get-all-products-shop/${id}`);
        dispatch({ type: "getAllProductsShopSuccess", payload: data?.products });
    }
    catch (error) {
        const message = error.response?.data?.message || error.message || "Something went wrong";
        dispatch({ type: "getAllProductsShopFailed", payload: message });
    }
};



// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: "deleteProductRequest" });
        const { data } = await axios.delete(`${server}/product/delete-shop-product/${id}`, {
            withCredentials: true,
        });
        dispatch({ 
            type: "deleteProductSuccess", 
            payload: data?.message 
        });
    }
    catch (error) {
        const message = error.response?.data?.message || error.message || "Something went wrong";
        dispatch({ type: "deleteProductFailed", payload: message });
        throw new Error(message);
    }
};




// get all products
export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ 
            type: "getAllProductsRequest" 
        });

        const { data } = await axios.get(`${server}/product/get-all-products`);
        dispatch({ 
            type: "getAllProductsSuccess", 
            payload: data?.products 
        });
    }
    catch (error) {
        dispatch({
            type: "getAllProductsFailed", 
            payload: error?.response?.data?.message 
        });
    }
};




// clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: "clearErrors" });
};