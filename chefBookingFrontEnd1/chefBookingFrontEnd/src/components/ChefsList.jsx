import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../chefList.css'

function ChefsList() {
  const [chefs, setChefs] = useState([]);
  const [filteredChefs, setFilteredChefs] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedAbility, setSelectedAbility] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleBooking = () => {
    if (isLoggedIn) {
      navigate("/book/chef");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchAbilities();
    fetchChefs();
  }, []);

  useEffect(() => {
    filterAndSortChefs();
  }, [chefs, selectedAbility, selectedLocation, selectedSort]);

  const fetchAbilities = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/chefs/abilites");
      if (!response.ok) {
        throw new Error("Failed to fetch abilities");
      }
      const data = await response.json();
      setAbilities(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChefs = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/chefs/");
      if (!response.ok) {
        throw new Error("Failed to fetch chefs");
      }
      const data = await response.json();
      setChefs(data);
      
      // Extract unique locations from chef proposals
      const allLocations = data.flatMap(chef => 
        chef.proposals.flatMap(proposal => 
          proposal.availability.map(avail => avail.location)
        )
      );
      const uniqueLocations = [...new Set(allLocations)].filter(Boolean);
      setLocations(uniqueLocations);
    } catch (error) {
      console.error(error);
    }
  };

  const filterAndSortChefs = () => {
    let filtered = [...chefs];

    if (selectedAbility) {
      filtered = filtered.filter(chef => chef.abilities.includes(selectedAbility));
    }

    if (selectedLocation) {
      filtered = filtered.filter(chef => 
        chef.proposals.some(proposal => 
          proposal.availability.some(avail => avail.location === selectedLocation)
        )
      );
    }

    if (selectedSort === "lowToHigh") {
      filtered.sort((a, b) => getChefsMinPrice(a) - getChefsMinPrice(b));
    } else if (selectedSort === "highToLow") {
      filtered.sort((a, b) => getChefsMinPrice(b) - getChefsMinPrice(a));
    }

    setFilteredChefs(filtered);
  };

  const handleDropdownChange = (ability) => {
    setSelectedAbility(ability);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const getChefsMinPrice = (chef) => {
    let minPrice = Infinity;
    chef.proposals.forEach((proposal) => {
      const pricing = proposal.pricing;
      if (pricing) {
        const minProposalPrice = Math.min(
          pricing.chef_at_home,
          pricing.chef_at_small_event,
          pricing.chef_at_big_event
        );
        if (minProposalPrice < minPrice) {
          minPrice = minProposalPrice;
        }
      }
    });
    return minPrice;
  };

  return (
    <div className="chefs-list-section">
      <div className="container">
        <div className="chefs-list-header">
          <h2>Explore the Chefs</h2>
          <div className="filter-sort-container">
            <select
              className="filter-select"
              onChange={(e) => handleDropdownChange(e.target.value)}
              value={selectedAbility}
            >
              <option value="">Filter by Ability</option>
              {abilities.map((ability, index) => (
                <option key={index} value={ability}>{ability}</option>
              ))}
            </select>
            <select
              className="filter-select"
              onChange={(e) => handleLocationChange(e.target.value)}
              value={selectedLocation}
            >
              <option value="">Filter by Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
            <select
              className="sort-select"
              onChange={handleSortChange}
              value={selectedSort}
            >
              <option value="">Sort by Price</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>
        </div>

        {filteredChefs.length === 0 ? (
          <p className="no-chefs-message">No Chefs found</p>
        ) : (
          <div className="chefs-list">
            {filteredChefs.map((chef) => (
              <div key={chef._id} className="chef-row">
                <div className="chef-photo">
                  <img src={chef?.profileUrl} alt={chef.name} />
                </div>
                <div className="chef-details">
                  <h3 className="chef-name">{chef.name}</h3>
                  <p className="chef-email">Email: {chef.email}</p>
                  <p className="chef-mobile">Mobile No: {chef.mobile}</p>
                  <p className="chef-specialties">
                    <strong>Specialties:</strong> {chef.abilities.join(", ")}
                  </p>
                  <div className="chef-pricing">
                    <h4>Pricing Details:</h4>
                    {chef.proposals.map((proposal, index) => (
                      <div key={index} className="pricing-details">
                        <p>Chef at Home: ₹{proposal.pricing.chef_at_home}</p>
                        <p>Chef at Small Event: ₹{proposal.pricing.chef_at_small_event}</p>
                        <p>Chef at Big Event: ₹{proposal.pricing.chef_at_big_event}</p>
                        <p>{proposal.availability.location}</p>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/view/chef/${chef._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChefsList;