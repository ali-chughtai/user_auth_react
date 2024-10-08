var User = require('../models/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();


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
    console.log("User:", user);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Email or password doesn't match" });
    }
    const token = jwt.sign({user},
      'edhf345h876hrh587i#@485&345&$(*&)4543jggekrer',
      { expiresIn: '5m' }
    );
    
    console.log("Generated Token:", token); // Debugging line
    
    res.status(200).json({ message: "Success", user , token });
    console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" , user)
      } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};



const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to another service like 'SendGrid', 'Outlook', etc.
  auth: {
      user: process.env.EMAIL_USER, // Use environment variables for email credentials
      pass: process.env.EMAIL_PASS
  }
});

// Function to send password reset email
// const sendResetEmail = (email) => {
//   const resetLink = `http://localhost:3001/resetpassword?email=${email}`;

//   const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Password Reset Request',
//       html: `<p>You requested a password reset. Click the link below to reset your password:</p>
//              <a href="${resetLink}">${resetLink}</a>`
//   };

//   return transporter.sendMail(mailOptions);
// };

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate JWT token for password reset
    const resetToken = jwt.sign({ email: user.email }, 'edhf345h876hrh587i#@485&345&$(*&)4543jggekrer', { expiresIn: '5m' });

    // Send the email with the reset link
    const resetLink = `http://localhost:3001/resetpassword?token=${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link has been sent to your email." });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'edhf345h876hrh587i#@485&345&$(*&)4543jggekrer');
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password and update it
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Reset token has expired" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};