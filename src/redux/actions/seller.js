// Load Seller Request

export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch({ type: "AllSellersRequest" });
    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
        withCredentials: true,
    });
    dispatch({ type: "AllSellersSuccess", payload: data.sellers });
  }
  catch (error) {
    dispatch({ type: "AllSellersFailure", payload: error.response.data.message });
  }
}
