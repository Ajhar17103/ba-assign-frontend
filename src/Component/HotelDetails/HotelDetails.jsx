import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Services/Interceptor';
import { useParams } from 'react-router-dom';
import Loader from '../../Shade/Loaders/Loaders';
import { FaMapMarkerAlt, FaStar, FaHeart, FaBed,FaFacebook,FaWhatsapp} from 'react-icons/fa';
import { Container, Row, Col, Card, Button} from 'react-bootstrap';

const HotelDetails = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const { id } = useParams(); // This will be the encoded ID
  const decodedId = atob(id); // Decode from Base64
  const [hotelDetailsData, setHotelDetailsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  

  useEffect(() => {
    axiosInstance.get(`${BASE_URL}/get-hotels-details/${decodedId}`)
      .then((res) => {
        if (res?.data) {
          setHotelDetailsData(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setHotelDetailsData([]);
        setIsLoading(true);
        console.log(err, 'err');
      });
  }, []);

  const bookHotel = () => {
    console.log(`Added ${quantity} of "${hotelDetailsData.title}" to cart.`);
  };

  // Add to wishlist function
  const addWishlist = (prodItem) => {
    console.log(`Added ${quantity} of "${hotelDetailsData.title}" to cart.`);
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
<Container className="mt-5">
  <Row className="align-items-center p-5 bg-white rounded shadow-lg">
    {/* Hotel Image */}
    <Col md={6}>
      <Card className="shadow border-0 rounded overflow-hidden">
        <Card.Img
          variant="top"
          src={hotelDetailsData.property_image}
          className="hotelDetailsData-image"
        />
      </Card>
    </Col>

    {/* Hotel Details */}
    <Col md={6}>
      <div className="p-4 bg-white rounded shadow-lg">
        <h2 className="text-success fw-bold">{hotelDetailsData?.property_name}</h2>
        <p className="text-muted d-flex align-items-center">
          <FaMapMarkerAlt className="me-2 text-primary" /> {hotelDetailsData?.address}
        </p>

        <h3 className="fw-bold text-success">
          ${hotelDetailsData?.cost_per_night} <small className="text-muted">/ night</small>
        </h3>
        <p className="mt-2">
          <FaBed className="me-2" /> Available Rooms: <strong>{hotelDetailsData?.available_rooms}</strong>
        </p>

        {/* Rating */}
        <div className="d-flex align-items-center mb-3">
          <FaStar className="text-warning me-1" />
          <span className="fw-bold">{hotelDetailsData?.average_rating}</span>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-3">
          <Button
            variant="success"
            className="fw-bold px-4"
            onClick={() => bookHotel(hotelDetailsData)}
          >
            <FaBed className="me-2" /> Book Now
          </Button>
          <Button
            variant="outline-danger"
            className="fw-bold px-4"
            onClick={() => addWishlist(hotelDetailsData)}
          >
            <FaHeart className="me-2" /> Add to Wishlist
          </Button>
        </div>

        {/* Social Share Buttons */}
        <div className="d-flex gap-3 mt-3">
          {/* Facebook Share */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-danger"
          >
            <FaFacebook className="me-2" /> Share on Facebook
          </a>

          {/* WhatsApp Share */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(hotelDetailsData?.property_name + ' ' + window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-info"
          >
            <FaWhatsapp className="me-2" /> Share on WhatsApp
          </a>
        </div>
      </div>
    </Col>
  </Row>
</Container>


    );
  }
};

export default HotelDetails;