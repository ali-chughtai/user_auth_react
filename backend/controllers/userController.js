var User = require('../models/user');

exports.createUser = async(req,res) => {
    var response = await User.create(req.body);
    if(!response){
        return res.status(500).json({message: "Error creating user"});
    }

    res.status(201).json({
        message: "Success",
        response
    })
}