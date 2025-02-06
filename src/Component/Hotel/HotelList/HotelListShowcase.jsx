import React, { useEffect, useState } from 'react';
import { Card, Button, Pagination, Col, Row, Breadcrumb } from 'react-bootstrap';
import Loader from '../../../Shade/Loaders/Loaders';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Services/Interceptor';
import HotelCreateUpdateForm from '../HotelCreateUpdate/HotelCreateUpdateForm';
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const HotelListShowcase = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [dynamicUrl, setDynamicUrl] = useState(`${BASE_URL}/get-hotels`)
  const [hotelList, setHotelList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [updateHotelItem, setUpdateHotelItem] = useState({})

  const getAllProducts = (dynamicUrl) => {
    axiosInstance.get(dynamicUrl)
      .then((res) => {
        if (res?.data) {
          console.log(res?.data)
          setHotelList(res?.data)
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setHotelList([]);
        setIsLoading(true);
        console.log(err, 'err');
      });
  };

  useEffect(() => {
    getAllProducts(dynamicUrl);
  }, [dynamicUrl]);

  // Handle page change
  const handlePageChange = (apiUrl) => {
    if (apiUrl) { // Check if pageNumber is not null or undefined
      setIsLoading(true);
      getAllProducts(apiUrl);
      setDynamicUrl(apiUrl)
    }
  };

  // Truncate Text
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    } else {
      return text;
    }
  };

  // View hotel details
  const viewDetails = (prodId) => {
    const encodedId = btoa(prodId);
    navigate(`/hotel-details/${encodedId}`);
  };

  // update hotel item
  const handleUpdate = (item) => {
    console.log(item)
    setUpdateHotelItem({
      id: item?.id,
      property_name: item?.property_name,
      address: item?.address,
      cost_per_night: item?.cost_per_night,
      available_rooms: item?.available_rooms,
      property_image: item?.property_image,
      average_rating: item?.average_rating,
    })
    setShowModal(true);
  }

  // delete hotel item
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure you want to delete this hotel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`${BASE_URL}/delete-hotel/${item?.id}`)
          .then((res) => {
            toast.success(`${res?.data?.message}`, {
              position: "top-right",
              hideProgressBar: false,
              autoClose: 2500,
              theme: "colored",
            });
          })
          .catch((err) => {
            toast.error(`${err?.response?.data?.error}`, {
              position: "top-right",
              hideProgressBar: false,
              autoClose: 2500,
              theme: "colored",

            });
          });
      }
    });
  };


  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className='mt-5'>
        {/* Breadcrumbs */}
        <div className='d-flex justify-content-between align-items-center mt-5'>
          <Breadcrumb className='mt-2'>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Hotel List</Breadcrumb.Item>
          </Breadcrumb>
          <Button
            variant="primary"
            className='btn btn-sm mt-2'
            onClick={() => setShowModal(true)}
          >
            Add New
          </Button>
        </div>

        {/* hotel list */}
        <Row>
          {hotelList?.hotels?.map((hotel, index) => (
            <Col lg={3} md={4} sm={6} className="mb-3" key={hotel?.id}>
              {/* Hotel Card */}
              <Card className="text-center shadow-lg p-3 bg-white rounded hotel-card h-100 animate-show"
                style={{ transitionDelay: `${index * 0.1}s` }}>
                {/* Hotel Image */}
                <Card.Img
                  variant="top"
                  src={hotel?.property_image}
                  alt={hotel?.property_name}
                  className="hotel-image"
                />
                <Card.Body className="d-flex flex-column">
                  {/* Hotel Name */}
                  <Card.Title className="mt-2 fw-bold text-primary">
                    <i className="fa-solid fa-hotel me-2"></i>
                    {truncateText(hotel?.property_name, 30)}
                  </Card.Title>

                  {/* Address */}
                  <div className="d-flex justify-content-center align-items-center mb-2">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    <span>{truncateText(hotel?.address, 25)}</span>
                  </div>

                  {/* Cost per Night & Available Rooms */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-bold text-success">${hotel?.cost_per_night} / night</span>
                    <span className="text-muted">{hotel?.available_rooms} rooms left</span>
                  </div>

                  {/* Rating */}
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <i className="fa-solid fa-star text-warning me-1"></i>
                    <span className="fw-bold">{hotel?.average_rating}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto d-flex justify-content-center align-items-center">
                    <Button
                      variant="none"
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => viewDetails(hotel.id)}
                    >
                      <i className="fa-regular fa-eye me-1"></i>
                      View
                    </Button>
                    <Button
                      variant="none"
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => handleUpdate(hotel)}
                    >
                      <i className="fa-solid fa-pen me-1"></i>
                      Update
                    </Button>
                    <Button
                      variant="none"
                      className="btn btn-sm btn-outline-danger me-2"
                      onClick={() => handleDelete(hotel)}
                    >
                      <i className="fa-solid fa-trash me-1"></i>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>

            </Col>
          ))}
        </Row>


        {/* Pagination */}
        <Pagination className="justify-content-end">
          <Pagination.Prev
            onClick={() => handlePageChange(hotelList?.prev_page_url)}
            disabled={!hotelList?.prev_page_url} // Disable if previous is null
            className='cursor-pointer'
          />
          <Pagination.Next
            onClick={() => handlePageChange(hotelList?.next_page_url)}
            disabled={!hotelList?.next_page_url} // Disable if next is null
            className='cursor-pointer'
          />
        </Pagination>

        {
          showModal &&
          <HotelCreateUpdateForm
            showModal={showModal}
            setShowModal={setShowModal}
            modalTitle={updateHotelItem?.id ? "Update Hotel Item" : "Add New Hotel Item"}
            updateHotelStatus={updateHotelItem?.id ? true : false}
            updateHotelItem={updateHotelItem}
            setUpdateHotelItem={setUpdateHotelItem}
          />
        }
      </div>
    );
  }
};

export default HotelListShowcase;
