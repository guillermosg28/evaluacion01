const express = require('express');
// Constants
const hostname = '200.4.209.162';
const port = 9595;

// App
const app = express();

// GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});

// // Connect to mongodb server
var MongoClient = require('mongodb').MongoClient;
// /* Your url connection to mongodb container */
var url = `mongodb://mongo:27017/`;

// GET method route
// Upload documents to database
app.get('/upload_documents', function (request, response) {
    response.type('application/json');
    MongoClient.connect(url, function (err, db) {
        if (err) {
            response.status(503);
            response.send({
                success: false,
                status_code: 503,
                errs: err
            })
        } else {
            var dbo = db.db("market");
            var products = dbo.collection("products");
            // create an array of documents to insert
            const docs = [
                { name: "COCACOLA", category: "GASEOSAS", price: 20 },
                { name: "PEPSICOLA", category: "GASEOSAS", price: 18 },
                { name: "AZUCAR", category: "ABARROTES", price: 17 },
                { name: "ARROZ", category: "ABARROTES", price: 16 },
            ];

            products.insertMany(docs, function (err, res) {
                if (err) {
                    response.status(500);
                    response.send({
                        success: false,
                        status_code: 500
                    })
                } else {
                    response.status(201);
                    response.send({
                        success: true,
                        status_code: 201
                    })
                    db.close();
                }

            });
        }

    });

});


// GET method route
// Retrieve all documents in collection
app.get('/alls', function (request, response) {
    response.type('application/json');
    MongoClient.connect(url, function (err, db) {
        if (err) {
            response.status(503);
            response.send({
                success: false,
                status_code: 503
            })
        } else {
            var dbo = db.db("market");
            var products = dbo.collection("products");

            products.find({}).toArray(function (err, result) {
                if (err) throw err;
                response.status(200);
                response.send({
                    success: true,
                    status_code: 200,
                    products: result
                })
                db.close();
            });

        }

    });

});

// GET method route
// Query by name
app.get('/search', function (request, response) {
    //capture category .. /search?category={text}
    let category = request.query.category;
    //Open MongoClient
    MongoClient.connect(url, function (err, db) {
        if (err) {
            response.status(503);
            response.send({
                success: false,
                status_code: 503
            })
        } else {
            var dbo = db.db("market");
            var products = dbo.collection("products");
            var query = { 'category': category };

            products.find(query).toArray(function (err, result) {
                if (err) throw err;
                response.status(200);
                response.send({
                    success: true,
                    status_code: 200,
                    products: result
                })
                db.close();
            });

        }

    });
});


/* PUT method. Modifying the message based on host. 
If not found, create a new document in the database. (201 Created)
If found, message, date and offset is modified (200 OK) */
app.put('/update', function (request, response) {

    response.type('application/json');
    ///capture [name,category,price] .. /update?name={text}&category={text}&price={number}
    let name = request.query.name;
    let category = request.query.category;
    let price = request.query.price;

    MongoClient.connect(url, function (err, db) {
        if (err) {
            response.status(503);
            response.send({
                success: false,
                status_code: 503
            })
        } else {

            var dbo = db.db("market");
            var products = dbo.collection("products");

            var query = { name: name };
            var newvalues = { $set: { name: name, category: category, price: price } };
            var options = { upsert: true };

            products.updateOne(query, newvalues, options, function (err, result) {
                if (err) {
                    response.status(401);
                    response.send({
                        success: false,
                        status_code: 401
                    })
                }
                if (result.upsertedCount > 0) {
                    response.status(201);
                    response.send({
                        success: true,
                        status_code: 201
                    })
                } else {
                    response.status(200);
                    response.send({
                        success: true,
                        status_code: 200
                    });
                }
                db.close();
            });
        }
    });
})


/* DELETE method. Modifying the message based on hostname. 
If not found, do nothing. (204 No Content)
If found, document deleted (200 OK) */
app.delete('/delete', function (request, response) {
    response.type('application/json');
    ///capture [name] .. /delete?name={text}
    let name = request.query.name;
    MongoClient.connect(url, function (err, db) {
        if (err) {
            response.status(503);
            response.send({
                success: false,
                status_code: 503
            })
        } else {
            var dbo = db.db("market");
            var products = dbo.collection("products");
            var query = { name: name };
            products.deleteOne(query, function (err, result) {
                if (err) {
                    response.status(401);
                    response.send({
                        success: false,
                        status_code: 401
                    })
                }
                if (result.deletedCount === 1) {
                    response.status(200);
                    response.send({
                        success: true,
                        status_code: 200
                    })
                } else {
                    response.status(204);
                    response.send({
                        success: true,
                        status_code: 204
                    })
                }
            })

        }
    });
})

app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`);

