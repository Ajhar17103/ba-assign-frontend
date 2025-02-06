import React, { useEffect, useState } from 'react';
import { Card, Button, Pagination, Col, Row, Breadcrumb} from 'react-bootstrap';
// import './Product.css';
import Loader from '../../Shade/Loaders/Loaders';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Services/Interceptor';

const HotelListShowcase = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [dynamicUrl,setDynamicUrl]=useState(`${BASE_URL}/get-hotels`)
  const [hotelList, setHotelList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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



  // View product details
  const viewDetails = (prodId) => {
    const encodedId = btoa(prodId);
    navigate(`/product-details/${encodedId}`);
  };




  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div>
        {/* Breadcrumbs */}
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Shop</Breadcrumb.Item>
        </Breadcrumb>



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

          {/* Action Button */}
          <div className="mt-auto">
            <Button variant="primary" onClick={() => viewDetails(hotel.id)}>
              <i className="fa-regular fa-eye me-1"></i> View Details
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
      </div>
    );
  }
};

export default HotelListShowcase;
