const Product = require("../model/ProductSchema");

const saveProduct = async (req, res) => {
  //admin and manager can

  try {
    const createProduct = new Customer(req.body);
    const savedCustomer = await createProduct.save();
    res.status(200).json({ message: "cusotmer saved", data: savedCustomer });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  //admin
  try {
    const id = req.params.id;
    const UpdatePorduct = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!UpdatePorduct) {
      return res.status(404).json({ message: "product not found" });
    }
    return res
      .status(200)
      .json({ message: "product updated", data: UpdatePorduct });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Customer.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "product not found" });
    }
    return res
      .status(200)
      .json({ message: "product deleted", data: deletedProduct });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const findProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const selectedProduct = await Customer.findById(id);

    if (!selectedProduct) {
      return res.status(404).json({ message: "product not found" });
    }
    return res
      .status(200)
      .json({ message: "product found", data: selectedProduct });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loadAllProduct = async (req, res) => {
  try {
    const { searchText, page = 1, size = 10 } = req.query;
    const filter = searchText
      ? {
          $or: [
            { productName: { $regex: searchText, $options: "i" } },
            { Discription: { $regex: searchText, $options: "i" } },
          ],
        }
      : {};

    const productList = await Product.find(filter)
      .skip((page - 1) * size)
      .limit(size)
      .limit(parseInt(size));
    const total = await Product.countDocumentsetra(filter);
    res
      .status(200)
      .json({ message: "date lsit", data: productList, count: total });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const findlowStockProducts = async (req, res) => {
  try {
    const dataList = await Product.findlowStockProducts();
    res.status(200).json({ message: "lower quantity list", data: dataList });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveProduct,
  updateProduct,
  DeleteProduct,
  findProduct,
  loadAllProduct,
  findlowStockProducts
};
