import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

function EditForm({ itemId, onSave }) {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [nameError, setNameError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [contactError, setContactError] = useState("");

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    country: yup.string().required("Country is required"),
    contact: yup
      .mixed()
      .test(
        "isNumeric",
        "Contact must be a number",
        (value) => !value || (typeof value === "number" && !isNaN(value))
      )
      .required("Contact is required"),
  });

  useEffect(() => {
    axios
      .get(`https://6530cc406c756603295f0e02.mockapi.io/accounts/${itemId}`)
      .then((response) => {
        setFormData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching edit data:", error);
      });
  }, [itemId]);

  const handleSave = () => {
    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        axios
          .put(
            `https://6530cc406c756603295f0e02.mockapi.io/accounts/${itemId}`,
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
        setNameError(newErrors.name || "");
        setCountryError(newErrors.country || "");
        setContactError(newErrors.contact || "");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    clearErrors(name);
  };

  const clearErrors = (name) => {
    switch (name) {
      case "name":
        setNameError("");
        break;
      case "country":
        setCountryError("");
        break;
      case "contact":
        setContactError("");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {isLoading ? (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
          }}
        >
          Loading...
        </p>
      ) : (
        <div>
          <form>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <span className="error">{nameError}</span>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
            <span className="error">{countryError}</span>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />
            <span className="error">{contactError}</span>
            <button className="btn" type="button" onClick={handleSave}>
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditForm;
