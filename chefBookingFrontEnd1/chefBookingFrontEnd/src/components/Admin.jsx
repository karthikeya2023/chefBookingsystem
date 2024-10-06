import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [chefs, setChefs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/chefs/");
        setChefs(response.data);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    };

    fetchChefs();
  }, []);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/recipe/");
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleApprove = async (row) => {
    try {
      // Extract chefId from the row object
      const chefID = row._id; // Assuming the chef ID is stored in a property named 'id' in your 'row' object

      // Make PUT request to approve chef
      await axios.post(`http://localhost:3000/api/chefs/approve/${chefID}`, {
        // approved: true,
      });

      // Log approval
      console.log("Approving chef:", row.name);

      // Fetch updated chefs list after approval
      const updatedChefsResponse = await axios.get(
        "http://localhost:3000/api/chefs/"
      );
      setChefs(updatedChefsResponse.data);
    } catch (error) {
      console.error("Error approving chef:", error);
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
  const handleRowClick2 = (row) => {
    navigate(`/view/recipe/${row._id}`); // Redirect to chef view page with chef ID
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Abilities",
      selector: (row) => <div>{row.abilities.join(", ")}</div>,
      sortable: true,
    },
    {
      name: "License Document",
      selector: (row) => <a href={row.documentUrl} target="_blank" rel="noopener noreferrer">
      {row.documentUrl}
       </a>,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2 justify-content-center align-items-center">
          {row.approved ? (
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
          {/* 
          <FaTrash
            size={23}
            className="text-center mt-3 text-danger m"
            onClick={() => handleDelete(row)}
          />
          <FaEdit
            size={23}
            onClick={() => handleEdit(row)}
            className="text-center mt-3 text-primary"
          /> */}
        </div>
      ),
    },
  ];
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
  return (
    <div className="container py-5">
      <DataTable
        title="Chef Information"
        columns={columns}
        data={chefs}
        onRowClicked={handleRowClick} // Add onRowClicked event handler
      />
      <DataTable
        title="Recipes"
        columns={recipeColumns}
        data={recipes}
        onRowClicked={handleRowClick2} // Add onRowClicked event handler
      />
    </div>
  );
};

export default Admin;
