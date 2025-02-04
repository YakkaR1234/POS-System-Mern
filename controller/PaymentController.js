const { response } = require("express");
const Payment = require("../model/PaymentSchema");

const makepayment = async (req, res) => {
  //only admin and manager can
  try {
    const createPayment = new Payment(req.body);
    const savedPayment = await createPayment.save();
    res.status(201).json({ message: "Payment saved", data: savedPayment });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const findIncomeToday = async (req, res) => {
  //only admin and manager can
  try {
    const { day } = req.query;
    const startDay = new Date(day);
    const endDay = new Date(day);

    endDay.setDate(endDay.getDate() + 1);
    const data = await createPayment.find({
      Data: {
        $gte: startDay,
        $lt: endDay,
      },
    });

    const totalIncome = data.reduce((sum, Payment) => sum + Payment.amount, 0);
    res.status(200).json({ message: "today 's income", data: totalIncome });
  } catch (error) {
    res.status(500).json({
      error: e.message,
    });
  }
};

const findIncomeByCurrentMonth = async (req, res) => {
  //only admin and manager can
  try {
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const data = await createPayment.find({
      Data: {
        $gte: startMonth,
        $lt: endMonth,
      },
    });

    const incomeByDate = data.reduce((acc, Payment) => {
      const day = Payment.Date.getISOString().split("T")[0];
      acc[day] = (acc[day] || 0) + Payment.amount;
    });
    res
      .status(200)
      .json({
        message: "Month income",
        data: endMonth.now.getMonth() + 1,
        income: incomeByDate,
      });
  } catch (error) {
    res.status(500).json({
      error: e.message,
    });
  }
};
module.exports = { makepayment, findIncomeToday, findIncomeByCurrentMonth };
