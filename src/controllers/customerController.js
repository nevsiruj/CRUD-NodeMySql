const controller = {};

controller.list = (req, res) => {
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM customer', (err, result) => {
            if ( err ) {
                res.json(err);
            }
            console.log(result);
            res.render('customers', {
                data : result
            });
        })
    })
};

controller.add = (req, res) => {
    const data = req.body;
    console.log(data);
    req.getConnection((err,conn) => {
        conn.query('INSERT INTO customer set ?',[data], (err, result) => {
            res.redirect("/");
        });
    });
}

controller.edit = (req, res) => {
    const {id} = req.params;
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM customer WHERE id = ?',[id], (err, result) => {
            res.render('customer_edit', {
                data:result[0]
            })
        });
    });
    };

controller.update = (req, res) => {
    const {id} = req.params;
    const newCustomer = req.body;
    req.getConnection((err,conn) => {
        conn.query('UPDATE customer set ? WHERE id = ?', [newCustomer,id], (err, result) => {
            res.redirect("/");
        })
    })
}


controller.delete = (req, res) => {
    const {id} = req.params;
    req.getConnection((err,conn) => {
        conn.query('DELETE FROM customer WHERE id = ?',[id], (err, result) => {
            res.redirect("/");
        })
    })

}


module.exports = controller;