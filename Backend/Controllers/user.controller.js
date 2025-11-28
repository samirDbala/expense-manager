import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';
import Budget from "../Models/budget.model.js";
import Expense from "../Models/expense.model.js";
import axios from 'axios'

const JWT_SECRET = process.env.JWT_SECRET

export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    return res.status(200).json({
      user: req.user   // send full user info
    });
    
  } catch (error) {
    return res.status(500).json({error: error });
  }
  
};

export const getUserDetails = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });
    const expenses = await Expense.find({userId: req.user.id})
    const user = req.user.username;
    return res.status(200).json({success: true, budgets, expenses, user});
  } catch (error) {
    return res.status(500).json({success: false, message: "Server error", error: error });
  }
}

export const handleRegistration = async (req, res) => {
    try{
      const salt = await bcrypt.genSalt()
      const {username, email, password} = req.body

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(200).json({ status: "failed", username, success:false, message: "Email already exits"});
      }

      const hashed_password = await bcrypt.hash(password, salt)
      const user = new User({email, username, password:hashed_password})
      await user.save();
      const token = jwt.sign({id: user._id, username}, JWT_SECRET, {expiresIn: '7d'})
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      })
      return res.status(201).json({ status: "success", code: 201, message: "User registered successfully", token: token, username: username});

    } catch (errors){
      console.error(errors);
      res.status(500).json({ status: "failed", code:500, message:"Internal server error", error:errors.message || "An unexpected error occurred"});
    }
}

export const handleLogin = async (req, res) => {
  try{
    const {email, password} = req.body
    const user = await User.findOne({email})
    

    if (!user) {
      return res.status(400).json({status:"Bad request", success:false, code:400, message:"User not found"})
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(401).json({status:"Invalid credentials", code:401, message:"You submitted wrong password", wrongPassword:true})

    } else{
      const loginToken = jwt.sign({id: user._id, username:user.username}, JWT_SECRET, {expiresIn: '1h'})
      res.cookie("token", loginToken, {
          withCredentials: true,
          httpOnly: false,
      });
      return res.status(201).json({username:user.username, token:loginToken, message:"Login complete"});
    }

  } catch (err){
    res.status(500).json({ message: 'Server error', err });
  }
}

export const handleGithubLogin = async (req, res) => {
  try{
    const {code} = req.body

    const tokenRes = await axios.post(`https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code
      },
      {
        headers: { Accept: "application/json" }
      }
    )


    const access_token = tokenRes.data.access_token;
    if (!access_token) {
      return res.status(400).json({
        success: false,
        message: "GitHub authentication failed"
      });
    }

    
    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${access_token}` }
    });
    const emailRes = await axios.get("https://api.github.com/user/emails", {
      headers: { Authorization: `token ${access_token}` }
    });

    const email = emailRes.data.find((e) => e.primary)?.email;
    const username = userRes.data.login;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Unable to retrieve GitHub email"
      });
    }


    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        username,
        email,
        password: "GITHUB_AUTH" // dummy password
      });
    }

    const appToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    return res.status(200).json({
      success: true,
      username: user.username,
      token: appToken,
      message: "Logged in with GitHub"
    })
    
  }catch (err){
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "GitHub login error"
    });
  }
}

export const handleGoogleLogin = async (req, res) => {
  try{
    const { access_token } = req.body;
    const googleUser = await axios.post(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
      {
        headers: { Accept: "application/json" }
      }
    )
    const { name, email} = googleUser.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username:name,
        email,
        password: "GOOGLE_AUTH" // dummy password
      });
    }

    const appToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      username: user.username,
      token: appToken,
      message: "Logged in with GitHub"
    })  
      
  }catch (err){
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "GitHub login error"
    });
  }
}

export const handleLogout = async (req, res) => {
  try{
    // For JWT, logout is typically handled on the client side by deleting the token.
    return res.status(200).json({ success: true, message: 'Logout successful' });
  }catch (err){
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export const handleAccountDelete = async (req, res) => {
  try{
    
    const userId = req.user.id;
    const budget = await Budget.deleteMany({userId})
    const expenses = await Expense.deleteMany({userId})

    if (!budget || !expenses) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully"
    });
  
  }catch (err){
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export const InputFieldChecking = async (req, res) =>{
  try {
    const user = req.body

    const isAvailable = await User.findOne({$or: [{ email:user.email }, { name:user.username }]})
    if (isAvailable) {
      return res.status(200).json({ available: false, isAvailable}); // 
} else {
      return res.status(200).json({ available: true, message:"Email is available (not taken)"});
}
  } catch (error) {
    res.status(500).json({ status:"failed", code:500, message: 'Server error', Error:error });
  }
}