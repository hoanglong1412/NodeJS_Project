// just for study
const ValidationTest = function (req, res, next) {
    const body = req.body;
    // check length of title
    const title = body.title;
    if (title.length < 3) {
        error = 'title is less than 3 letter';
        logger.error(error);
        return res.status(400).json({
            msg: error,
        });
    }
    next();
};

module.exports = ValidationTest;
