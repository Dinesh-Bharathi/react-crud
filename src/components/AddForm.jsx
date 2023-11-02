import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";

function AddForm({ onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    country: yup.string().required("Country is required"),
    contact: yup
      .number("Contact must be a number")
      .required("Contact is required"),
  });

  const handleSave = () => {
    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        axios
          .post(
            "https://6530cc406c756603295f0e02.mockapi.io/accounts",
            formData
          )
          .then(() => {
            onSave();
          })
          .catch((error) => {
            console.error("Error updating data: ", error);
          });
      })
      .catch((validationErrors) => {
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <span className="error">{errors.name}</span>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleInputChange}
        />
        <span className="error">{errors.country}</span>
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleInputChange}
        />
        <span className="error">{errors.contact}</span>
        <button className="btn" type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}

export default AddForm;
