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

export const getCastings = async (req, res, next) => {

    try {

        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let sag = req.query.sag;

        if (sag === undefined || sag === 'false') {
            sag = { $in: [false, true] };
        };

        let nonunion = req.query.nonunion;

        if (nonunion === undefined || nonunion === 'false') {
            nonunion = { $in: [false, true] };
        };

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const castings = await Casting.find({
            name: { $regex: searchTerm, $options: 'i' },
            sag,
            nonunion,
        }).sort(
            { [sort]: order }
        ).limit(limit).skip(startIndex);

        return res.status(200).json(castings);

    } catch (error) {
        next(error);

    }
}