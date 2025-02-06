import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import axiosInstance from "../../../Services/Interceptor";
import { toast } from "react-toastify";
import "./Form.css"

const HotelCreateUpdateForm = (props) => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const { showModal, setShowModal, modalTitle, updateHotelItem, updateHotelStatus, setUpdateHotelItem } = props
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Set form values when the modal is open and updateHotelItem is provided
  useEffect(() => {
    if (updateHotelItem.id && updateHotelStatus) {
      setValue("property_name", updateHotelItem.property_name || "");
      setValue("address", updateHotelItem.address || "");
      setValue("cost_per_night", updateHotelItem.cost_per_night || "");
      setValue("available_rooms", updateHotelItem.available_rooms || "");
      setValue("property_image", updateHotelItem.property_image || "");
      setValue("average_rating", updateHotelItem.average_rating || "");
    }
  }, [updateHotelItem, setValue]);

  const onSubmit = (data) => {
    const postData = {
      property_name: data.property_name,
      address: data.address,
      cost_per_night: parseFloat(data.cost_per_night),
      available_rooms: parseInt(data.available_rooms, 10),
      property_image: data.property_image[0] || null,
      average_rating: parseFloat(data.average_rating),
    };
    axiosInstance.post(`${BASE_URL}/create-hotels`, postData)
      .then((res) => {
        toast.success(`Created Successful`, {
          position: "top-right",
          hideProgressBar: false,
          autoClose: 2500,
          theme: "colored",
        });
        setShowModal(false);
      })
      .catch((err) => {
        toast.error(`${err?.response?.data?.message}`, {
          position: "top-right",
          hideProgressBar: false,
          autoClose: 2500,
          theme: "colored",

        });
      });
  };

  const modalClose = () => {
    setUpdateHotelItem({})
    setShowModal(false)
  }
  return (
    <div>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
          <Button
            variant="none"
            className="btn btn-sm btn-danger"
            onClick={modalClose}
          >
            <AiOutlineClose size={12} />
          </Button>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Property Name</Form.Label>
              <Form.Control
                type="text"
                {...register("property_name", { required: "Property name is required" })}
              />
              {errors.property_name && <Alert variant="danger">{errors.property_name.message}</Alert>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && <Alert variant="danger">{errors.address.message}</Alert>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cost per Night</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                {...register("cost_per_night", {
                  required: "Cost is required",
                  min: { value: 0, message: "Cost must be positive" },
                })}
              />
              {errors.cost_per_night && <Alert variant="danger">{errors.cost_per_night.message}</Alert>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Available Rooms</Form.Label>
              <Form.Control
                type="number"
                {...register("available_rooms", {
                  required: "Available rooms are required",
                  min: { value: 0, message: "Must be at least 0" },
                })}
              />
              {errors.available_rooms && <Alert variant="danger">{errors.available_rooms.message}</Alert>}
            </Form.Group>

            {updateHotelItem?.property_image ? (
              <Form.Group className="mb-3 position-relative">
                <button
                  type="button"
                  className="cross-btn"
                  onClick={() => {/* Handle cross button click */ }}
                >
                  &times;
                </button>
                <img
                  variant="top"
                  src={updateHotelItem?.property_image}
                  alt={updateHotelItem?.property_name}
                  className="hotel-image"
                  style={{ width: '80px', height: '80px' }}
                />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Property Image</Form.Label>
                <Form.Control
                  type="file"
                  {...register("property_image", { required: "Property image is required" })}
                  accept="image/jpeg, image/png, image/jpg, image/gif"
                />
                {errors.property_image && <Alert variant="danger">{errors.property_image.message}</Alert>}
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Average Rating</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                {...register("average_rating", {
                  required: "Average rating is required",
                  min: { value: 0, message: "Min rating is 0" },
                  max: { value: 5, message: "Max rating is 5" },
                })}
              />
              {errors.average_rating && <Alert variant="danger">{errors.average_rating.message}</Alert>}
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
          </Form>


        </Modal.Body>
      </Modal>
    </div >
  );
};

export default HotelCreateUpdateForm;
