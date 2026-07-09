import Position from "../models/position.js";

export const createPosition = async (req, res) => {
  try {
    const position = new Position(req.body);
    await position.save();
    return res.json(position);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const allPosition = async (req, res) => {
  try {
    const positions = await Position.find().populate("requiredAttributes");
    return res.json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPositionById = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id).populate(
      "requiredAttributes",
    );
    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }
    return res.json(position);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePosition = async (req, res) => {
  try {
    const updatedPosition = await Position.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedPosition) {
      return res.status(404).json({ message: "Position not found" });
    }
    res.status(200).json(updatedPosition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePosition = async (req, res) => {
  try {
    await Position.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Position deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
