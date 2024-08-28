var User = require('../models/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

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
    const token = jwt.sign({ id: user._id, email: user.email },
      'edhf345h876hrh587i#@485&345&$(*&)4543jggekrer',
      { expiresIn: '1h' }
    );
    
    console.log("Generated Token:", token); // Debugging line
    
    res.status(200).json({ message: "Success", user , token });
    console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" , user)
      } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

