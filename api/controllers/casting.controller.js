import Casting from "../models/casting.model.js";

export const createCasting = async (req, res, next) => {
    try {
        const casting = await Casting.create(req.body);
        return res.status(201).json(casting);
    } catch (error) {
        next(error);

    }
};

export const deleteCasting = async (req, res, next) => {
    const casting = await Casting.findById(req.params.id);

    if (!casting) {
        return next(errorHandler(404, "Not Found"))
    }

    if (req.user.id !== casting.userRef) {
        return next(errorHandler(401, "Invalid User"))
    }

    try {
        await Casting.findByIdAndDelete(req.params.id);
    } catch (error) {
        next(error);
    }
}

export const updateCasting = async (req, res, next) => {
    const casting = await Casting.findById(req.params.id);
    if (!casting) {
        return next(errorHandler(404, 'Not Found'));
    }
    if (req.user.id !== casting.userRef) {
        return next(errorHandler(401, "Access Denied"))
    }

    try {
        const updatedCasting = await Casting.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedCasting)
    } catch (error) {
        next(error)
    }
};

export const getCasting = async (req, res, next) => {
    try {
        const casting = await Casting.findById(req.params.id);
        if (!casting) {
            return next(errorHandler(404, "Not found"));
        }
        res.status(200).json(casting);
    } catch (error) {
        next(error);
    }
}