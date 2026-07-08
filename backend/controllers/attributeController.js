import Attribute from "../models/attribute.js";

export const createAttribute = async (req, res) => {
  try {
    const attr = new Attribute(req.body);
    await attr.save();
    return res.json(attr);
  } catch (error) {
    console.log(
      "problem is on the createAttribute on attributeController file",
      error,
    );
  }
};

export const getAttribute = async (req, res) => {
  try {
    const attrs = await Attribute.find();
    return res.json(attrs);
  } catch (error) {
    console.log(
      "problem is on the getAttribute on attributeController file",
      error,
    );
  }
};
