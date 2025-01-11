const express = require("express");
const router = express.Router();
let productModel = require("../model/product");

router.post("/create", async(req, res) => {
  if(Object.keys(req.body).length === 0){
    res.status(400).json({
      message: "Product not created",
    });
  }else{
    let products = await productModel.create(req.body)
    res.status(200).json({
        message: "Product created successfully",
        data: products,
      });
}
});

router.get("/", async (req, res) => {
  const { page = 1, limit = 10, category, brand } = req.query; // Extract category and brand from query parameters
  try {
    // Convert page and limit to numbers
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // Initialize the filter object
    let filter = {};
    if (category) {
      filter.category = { $regex: category, $options: "i" }; // Case-insensitive partial match for category
    }
    if (brand) {
      filter.brand = { $regex: brand, $options: "i" }; // Case-insensitive partial match for brand
    }

    // Fetch filtered data with pagination
    const data = await productModel.find(filter)
      .skip((pageNum - 1) * limitNum) // Skip previous pages
      .limit(limitNum); // Limit the number of documents

    // Get the total count of documents matching the filter
    const total = await productModel.countDocuments(filter);

    // Send the response
    res.json({
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Get a single product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/update/:id", async(req, res) => {
  let { id } = req.params;  
  let products = await productModel.findOne({ _id: id }) 
  products.reviews[0].rating = req.body.reviews[0].rating || products.reviews[0].rating
  products.reviews[0].comment = req.body.reviews[0].comment || products.reviews[0].comment
  await products.save()
  res.status(200).json({
      message: "Product updated successfully",
      data: products,
    }); 
})
module.exports = router;
