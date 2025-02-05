import React, { useEffect, useState } from 'react';
import { Card, Button, Pagination, Col, Row, Breadcrumb, Dropdown, DropdownButton, FormControl, Badge } from 'react-bootstrap';
import axios from 'axios';
import './Product.css';
import Loader from '../../Shade/Loaders/Loaders';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axiosInstance from '../../Services/Interceptor';

const Products = ({ effect, setEffect }) => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [allProduct, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getAllProducts = () => {
    axiosInstance.get(`${BASE_URL}/get-hotels`)
      .then((res) => {
        if (res?.data) {
          console.log(res?.data)
          setAllProducts(res?.data)
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setAllProducts([]);
        setIsLoading(true);
        console.log(err, 'err');
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber) { // Check if pageNumber is not null or undefined
      setIsLoading(true);
      getAllProducts(pageNumber);
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



        {/* Products */}
        <Row>
          {
            allProduct?.map((prodItem, index) => (
              <Col lg={3} md={4} sm={6} className="mb-3" key={prodItem?.id}>
                {/* Product Card */}
                <Card className={`text-center shadow-lg p-3 bg-white rounded product-card h-100 animate-show`}
                  style={{ transitionDelay: `${index * 0.1}s` }}>
                  <Card.Img
                    variant="top"
                    src={prodItem?.property_image}
                    alt={prodItem?.property_name}
                    className="product-images"
                  />
                  <Card.Body className="d-flex flex-column">
                    {/* Title */}
                    <Card.Title className="mt-2 fw-bold text-primary">
                      <i className="fa-solid fa-book-open me-2"></i>
                      {truncateText(prodItem?.property_name, 30)}
                    </Card.Title>

                    {/* Author */}
                    <div className="d-flex justify-content-center align-items-center mb-2">
                      <i className="fa-solid fa-user-pen me-2"></i>
                      <span>{truncateText(prodItem?.address, 20)}</span>
                    </div>

                    {/* Subjects */}
                    <div className="product-subjects mb-3">
                      {prodItem?.subjects?.slice(0, 2).map((subject, idx) => (
                        <Badge bg="secondary" key={idx} className="me-1">
                          {truncateText(subject, 20)}
                        </Badge>
                      ))}
                    </div>

                    {/* Download Count */}
                    <div className="mb-3">
                      <i className="fa-solid fa-download me-1"></i>
                      <span>{prodItem?.cost_per_night} Downloads</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto">
                      <div className="d-flex justify-content-center gap-2">
                        <Button variant="outline-info" onClick={() => viewDetails(prodItem.id)}>
                          <i className="fa-regular fa-eye"></i>
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }

        </Row>

        {/* Pagination */}
        <Pagination className="justify-content-end">
          <Pagination.Prev
            onClick={() => handlePageChange(allProduct?.previous)}
            disabled={!allProduct?.previous} // Disable if previous is null
            className='cursor-pointer'
          />
          <Pagination.Next
            onClick={() => handlePageChange(allProduct?.next)}
            disabled={!allProduct?.next} // Disable if next is null
            className='cursor-pointer'
          />
        </Pagination>
      </div>
    );
  }
};

export default Products;
