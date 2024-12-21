const express = require("express");
const router = express.Router();
let productModel = require("../model/product");

// router.get('/', async(req, res) => {
//     let allProducts = await productModel.find();
//     res.status(200).json(
//         {
//             message: "All products",
//             data: allProducts
//         }
//     );
// });

router.post("/", async(req, res) => {
    let { title, price } = req.body;
    // if(!title || !price) {
    //     res.status(400).json({
    //         message: "Please provide title and price"
    //     });
    //     return;
    // }
  let products = await productModel.create(req.body)
    .then((product) => {
      res.status(201).json({
        message: "Product created successfully",
        data: product,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occured",
        data: error,
      });
    });
    res.status(200).json({
        message: "Product created successfully",
        // data: products,
      });
});

module.exports = router;
