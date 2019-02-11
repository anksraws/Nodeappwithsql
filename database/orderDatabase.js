const con = require('./../connection/connection.js');

module.exports.updateOrder = (req, res) => {
	var order_id = parseInt(req.params.id);
	var order_food = req.body.order_food;
	var sql = `update restaurant set order_food = "${order_food}" where order_id = "${order_id}"`;
	con.query(sql,(err, result) => {
      if(err || result.affectedRows==0){
      	res.status(404).send();
      }
      else{
      res.send({
      	order_id,
      	order_food
      });
  }
	})
}

module.exports.enterOrder = (req, res) =>{
	var customer_id = req.decode.userId;
	var order_food = req.body.order_food;
    var sql = `insert into restaurant (customer_id,order_food) values ("${customer_id}","${order_food}")`;
    con.query(sql,(err, result) => {
    	if(err) throw err;
    	else{
    		res.send({
    			customer_id,
    			order_food
    		})
    	}
    })

}