const { StatusCodes } = require("http-status-codes")

/*
When an error is thrown, it propagates up the middleware stack until it reaches a middleware function that can handle it. 
In our case, the errorHandlerMiddleware is such a middleware because it's defined to accept errors as its first parameter (err).
*/
const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, try again later"
    }

    /* We will insert some custom error logic over here */
    console.log("IN ERROR HANDLER");
    res.status(customError.statusCode).json({ msg: customError.msg });
}

module.exports = errorHandler;