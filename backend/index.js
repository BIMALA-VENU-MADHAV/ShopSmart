require("dotenv").config();

const express=require("express");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const cors=require("cors");
const bcrypt=require("bcrypt");
const Razorpay=require("razorpay");
const cloudinary=require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary");

const app=express();
const port=process.env.PORT || 4000;

/* MIDDLEWARE */
app.use(express.json());

app.use(cors({
  origin:[
    "http://localhost:5173",
    "http://localhost:5174",
    "https://shopsmart-admin-woad.vercel.app",
  ],
  credentials:true,
}));

/* MONGODB */
mongoose.set("strictQuery",false);

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("✅ MongoDB Connected"))
.catch((err)=>{
  console.log("❌ MongoDB Error");
  console.log(err);
});

/* HOME */
app.get("/",(req,res)=>{
  res.send("🚀 ShopSmart Backend Running");
});

/* CLOUDINARY */
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});

/* MULTER STORAGE */
const storage=new CloudinaryStorage({
  cloudinary,
  params:{
    folder:"shopsmart_products",
    allowed_formats:["jpg","jpeg","png","webp"],
  },
});

const upload=multer({storage});

/* IMAGE UPLOAD */
app.post("/upload",upload.single("product"),async(req,res)=>{

  try{

    res.json({
      success:true,
      image_url:req.file.path,
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Image Upload Failed",
    });
  }
});

/* PRODUCT MODEL */
const Product=mongoose.model("Product",{
  id:{
    type:Number,
    required:true,
  },

  name:{
    type:String,
    required:true,
  },

  image:{
    type:String,
    required:true,
  },

  category:{
    type:String,
    required:true,
  },

  new_price:{
    type:Number,
    required:true,
  },

  old_price:{
    type:Number,
    required:true,
  },

  available:{
    type:Boolean,
    default:true,
  },

  date:{
    type:Date,
    default:Date.now,
  },
});

/* USER MODEL */
const User=mongoose.model("User",{

  name:{
    type:String,
  },

  email:{
    type:String,
    unique:true,
  },

  password:{
    type:String,
  },

  cartData:{
    type:Object,
  },

  date:{
    type:Date,
    default:Date.now,
  },
});

/* ADD PRODUCT */
app.post("/addproduct",async(req,res)=>{

  try{

    const products=await Product.find({});

    let id;

    if(products.length>0){

      let last_product=products[products.length-1];

      id=last_product.id+1;

    }
    else{

      id=1;
    }

    const product=new Product({

      id:id,

      name:req.body.name,

      image:req.body.image,

      category:req.body.category,

      new_price:req.body.new_price,

      old_price:req.body.old_price,
    });

    await product.save();

    res.json({
      success:true,
      message:"Product Added",
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Add Product Failed",
    });
  }
});

/* REMOVE PRODUCT */
app.post("/removeproduct",async(req,res)=>{

  try{

    await Product.findOneAndDelete({
      id:req.body.id,
    });

    res.json({
      success:true,
      message:"Product Removed",
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Remove Failed",
    });
  }
});

/* ALL PRODUCTS */
app.get("/allproducts",async(req,res)=>{

  try{

    const products=await Product.find({});

    res.json(products);

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Fetch Failed",
    });
  }
});

/* NEW COLLECTIONS */
app.get("/newcollections",async(req,res)=>{

  try{

    const products=await Product.find({});

    const newcollection=products.slice(-8);

    res.json(newcollection);

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Fetch Failed",
    });
  }
});

/* POPULAR PRODUCTS */
app.get("/popularproducts",async(req,res)=>{

  try{

    const products=await Product.find({
      category:"dairy",
    });

    const popularproducts=products.slice(0,4);

    res.json(popularproducts);

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Fetch Failed",
    });
  }
});

/* SIGNUP */
app.post("/signup",async(req,res)=>{

  try{

    const check=await User.findOne({
      email:req.body.email,
    });

    if(check){

      return res.status(400).json({
        success:false,
        errors:"User already exists",
      });
    }

    let cart={};

    for(let i=0;i<300;i++){

      cart[i]=0;
    }

    const hashedPassword=await bcrypt.hash(req.body.password,10);

    const user=new User({

      name:req.body.username,

      email:req.body.email,

      password:hashedPassword,

      cartData:cart,
    });

    await user.save();

    const data={
      user:{
        id:user.id,
      },
    };

    const token=jwt.sign(data,process.env.JWT_SECRET);

    res.json({
      success:true,
      token,
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Signup Failed",
    });
  }
});

/* LOGIN */
app.post("/login",async(req,res)=>{

  try{

    const user=await User.findOne({
      email:req.body.email,
    });

    if(!user){

      return res.status(401).json({
        success:false,
        errors:"Wrong Email",
      });
    }

    const passCompare=await bcrypt.compare(
      req.body.password,
      user.password
    );

    if(!passCompare){

      return res.status(401).json({
        success:false,
        errors:"Wrong Password",
      });
    }

    const data={
      user:{
        id:user.id,
      },
    };

    const token=jwt.sign(data,process.env.JWT_SECRET);

    res.json({
      success:true,
      token,
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Login Failed",
    });
  }
});

/* AUTH */
const fetchUser=async(req,res,next)=>{

  const token=req.header("auth-token");

  if(!token){

    return res.status(401).json({
      errors:"Please Login",
    });
  }

  try{

    const data=jwt.verify(token,process.env.JWT_SECRET);

    req.user=data.user;

    next();

  }
  catch(error){

    res.status(401).json({
      errors:"Invalid Token",
    });
  }
};

/* ADD TO CART */
app.post("/addtocart",fetchUser,async(req,res)=>{

  try{

    const userData=await User.findOne({
      _id:req.user.id,
    });

    userData.cartData[req.body.itemId]+=1;

    await User.findByIdAndUpdate(req.user.id,{
      cartData:userData.cartData,
    });

    res.json({
      success:true,
      message:"Added To Cart",
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Cart Failed",
    });
  }
});

/* REMOVE FROM CART */
app.post("/removefromcart",fetchUser,async(req,res)=>{

  try{

    const userData=await User.findOne({
      _id:req.user.id,
    });

    if(userData.cartData[req.body.itemId]>0){

      userData.cartData[req.body.itemId]-=1;
    }

    await User.findByIdAndUpdate(req.user.id,{
      cartData:userData.cartData,
    });

    res.json({
      success:true,
      message:"Removed From Cart",
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Remove Failed",
    });
  }
});

/* GET CART */
app.post("/getcart",fetchUser,async(req,res)=>{

  try{

    const userData=await User.findOne({
      _id:req.user.id,
    });

    res.json(userData.cartData);

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Cart Fetch Failed",
    });
  }
});

/* RAZORPAY */
const razorpayInstance=new Razorpay({

  key_id:process.env.RAZORPAY_KEY_ID,

  key_secret:process.env.RAZORPAY_KEY_SECRET,
});

/* CREATE ORDER */
app.post("/createOrder",async(req,res)=>{

  try{

    const options={

      amount:req.body.amount*100,

      currency:"INR",

      receipt:`receipt_${Date.now()}`,
    };

    const order=await razorpayInstance.orders.create(options);

    res.json({
      success:true,
      order,
      key:process.env.RAZORPAY_KEY_ID,
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Payment Failed",
    });
  }
});

/* SERVER */
app.listen(port,(error)=>{

  if(!error){

    console.log(`🚀 Server Running On Port ${port}`);
  }
  else{

    console.log(error);
  }
});