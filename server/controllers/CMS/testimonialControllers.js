const { createClient } = require("@sanity/client");
require("dotenv").config();
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true, // set to `false` if you want fresh data instantly
  apiVersion: "2023-05-03",
});

const getAllTestimonials = async (req, res) => {
  try {
    const query = `*[_type == "testimonials"]{
            _id,
            name,
            role,
            review,
            rating,
            "image": image.asset->url
        }`;

    const services = await client.fetch(query);

    res.json(services);
    // res.json([
    //   {
    //     _id: "64f8a123",
    //     name: "Sarah Jenkins",
    //     role: "Marathon Runner",
    //     review:
    //       "The cryotherapy sessions have completely changed my recovery routine. My leg soreness is gone in half the time it used to take.",
    //     image: "https://i.pravatar.cc/150?img=5",
    //     rating: 5,
    //   },
    //   {
    //     _id: "64f8a124",
    //     name: "Marcus Thorne",
    //     role: "CrossFit Athlete",
    //     review:
    //       "Incredible atmosphere. The staff knows exactly how to help with sports injuries. Highly recommend the infrared sauna.",
    //     image: "https://i.pravatar.cc/150?img=11",
    //     rating: 5,
    //   },

    //   {
    //     _id: "64f8a126",
    //     name: "David Kim",
    //     role: "Member since 2022",
    //     review:
    //       "Great service, though booking on weekends can get a little tight. Make sure to reserve your spot in advance!",
    //     image: "https://i.pravatar.cc/150?img=3",
    //     rating: 4,
    //   },
    //   {
    //     _id: "64f8a127",
    //     name: "Jessica Alba",
    //     role: "Wellness Enthusiast",
    //     review:
    //       "I've tried many recovery centers, but Chill & Thrive is by far the best. The cold plunge is intense but amazing.",
    //     image: "https://i.pravatar.cc/150?img=1",
    //     rating: 5,
    //   },
    // ]);
  } catch (err) {
    console.error("Sanity CMS Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};

const test = async (req, res) => {
  res.json({ message: "Testimonial controller is working!" });
};
module.exports = { getAllTestimonials, test };
