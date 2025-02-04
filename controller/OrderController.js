const Order = require("../model/OrderSchema");

const saveOrder = async (req, res) => {
  //only admin and manager can
  try {
    const createOrder = new Order(req.body);
    const savedOrder = await createOrder.save();
    res.status(200).json({ message: "Order saved", data: savedOrder });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["PENDING", "REJECTED", "COMPLETED", "CANCELLED"].includes(status)) {
      res.status(400).json({ message: "Invalid status" });
    }

    const UpdateOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );

    if (!UpdateOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res
      .status(200)
      .json({ message: "Order updated", data: UpdateOrder });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteOrder = await Order.findByIdAndDelete(id);

    if (!deleteOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res
      .status(200)
      .json({ message: "Order deleted", data: deleteOrder });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const findOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const selectedOrder = await Customer.findById(id);

    if (!selectedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res
      .status(200)
      .json({ message: "Order found", data: Updatedcustomer });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loadAllOrder = async (req, res) => {
  try {
    const {page=1,size=10}=req.query;
    const OrderList=await Order.find().sort({Date:-1}).skip((page-1)*size).limit(parseInt(size));
    const total = await Order.countDocumentsetra();
    res
      .status(200)
      .json({ message: "date lsit", data: OrderList, count: total });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { saveOrder, updateOrder, findOrder,deleteOrder,loadAllOrder};
