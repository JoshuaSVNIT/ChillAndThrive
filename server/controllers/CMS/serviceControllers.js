const { createClient } = require("@sanity/client");
require("dotenv").config();
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true, // set to `false` if you want fresh data instantly
  apiVersion: "2023-05-03",
});

const getAllServices = async (req, res) => {
  try {
    const query = `*[_type == "service"]{
            _id,
            title,
            price,
            duration,
            shortDescription,
            longDescription,
            benefits,
            "image": image.asset->url,
            "gallery": gallery[].asset->url
        }`;

    const services = await client.fetch(query);

    res.json(services);
  } catch (err) {
    console.error("Sanity CMS Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

const test = async (req, res) => {
  res.json([]); //empty array for bili to check
};
module.exports = { getAllServices, test };
