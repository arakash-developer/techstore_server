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

router.get("/", async(req, res) => {
  const { page = 1, limit = 10 } = req.query; 
  try {
    // Convert to numbers
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    // Fetch data with skip and limit
    const data = await productModel.find()
      .skip((pageNum - 1) * limitNum) // Skip previous pages
      .limit(limitNum); // Limit the number of documents
    const total = await productModel.countDocuments(); // Total number of documents
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
