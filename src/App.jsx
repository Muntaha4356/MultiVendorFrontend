import { Route, Routes } from "react-router-dom";
// 3:06:42
import "./App.css";
import Login from "./pages/Login";
import ActivationPage from "./pages/ActivationPage";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import TestRedux from "./pages/TestRedux";
import Store from "./redux/store.js";
import { loadSeller, loadUser } from "./redux/actions/user.js";
import { getAllProducts } from "./redux/actions/product.js";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import BestSelling from "./pages/BestSelling.jsx";
import Events from "./pages/Events.jsx";
import Faq from "./pages/Faq.jsx";
import { useSelector } from "react-redux";
import ProductDetails from "./pages/ProductDetailsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import SellerCreatePage from "./pages/SellerCreatePage.jsx";
import ShopCreate from "./components/Shop/ShopCreate.jsx";
import SellerActivationPage from "./pages/SellerActivationPage.jsx";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import ShopHomePage from "./pages/ShopHomePage.jsx";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";
import ShopDashboardPage from "./pages/ShopDashboardPage.jsx";
import Loader from "./components/Layout/Loader.jsx";
import ShopCreateProduct from "./pages/ShopCreateProduct.jsx";
import ShopAllProducts from "./pages/Shop/ShopAllProducts.jsx";
import ShopAllEvents from "./pages/Shop/ShopAllEvents.jsx";
import ShopCreateEvent from "./pages/Shop/ShopCreateEvent.jsx";
import ShopAllCoupons from "./pages/Shop/ShopAllCoupons.jsx";
import ShopPreviewPage from "./components/Shop/ShopPreviewPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import { getAllEvents } from "./redux/actions/event.js";
function App() {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller, seller } = useSelector((state) => state.seller);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());

    if (isSeller) {
      navigate(`/shop/${seller._id}`)
    }
  }, []);
  return (
    loading || isLoading ? null : (
      <>
        <Toaster />
        <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000]">
          <div className="flex h-screen w-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/activation/:activation_token"
                element={<ActivationPage />}
              />
              <Route
                path="/shop/activation/:activation_token"
                element={<SellerActivationPage />}
              />
              <Route path="/test" element={<TestRedux />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/best-selling" element={<BestSelling />} />
              <Route path="/events" element={<Events />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/dashboard" element={<ShopDashboardPage />} />
              <Route path="/dashboard/create-product" element={<ShopCreateProduct />} />
              <Route path="/dashboard/products" element={<ShopAllProducts />} />
              <Route path="/dashboard/events" element={<ShopAllEvents />} />
              <Route path="/dashboard/create-event" element={<ShopCreateEvent />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/profile" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path='/checkout' element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              <Route path="/shop-create" element={<ShopCreate />} />
              <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
              <Route path="/shop/:id" element={
                <SellerProtectedRoute
                  isSeller={isSeller}
                >
                  <ShopHomePage />
                </SellerProtectedRoute>
              } />
              <Route path="/dashboard/coupons" element={
                <SellerProtectedRoute
                  isSeller={isSeller}
                >
                  <ShopAllCoupons />
                </SellerProtectedRoute>
              } />
              {/* <Route path="/loading" element= {<Loader/>}/> */}
            </Routes>
          </div>
        </div>
      </>
    )


  );
}

export default App;
