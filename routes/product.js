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
