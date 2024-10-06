import React, { useEffect, useState } from "react";

const ChefDashboard = () => {
  const [chefId, setChefId] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [formData, setFormData] = useState({
    pricing: {
      chef_at_home: 0,
      chef_at_small_event: 0,
      chef_at_big_event: 0,
    },
    availability: [
      {
        start_date: new Date(),
        end_date: new Date(),
        location: "", // Add location field
      },
    ],
  });

  useEffect(() => {
    const storedChefId = JSON.parse(localStorage.getItem("user"));
    const chefId = storedChefId.chefID;
    if (chefId) {
      setChefId(chefId);
      fetchProposals(chefId);
    }
  }, []);

  const fetchProposals = (chefId) => {
    fetch(`http://localhost:3000/api/chefs/${chefId}/proposal`)
      .then((response) => response.json())
      .then((data) => setProposals(data))
      .catch((error) => console.error("Error fetching proposals:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      pricing: {
        ...formData.pricing,
        [name]: Number(value),
      },
    });
  };

  const handleAvailabilityChange = (index, key, value) => {
    const updatedAvailability = [...formData.availability];
    updatedAvailability[index][key] = value;
    setFormData({
      ...formData,
      availability: updatedAvailability,
    });
  };

  const handleSave = () => {
    fetch(`http://localhost:3000/api/chefs/${chefId}/proposal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add proposal");
        }
        return response.json();
      })
      .then((data) => {
        setProposals([...proposals, data]);
        setFormData({
          pricing: {
            chef_at_home: 0,
            chef_at_small_event: 0,
            chef_at_big_event: 0,
          },
          availability: [
            {
              start_date: new Date(),
              end_date: new Date(),
              location: "", // Reset location
            },
          ],
        });
      })
      .catch((error) => console.error("Error adding proposal:", error));
  };

  const handleDelete = (proposalId, index) => {
    fetch(`http://localhost:3000/api/chefs/${chefId}/proposals/${proposalId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete proposal");
        }
        const updatedProposals = [...proposals];
        updatedProposals.splice(index, 1);
        setProposals(updatedProposals);
      })
      .catch((error) => console.error("Error deleting proposal:", error));
  };

  return (
    <div className="container my-5">
      <div className="d-flex gap-3 flex-column flex-md-row">
        <div className="w-100">
          <h3>Add/Edit Proposal</h3>
          <form>
            {/* Pricing inputs remain unchanged */}
            <div className="form-group">
              <label>Chef at Home Price</label>
              <input
                type="number"
                className="form-control mb-3"
                name="chef_at_home"
                value={formData.pricing.chef_at_home}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Chef at Small Event Price</label>
              <input
                type="number"
                className="form-control mb-3"
                name="chef_at_small_event"
                value={formData.pricing.chef_at_small_event}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Chef at Big Event Price</label>
              <input
                type="number"
                className="form-control mb-3"
                name="chef_at_big_event"
                value={formData.pricing.chef_at_big_event}
                onChange={handleChange}
              />
            </div>
            {formData.availability.map((availability, index) => (
              <div key={index}>
                <label>Availability {index + 1}</label>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    className="form-control mb-3"
                    value={availability.start_date.toISOString().substr(0, 10)}
                    onChange={(e) =>
                      handleAvailabilityChange(
                        index,
                        "start_date",
                        new Date(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    className="form-control mb-3"
                    value={availability.end_date.toISOString().substr(0, 10)}
                    onChange={(e) =>
                      handleAvailabilityChange(
                        index,
                        "end_date",
                        new Date(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={availability.location}
                    onChange={(e) =>
                      handleAvailabilityChange(
                        index,
                        "location",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </form>
        </div>
        <div className="w-100">
          <h3>View Proposals</h3>
          {proposals.map((proposal, index) => (
            <div className="card mt-3 d-flex" key={index}>
              <div className="card-body">
                <h5 className="card-title">Proposal {index + 1}</h5>
                <p className="card-text">
                  Chef at Home Price: {proposal.pricing.chef_at_home}
                </p>
                <p className="card-text">
                  Chef at Small Event Price:{" "}
                  {proposal.pricing.chef_at_small_event}
                </p>
                <p className="card-text">
                  Chef at Big Event Price: {proposal.pricing.chef_at_big_event}
                </p>
                <h6>Availability:</h6>
                <ul className="list-group mb-3">
                  {proposal.availability.map((availability, idx) => (
                    <li className="list-group-item" key={idx}>
                      <p>
                        Start Date:{" "}
                        {new Date(availability.start_date)
                          .toISOString()
                          .substr(0, 10)}
                      </p>
                      <p>
                        End Date:{" "}
                        {new Date(availability.end_date)
                          .toISOString()
                          .substr(0, 10)}
                      </p>
                      <p>Location: {availability.location}</p>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="btn btn-warning mr-2"
                  onClick={() => handleDelete(proposal._id, index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;