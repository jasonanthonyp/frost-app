import Casting from "../models/casting.model.js";

export const createCasting = async (req, res, next) => {
    try {
        const casting = await Casting.create(req.body);
        return res.status(201).json(casting);
    } catch (error) {
        next(error);

    }
};