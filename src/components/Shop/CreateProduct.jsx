import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../../static/data';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from '../../redux/actions/product.js';
import { toast } from 'react-toastify';

const CreateProduct = () => {
    const { seller } = useSelector((state) => state.seller);
    const { isLoading, error, success } = useSelector((state) => state.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [originalPrice, setOriginalPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [stock, setStock] = useState(0);


    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success("Product Created Successfully!");
            navigate("/dashboard");
            window.location.reload(); // Reload the page to fetch the updated product list after creating a new product. This ensures that the dashboard reflects the newly created product without needing to manually refresh.
        }
    }, [error, success])

    const handleSubmit = (e) => {
        e.preventDefault();
        const newForm = new FormData();
        images.forEach((image) => {
            newForm.append("images", image);
        });
        newForm.append("name", name);
        newForm.append("description", description);
        newForm.append("category", category);
        newForm.append("tags", tags);
        newForm.append("originalPrice", originalPrice);
        newForm.append("discountPrice", discountPrice);
        newForm.append("stock", stock);
        newForm.append("shopId", seller._id);

        dispatch(createProduct(newForm)); //idhar xe hm action ko bhej rae jo furthur reduce deal ke ga hoga aur backend ko request bhejega

    }

    const handleImageChange = (e) => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);

    }
    return (
        <div className='w-[90%] md:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll '>
            Create Product
            <h5 className='text-[30px] font-Poppins text-center ' >Create Product</h5>

            {/* Create Product Form */}
            <form onSubmit={handleSubmit} action="">
                <br />
                <div className="">
                    <label className='pb-2'>
                        Name <span className='text-red-500'>*</span>
                    </label>
                    <input type="text"
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 '
                        value={name}
                        placeholder='Enter your Product Name...'
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <br />
                <div className="">
                    <label className='pb-2'>
                        Description <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                        cols="30"
                        rows="8"
                        required
                        className="mt-2 appearance-none block w-full px-3 pt-2 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500"
                        value={description}
                        placeholder="Enter your Product Description..."
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                </div>
                <br />
                <div className="">
                    <label className='pb-2'>
                        Category <span className='text-red-500'>*</span>
                    </label>
                    <select name="" id=""
                        className=' w-full mt-2 border h-[35px] rounded-[5px]'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} >
                        <option value="Choose a Category">Choose a Category</option>
                        {
                            categoriesData && categoriesData.map((i) => (
                                <option value={i.title}
                                    key={i.title} >{i.title}</option>
                            ))
                        }
                    </select>
                </div>
                <br />
                <div className="">
                    <label className='pb-2'>
                        Tags
                    </label>
                    <input type="text"
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 '
                        value={tags}
                        name='tags'
                        placeholder='Enter your Product Tags...'
                        onChange={(e) => setTags(e.target.value)} />
                </div>
                <br />
                <div className="">
                    <label className='pb-2'>
                        Original Price
                    </label>
                    <input type="number"
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 '
                        value={originalPrice}
                        name='price'
                        placeholder='Enter your Product Original Price...'
                        onChange={(e) => setOriginalPrice(e.target.value)} />
                </div>
                <br />
                <div className="">
                    <label className='pb-2'>
                        Discount Price <span className='text-red-500'>*</span>
                    </label>
                    <input type="number"
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 '
                        value={discountPrice}
                        placeholder='Enter your Product Discount Price...'
                        onChange={(e) => setDiscountPrice(e.target.value)} />
                </div>
                <br />
                <div className="">
                    <label className='pb-2'>
                        Product Stock <span className='text-red-500'>*</span>
                    </label>
                    <input type="number"
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 '
                        value={stock}
                        placeholder='Enter your Product Stock...'
                        onChange={(e) => setStock(e.target.value)} />
                </div>
                <br />
                <div className=" w-full flex items-center flex-wrap ">
                    <label className='pb-2'>
                        Upload Images <span className='text-red-500'>*</span>
                    </label>
                    <input type="file"
                        id='upload'
                        multiple
                        onChange={handleImageChange} />
                    <div className="">
                        <label htmlFor="upload">
                            <AiOutlinePlusCircle className='text-[30px] cursor-pointer' />
                        </label>
                        {
                            images && images.map((i, index) => (
                                <div key={index} className="mt-2">
                                    <img
                                        src={URL.createObjectURL(i)}
                                        alt="Product"
                                        className="w-[120px] h-[120px] object-cover" />
                                </div>
                            ))
                        }
                    </div>
                    <br />
                    <input
                        type="submit"
                        value="Create"
                        className="mt-2 w-full px-3 h-[35px] border border-gray-300 rounded-[3px] cursor-pointer bg-blue-500 text-white"
                    />

                </div>
            </form>
        </div>
    )
}

export default CreateProduct
