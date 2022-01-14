const { Client } = require('pg');
var connectionString = "mobcoder://mobcoder:mobcoder@localhost:5432/sammy";

const client = new Client({
    connectionString: connectionString
});

client.connect();

exports.list = function (req, res) {

    client.query('SELECT * FROM company', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('customer/list', { title: "Customers", data: result.rows });
    });

};

exports.add = function (req, res) {
    res.render('customer/add', { title: "Add Customer"  });
};

exports.edit = function (req, res) {

    var id = req.params.id;

    client.query('SELECT * FROM company WHERE id=$1', [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('customer/edit', { title: "Edit Customer", data: result.rows });
    });

};

exports.save = function (req, res) {

    var cols = [req.body.name, req.body.address, req.body.age];

    client.query('INSERT INTO company(id, name, address, age) VALUES(15, $1, $2, $3) RETURNING *', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.redirect('/customers');
    });

};

exports.update = function (req, res) {

    var cols = [req.body.name, req.body.address, req.body.age, req.params.id];

    client.query('UPDATE company SET name=$1, address=$2,age=$3 WHERE id=$4', cols, function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
        res.redirect('/customers');
    });

};

exports.delete = function (req, res) {

    var id = req.params.id;

    client.query("DELETE FROM company WHERE id=$1", [id], function (err, rows) {
        if (err) {
            console.log("Error deleting : %s ", err);
        }
        res.redirect('/customers');
    });

};


