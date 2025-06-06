const Profile = require("../models/Profile");

exports.createProfile = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ message: "Data is required" });
    }

    const existingProfile = await Profile.findOne({ userId });

    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = new Profile(data);
    await profile.save();

    return res.status(201).json({
      message: "Profile created successfully",
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating profile", error });
  }
};

exports.getProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOne({ userId }).populate("userId");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({
      message: "Profile Fetched Successfully",
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profile", error });
  }
};

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

    return res.status(200).json({
      message: "Profile updated",
      success: true,
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const deletedProfile = await Profile.findOneAndDelete({ userId });

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res
      .status(200)
      .json({ message: "Profile deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate("userId")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      message: "All Profiles Fetched Successfully",
      success: true,
      profiles,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
};
