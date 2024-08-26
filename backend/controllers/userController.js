var User = require('../models/user');
const bcrypt = require('bcrypt'); 

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


exports.loginUser = async (req, res) => {
  try {
    console.log(" ======== Api Hit ========= ")
    const { email, password } = req.body;
    var user = await User.findOne({ email: email });
    // console.log("User:", user);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Email or password doesn't match" });
    }
    res.status(200).json({ message: "Success", user });
      } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

