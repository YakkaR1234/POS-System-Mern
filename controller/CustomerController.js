const Customer = require("../model/CustomerSchema");
const { options } = require("../routes/CusotmerRoute");

const saveCustomer = async (req, res) => {
  //only admin and manager can
  try {
    const createCustomer = new Customer(req.body);
    const savedCustomer = await createCustomer.save();
    res.status(200).json({ message: "cusotmer saved", data: savedCustomer });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatecustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const Updatecustomer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!Updatecustomer) {
      return res.status(404).json({ message: "customer not found" });
    }
    return res
      .status(200)
      .json({ message: "cusotmer updated", data: Updatedcustomer });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const findCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const selectedCustomer = await Customer.findById(id);

    if (!selectedCustomer) {
      return res.status(404).json({ message: "customer not found" });
    }
    return res
      .status(200)
      .json({ message: "cusotmer found", data: Updatedcustomer });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loadAllcustomer = async (req, res) => {
  try {
    const { searchText, page = 1, size = 10 } = req.query;
    const filter = searchText
      ? {
          $or: [
            { customerName: { $regex: searchText, $options: "i" } },
            { address: { $regex: searchText, $options: "i" } },
            { email: { $regex: searchText, $options: "i" } },
          ],
        }
      : {};

    const customerList = await Customer.find(filter)
      .skip((page - 1) * size)
      .limit(size)
      .limit(parseInt(size));
    const total = await Customer.countDocumentsetra(filter);
    res
      .status(200)
      .json({ message: "date lsit", data: customerList, count: total });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const DeleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedcustomer = await Customer.findByIdAndDelete(id);

    if (!deletedcustomer) {
      return res.status(404).json({ message: "customer not found" });
    }
    return res
      .status(200)
      .json({ message: "cusotmer deleted", data: Updatedcustomer });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {saveCustomer,updatecustomer,findCustomer,loadAllcustomer,DeleteCustomer};
