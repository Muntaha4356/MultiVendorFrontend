import React, { useState } from "react";
import { backend_url } from "../../../server";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { MdTrackChanges } from 'react-icons/md'
import styles from "../../../styles/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const ProfileContent = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNum, setPhoneNum] = useState();
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  if (!user) {
    return <div className="w-full text-center p-4">Loading profile...</div>;
  }
  return (
    <div className="w-full">
      {/* Profile page  */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full ">
            <div className="relative">
              <img
                src={`${backend_url}${
                  user.avatar?.public_id ||
                  "https://res.cloudinary.com/dflbje6qn/image/upload/v1757592455/Default_Placeholder_Profile_Icon_Stock_Vector_-_Illustration_of_character_people__90197997_ikuxad.jpg"
                }`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132] "
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute button-[5px] right-[5px] bottom-[5px] ">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form action="" onSubmit={handleSubmit} aria-required={true}>
              {" "}
              {/* //Informs screen readers that this field must be filled in. */}
              <div className="w-full flex flex-col lg:flex-row pb-5">
                <div className="w-[100%] 800px:w-[50%] ">
                  <label className="block pt-3">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pt-3">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col lg:flex-row pb-5">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pt-3">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pt-3">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col lg:flex-row pb-5">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pt-3">Address 1</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pt-3">Address 2</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <input
                type="submit"
                className="w-[258px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-0 cursor-pointer "
                required
                value="Update"
              />
            </form>
          </div>
        </>
      )}

      {/* Order Page */}
      {active === 2 && (
        <div className="">
          <AllOrders />
        </div>
      )}

      {/* Refund Page */}

      {active === 3 && (
        <div className="">
          <AllRefundOrders />
        </div>
      )}


      {/* trackorders Page */}

      {active === 5 && (
        <div className="">
          <TrackOrders />
        </div>
      )}

      {/* payment page */}

      {active === 6 && (
        <div className="">
          <PaymentMethods />
        </div>
      )}

      {/* Address pages */}

      {active === 7 && (
        <div className="">
          <Address />
        </div>
      )}



    </div>
  );
};

export default ProfileContent;

const AllOrders = () => {
  const orders = [
    {
      _id: "6566654ggfrrt666",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];
  // Define columns
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "actions",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  // Build rows dynamically from orders
  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "5rrtd54367hbggS4e36",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "actions",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  // Build rows dynamically from orders
  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrders = () => {
  const orders = [
    {
      _id: "5rrtd54367hbggS4e36",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.value === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];


  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return(
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  )
}


const PaymentMethods = () => {
  return(
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2 ">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>

        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10  ">
        <div className="flex items-center">
          <img src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" alt="" />
          <h5 className="pl-5 font-[600]">Muntaha Card</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h4>1234 **** *** ****</h4>
          <h5 className="pl-6">08/2027</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8 ">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

const Address = () => {
  return(
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2 ">
          My Address
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>

        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10  ">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600]">Default Address</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 Street 2006</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>(+92) 1234567</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8 ">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}
