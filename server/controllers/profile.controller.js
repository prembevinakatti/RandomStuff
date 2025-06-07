const authModel = require("../models/auth.model");
const Profile = require("../models/userProfile.model");

module.exports.createProfile = async (req, res) => {
  try {
    const { data } = req.body;
    const userId = req.user._id;

    if (!data) {
      return res.status(400).json({ message: "Data is required" });
    }

    const existingProfile = await Profile.findOne({ userId });

    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = new Profile({ ...data, userId });
    await profile.save();

    const user = await authModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profileId = profile._id;
    await user.save();

    return res.status(201).json({
      message: "Profile created successfully",
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating profile", error });
  }
};

module.exports.getProfileByUserId = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const profile = await Profile.findOne({ userId: userId }).populate(
      "userId"
    );

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

module.exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: userId },
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


module.exports.getAllProfiles = async (req, res) => {
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
