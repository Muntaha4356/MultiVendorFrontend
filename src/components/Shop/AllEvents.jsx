import { minWidth } from '@mui/system';
import React, { useEffect } from 'react'
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteevent, getAlleventsShop } from '../../redux/actions/event';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Loader from '../Layout/Loader';
const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  useEffect(() => {
    if (seller?._id) {
      dispatch(getAlleventsShop(seller._id));
    }
  }, [dispatch, seller]);


  const handleDelete = (id) => {   
    dispatch(deleteevent(id));
    window.location.reload();
  }


  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "stock", headerName: "Stock", minWidth: 80, flex: 0.5 },
    { field: "sold", headerName: "Sold Out", minWidth: 130, flex: 0.6, },
    { field: "actions", headerName: "Actions", minWidth: 150, flex: 0.6, },
    {
      field: "Preview", headerName: "", minWidth: 100, flex: 0.8, type: "number", sortable: false, renderCell: (params) => {
        const d = params.row.name;
        const event_name = d.replace(/\s+/g, '-');
        return (
          <Link to={`/event/${event_name}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Delete", headerName: "", minWidth: 100, flex: 0.8, type: "number", sortable: false, renderCell: (params) => {
        const d = params.row.name;
        const event_name = d.replace(/\s+/g, '-');
        return (
          <Link to={`/event/${event_name}`}>
            <Button
            onClick={() => handleDelete(params.id)}
            >
              <AiOutlineDelete size={20}  />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];
  events && events.forEach((item) => {
    row.push({
      id: item._id,
      name: item.name,
      price: `US$ ${item.discountPrice}`,
      stock: item.stock,
      sold: 10,
    });
  });


  
  console.log(events)
  return (
    <div  >
      {
        isLoading ? <Loader /> : [
          <div className='mx-8 pt-1 mt-10 bg-white h-[85vh]'>
            <div> 
              <DataGrid 
              rows={row} 
              columns={columns} 
              pageSize={10} 
              disableSelectionOnClick 
              autoHeight={false}/> 
            </div>
          </div>
        ]
      }
    </div>
  )
}

export default AllEvents
