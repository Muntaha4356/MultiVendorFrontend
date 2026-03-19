import { minWidth } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Loader from '../Layout/Loader';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../server';
const AllCoupons = () => {
    // const { products, isLoading } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const { seller } = useSelector((state) => state.seller);
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [value, setValue] = useState(null);
    const [minAmount, setMinAmount] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [coupon, setCoupon] = useState([]);
    const { products } = useSelector((state) => state.products);

    useEffect(() => { 
        setIsLoading(true);  
        axios.get(`${server}/coupon-code/get-coupon/${seller._id}`, { withCredentials: true })
            .then((res) => {
                setIsLoading(false);
                console.log(res.data.couponCodes, "couponCodes")
                setCoupon(res.data.couponCodes);
            }).catch((error) => {
                setIsLoading(false);
                toast.error(error.response.data.message);
            }
            )
        if (seller?._id) {
            dispatch(getAllProductsShop(seller._id));
        }
    }, [dispatch]);


    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
        window.location.reload();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${server}/coupon-code/create-Coupon-code`, {
            name,
            value,
            minAmount,
            maxAmount,
            selectedProducts: selectedProduct,
            shop: seller,

        }, { withCredentials: true }
        ).then((res) => {
            toast.success(res.data.message);
            console.log(res.data.message);
            setOpen(false);
            window.location.reload(); 
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
        window.location.reload();
    }



    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },
        { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
        { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
        { field: "actions", headerName: "Actions", minWidth: 150, flex: 0.6, },
        {
            field: "Delete", headerName: "", minWidth: 100, flex: 0.8, type: "number", sortable: false, renderCell: (params) => {
                const d = params.row.name;
                const product_name = d.replace(/\s+/g, '-');
                return (
                    <Link to={`/product/${product_name}`}>
                        <Button
                            onClick={() => handleDelete(params.id)}
                        >
                            <AiOutlineDelete size={20} />
                        </Button>
                    </Link>
                );
            },
        },
    ];

    const row = [];
    coupon && coupon.forEach((item) => {
        row.push({
            id: item._id,
            name: item.name,
            price: item.value + "$",
            sold: 10,
        });
    });



    console.log(products)
    return (
        <div  >
            {
                isLoading ? <Loader /> : [
                    <div className='mx-8 pt-1 mt-10 bg-white h-[85vh] '>
                        <div className="w-full flex justify-end">
                            <div className={`${styles.button} !w-[200px] px-3 !rounded-[5px] mr-3 mb-3 `}
                                onClick={(e) => setOpen(true)}>
                                <span className='text-white '>Create Coupon Code</span>
                            </div>
                        </div>
                        <div>
                            <DataGrid
                                rows={row}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                autoHeight={false} />
                            {
                                open &&
                                <div className="fixed top-0 left-0 w-full h-full bg-black z-[2000] flex items-center justify-center">
                                    <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-5 relative">
                                        <div className="w-full flex justify-end">
                                            <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpen(false)} />
                                        </div>
                                        <h5
                                            className="text-[30px] font-Poppins text-center">
                                            Create Coupon Code
                                        </h5>
                                        {/* create coupon code */}
                                        <form action="" method="get" aria-required={true} onSubmit={handleSubmit}>
                                            <div className="">
                                                <label className='pb-2'>
                                                    Name <span className='text-red-500'>*</span>
                                                </label>
                                                <input type="text"
                                                    className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 '
                                                    value={name}
                                                    required
                                                    placeholder='Enter your Coupon Code Name...'
                                                    onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <br />
                                            <div className="">
                                                <label className='pb-2'>
                                                    Discount Percentage <span className='text-red-500'>*</span>
                                                </label>
                                                <input type="number"
                                                    className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 '
                                                    value={value}
                                                    required
                                                    placeholder='Enter your Coupon Code Value...'
                                                    onChange={(e) => setValue(e.target.value)} />
                                            </div>
                                            <br />
                                            <div className="">
                                                <label className='pb-2'>
                                                    Min Amount Percentage <span className='text-red-500'>*</span>
                                                </label>
                                                <input type="number"
                                                    className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 '
                                                    value={minAmount}
                                                    placeholder='Enter your Coupon Code Min Amount...'
                                                    onChange={(e) => setMinAmount(e.target.value)} />
                                            </div>
                                            <br />
                                            <div className="">
                                                <label className='pb-2'>
                                                    Max Amount Percentage <span className='text-red-500'>*</span>
                                                </label>
                                                <input type="number"
                                                    className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 '
                                                    value={maxAmount}
                                                    placeholder='Enter your Coupon Code Max Amount...'
                                                    onChange={(e) => setMaxAmount(e.target.value)} />
                                            </div>
                                            <br />
                                            <div className="">
                                                <label className='pb-2'>
                                                    Selected Product <span className='text-red-500'>*</span>
                                                </label>
                                                <select name="" id=""
                                                    className=' w-full mt-2 border h-[35px] rounded-[5px]'
                                                    value={selectedProduct}
                                                    onChange={(e) => setSelectedProduct(e.target.value)} >
                                                    <option value="">Choose a selected Product</option>
                                                    {
                                                        products && products.map((i) => (
                                                            <option value={i.name}
                                                                key={i.name} >{i.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <br />
                                            <div className="">
                                                <input type="submit"
                                                    className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 '
                                                    value="Create"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                ]
            }
        </div>
    )
}


export default AllCoupons
