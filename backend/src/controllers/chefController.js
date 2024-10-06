// chefController.js

const Chef = require("../model/chefModel");
const userModel = require("../model/userModel")

// Add a new chef
// Chef registration request
exports.addChef = async (req, res) => {
  try {
    const { name, email, abilities, mobile, documentUrl, profileUrl,experience,specialistDishes } =
      req.body;

    // Create a new chef instance
    const newChef = new Chef({
      name,
      email,
      mobile,
      abilities,
      documentUrl,
      profileUrl, // Adding profileUrl here
      experience,
      specialistDishes,
      approved: false, // Set to false by default
      isChef: true, // Set to true indicating this user is a chef
    });

    // Save the new chef to the database
    await newChef.save();
    const user = await userModel.findOneAndUpdate(
      { email }, // Assuming email is unique and used for identification
      { $set: { chefId: newChef._id } },
      { new: true } // To return the updated user document
    );
    res
      .status(201)
      .json({ message: "Chef added successfully", chef: newChef, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Approve or reject chef registration request// authController.js

exports.approveOrRejectChefRequest = async (req, res) => {
  try {
    const { chefId } = req.params;
    const chef = await Chef.findById(chefId);

    if (!chef) {
      return res.status(404).json({ error: "Chef not found" });
    }

    // Update chef's approved status
    chef.approved = true;
    await chef.save();

    // Update user role to "chef"
    const user = await userModel.findOneAndUpdate(
      { chefId: chefId },
      { $set: { role: "chef" } },
      { new: true }
    );
    console.log(user);
    res.json({ message: "Chef approved successfully", chef, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View all chef registration requests
exports.viewChefRegistrationRequests = async (req, res) => {
  try {
    const requests = await userModel.find({
      role: "chef",
      "chefDetails.approved": false,
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check chef registration status
// authController.js

exports.checkChefRegistrationStatus = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user by userId
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is registered as a chef and get the approval status
    const chefDetails = user.chefDetails || {};
    const approvalStatus = chefDetails.approved;

    res.status(200).json({ status: approvalStatus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit chef details
exports.updateChef = async (req, res) => {
  try {
    const chef = await Chef.findByIdAndUpdate(req.params.chef_id, req.body, {
      new: true,
    });
    res.json(chef);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a chef
exports.deleteChef = async (req, res) => {
  try {
    await Chef.findByIdAndDelete(req.params.chef_id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add or edit chef proposal
exports.addOrEditProposal = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.chef_id);
    chef.proposals.push(req.body);
    await chef.save();
    res.status(201).json(chef);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// View own proposal
exports.viewProposal = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.chef_id);
    res.json(chef.proposals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.deleteProposal = async (req, res) => {
  const { chef_id, proposal_id } = req.params;

  try {
    const chef = await Chef.findById(chef_id);
    if (!chef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    // Find the index of the proposal to delete
    const proposalIndex = chef.proposals.findIndex(
      (proposal) => proposal._id.toString() === proposal_id
    );

    // If proposal not found, return error
    if (proposalIndex === -1) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    // Remove the proposal from the proposals array
    chef.proposals.splice(proposalIndex, 1);

    // Save the chef document with the updated proposals array
    await chef.save();

    res.json({ message: "Proposal deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Edit own proposal
exports.editProposal = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.chef_id);
    const proposal = chef.proposals.id(req.params.proposal_id);
    if (!proposal)
      return res.status(404).json({ message: "Proposal not found" });
    Object.assign(proposal, req.body);
    await chef.save();
    res.json(chef);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get chef information
exports.getChef = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.chef_id);
    if (!chef) return res.status(404).json({ message: "Chef not found" });
    res.json(chef);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProposals = async (req, res) => {
  try {
    const chefs = await Chef.find();
    const allProposals = chefs.reduce((acc, chef) => {
      return acc.concat(chef.proposals);
    }, []);
    res.json(allProposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllChefAbilities = async (req, res) => {
  try {
    const chefs = await Chef.find();
    let allAbilities = [];

    // Extract abilities from each chef and accumulate in allAbilities array
    chefs.forEach((chef) => {
      allAbilities = allAbilities.concat(chef.abilities);
    });

    // Remove duplicates and return unique abilities
    const uniqueAbilities = Array.from(new Set(allAbilities));
    res.json(uniqueAbilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getChefsByAbilities = async (req, res) => {
  try {
    let { ability } = req.params;

    // Convert ability to lowercase and remove leading/trailing spaces
    ability = ability.trim().toLowerCase();

    // Find chefs who have the specified ability (case-insensitive and handles spaces)
    const chefs = await Chef.find({
      abilities: { $regex: new RegExp(ability, "i") },
    });

    if (!chefs || chefs.length === 0) {
      return res
        .status(404)
        .json({ message: "No chefs found with the specified ability." });
    }

    res.json(chefs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
