let errorHandler = ( error, _req, res, _next ) => {

    res.status(500).json({

        response: 'error',
        error: error.message

    });

};

module.exports = errorHandler;