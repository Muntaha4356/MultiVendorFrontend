import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ isSeller, seller, children }) => {
  const { isLoading } = useSelector((state) => state.seller);
  if (isLoading) { return <Loader />; }

  if (!isSeller) {
    return <Navigate to={`/`} replace />
  }
  return children
  
}

export default SellerProtectedRoute