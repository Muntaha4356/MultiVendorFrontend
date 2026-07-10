import { minWidth } from '@mui/system';
import React, { useEffect } from 'react'
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Loader from '../Layout/Loader';
import { toast } from 'react-hot-toast';
const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller?._id]);


  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id));
      await dispatch(getAllProductsShop(seller._id));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  }


  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "stock", headerName: "Stock", minWidth: 80, flex: 0.5 },
    { field: "sold", headerName: "Sold Out", minWidth: 130, flex: 0.6, },
    { field: "actions", headerName: "Actions", minWidth: 150, flex: 0.6, },
    {
      field: "Preview", headerName: "", minWidth: 100, flex: 0.8, type: "number", sortable: false, renderCell: (params) => {
        return (
          <Link to={`/product/${params.id}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Delete", headerName: "", minWidth: 100, flex: 0.8, type: "number", sortable: false, renderCell: (params) => {
        return (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(params.id);
            }}
          >
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  const row = [];
  products && products.forEach((item) => {
    row.push({
      id: item._id,
      name: item.name,
      price: `US$ ${item.discountPrice}`,
      stock: item.stock,
      sold: item.sold_out ?? 0,
    });
  });



  (products)
  return (
    <div  >
      {
        isLoading ? <Loader /> : [
          <div className='mx-8 pt-1 mt-10 bg-white h-[85vh] '>
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight={false} />
          </div>
        ]
      }
    </div>
  )
}

export default AllProducts
