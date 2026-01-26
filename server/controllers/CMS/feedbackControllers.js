const { createClient } = require("@sanity/client");
require("dotenv").config();

// Initialize a client specifically for WRITING
const writeClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: "2023-05-03",
});

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, phone, message, rating } = req.body;

    const newFeedback = await writeClient.create({
      _type: "feedback", // Must match schema name
      name: name,
      email: email,
      phone: phone,
      message: message,
      rating: Number(rating),
      status: "pending", // Default to pending
    });

    res.status(200).json({ success: true, message: "Review submitted!" });
  } catch (error) {
    console.error("Sanity Write Error:", error);
    res.status(500).json({ message: "Failed to submit review" });
  }
};
