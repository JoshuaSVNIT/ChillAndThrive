const { createClient } = require("@sanity/client");
require("dotenv").config();
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true, // set to `false` if you want fresh data instantly
  apiVersion: "2023-05-03",
});
const getAwareness = async (req, res) => {
  try {
    const awareness = await client.fetch(`*[_type == "awareness"]`);
    res.status(200).json(awareness);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFAQ = async (req, res) => {
  try {
    const faq = await client.fetch(`*[_type == "faq"]`);
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyths = async (req, res) => {
  try {
    const myths = await client.fetch(`*[_type == "myth"]`);
    res.status(200).json(myths);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAwareness, getFAQ, getMyths };
