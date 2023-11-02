import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./components/DataTable";
import EditForm from "./components/EditForm";
import Navbar from "./components/Navbar";
import "./App.css";
import AddForm from "./components/AddForm";

function MyComponent() {
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // Initialize showAddForm to false

  function getData() {
    axios
      .get("https://6530cc406c756603295f0e02.mockapi.io/accounts")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (itemId) => {
    setEditItemId(itemId);
    setShowAddForm(false); // Hide the AddForm when editing
  };

  const handleDelete = (itemId) => {
    axios
      .delete(`https://6530cc406c756603295f0e02.mockapi.io/accounts/${itemId}`)
      .then(() => {
        getData(); // Refresh data after delete
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
      });
  };

  return (
    <>
      <Navbar onAdd={() => setShowAddForm(true)} />
      {showAddForm ? (
        <AddForm
          onSave={() => {
            setShowAddForm(false);
            getData();
          }}
        />
      ) : (
        editItemId && (
          <EditForm
            itemId={editItemId}
            onSave={() => {
              setEditItemId(null);
              getData();
            }}
          />
        )
      )}
      <DataTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}

export default MyComponent;
