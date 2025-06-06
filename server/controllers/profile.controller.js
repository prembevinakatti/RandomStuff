const Profile = require("../models/Profile");

// Create a new profile
exports.createProfile = async (req, res) => {
  try {
    const { userId, contactno } = req.body;

    // Check if profile already exists for the user
    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = new Profile(req.body);
    await profile.save();

    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (error) {
    res.status(500).json({ message: "Error creating profile", error });
  }
};

// Get profile by userId
exports.getProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOne({ userId }).populate("userId contactno");
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profile", error });
  }
};

// Update profile by userId
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile updated", profile: updatedProfile });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// Delete profile by userId
exports.deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedProfile = await Profile.findOneAndDelete({ userId });

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
};

// Get all profiles (Admin use)
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("userId contactno").sort({ createdAt: -1 });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
};
