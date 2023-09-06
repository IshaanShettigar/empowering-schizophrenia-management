const notFound = (req, res) => res.status(404).send('Route does not exist')

module.exports = notFound

/*
The program funnels 404 requests to the notFoundMiddleware because of the order in which middleware is applied in Express.js.
When a request is made to a route that doesn't match any of the defined routes, none of the previous middleware or route 
handlers are executed. Instead, Express.js proceeds to look for a middleware that handles 404 errors.
*/