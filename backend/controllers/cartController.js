import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    if (!userId || !itemId || !size) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          [`cartData.${itemId}.${size}`]: 1,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Failed to update cart",
      });
    }

    res.json({
      success: true,
      message: "Added To Cart",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while adding to cart",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    if (!userId || !itemId || !size || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          [`cartData.${itemId}.${size}`]: quantity,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Cart Updated",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating cart",
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      cartData: user.cartData || {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching cart",
    });
  }
};

export { addToCart, updateCart, getUserCart };