import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChefTable = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchRecipes();
    fetchBookings();
  }, []);
  const storedChefId = JSON.parse(localStorage.getItem("user"));
  const chefId = storedChefId._id;
  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/recipe/recipes/chef/${chefId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchBookings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/booking/chef/${storedChefId.chefID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (row) => {
    try {
      // Make DELETE request to delete recipe
      await axios.delete(`http://localhost:3000/api/recipe/${row._id}`);

      // Log deletion
      console.log("Deleting recipe:", row.recipeTitle);

      // Fetch updated recipes list after deletion
      const updatedRecipesResponse = await fetch(
        "http://localhost:3000/api/recipe/"
      );
      if (!updatedRecipesResponse.ok) {
        throw new Error("Failed to fetch updated recipes after deletion");
      }
      const updatedRecipesData = await updatedRecipesResponse.json();
      setRecipes(updatedRecipesData);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleEdit = (row) => {
    navigate(`/edit/recipe/${row._id}`);
  };
  const handleRowClick = (row) => {
    navigate(`/view/chef/${row._id}`); // Redirect to chef view page with chef ID
  };
  const handleApprove = async (row) => {
    try {
      // Extract chefId from the row object
      const chefID = row._id; // Assuming the chef ID is stored in a property named 'id' in your 'row' object

      // Make PUT request to approve chef
      await axios.post(`http://localhost:3000/api/booking/approve/${chefID}`, {
        // approved: true,
      });

      // Log approval

      fetchBookings();
      // Fetch updated chefs list after approval
    } catch (error) {
      console.error("Error approving chef:", error);
    }
  };

  const handleRowClick2 = (row) => {
    navigate(`/view/recipe/${row._id}`); // Redirect to chef view page with chef ID
  };

  const recipeColumns = [
    {
      name: "Recipe Name",
      selector: (row) => row.recipeTitle,
      sortable: true,
    },
    {
      name: "Descprtion",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Time Taken",
      selector: (row) => row.timeTaken,
      sortable: true,
    },
    {
      name: "Servings",
      selector: (row) => row.servings,
      sortable: true,
    },
    {
      name: "Youtube URL",
      selector: (row) => (
        <a href={row.youtube_url} target="_blank" rel="noopener noreferrer">
          {row.youtube_url}
        </a>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2 justify-content-center align-items-center">
          <FaTrash
            size={23}
            className="text-center mt-3 text-danger m"
            onClick={() => handleDelete(row)}
          />

          <FaEdit
            size={23}
            onClick={() => handleEdit(row)}
            className="text-center mt-3 text-primary"
          />
        </div>
      ),
    },
  ];
  const bookingColumns = [
    {
      name: "Event Date",
      selector: (row) => (
        <div> {new Date(row.eventDate).toISOString().substr(0, 10)}</div>
      ),
      sortable: true,
    },

    {
      name: "Event Type",
      selector: (row) => row.eventType,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2 justify-content-center align-items-center">
          {row.status === "approved" ? (
            <span className="badge bg-success">Approved</span>
          ) : (
            <>
              <button
                className="btn btn-success"
                onClick={() => handleApprove(row)}
              >
                Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleApprove(row)}
              >
                Reject
              </button>
            </>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="container py-5">
      <DataTable
        title="Recipes"
        columns={recipeColumns}
        data={recipes}
        onRowClicked={handleRowClick2} // Add onRowClicked event handler
      />
      <DataTable
        title="Bookings"
        columns={bookingColumns}
        data={bookings}
        onRowClicked={handleRowClick}
      />
    </div>
  );
};

export default ChefTable;
