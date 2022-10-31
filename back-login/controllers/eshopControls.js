const Product = require("../models/schemaEshop");
const User = require("../models/schema");
const messageError = require("../tools/messageError");
const jwt = require("jsonwebtoken");

exports.getProductData = async(req,res,next) => {
    try {
        //find all products in database
        const productsData = await Product.find({})
        console.log("products data :",productsData)
        res.status(200).json(productsData)
        
    } catch (error) {
        console.log(error)
        next(new messageError("Fail Fetching products", 400));
        
    }
}

exports.setFavorite = async (req,res,next) => {
    try {
        const body = req.body 
        const productId= body.id
        console.log("Product Id",productId);
        const token  = body.token;
        console.log("Token",token);
        if (!token) return next(new messageError("Provide a token", 400));
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED JWT :",decoded)
        console.log("DECODED id :",decoded.id)
        const userDoc = await User.findOne({ _id: decoded.id })
        if(!(userDoc.favorites.includes(productId))){
            await User.findOneAndUpdate({ _id: decoded.id }, 
                { $push: { favorites: productId  } },);
            
            console.log("Database Updated Fav");
            res.status(200).json({success : true})
        }
        else{
            console.log("Favorite already exists in database");
            res.status(200).json({success : false})

        }
        
        
        
        
    } catch (error) {
        console.log(error)
        next(new messageError("Failed Favorite Action", 400));
        
    }
}

exports.fetchFavorites = async(req,res,next) => {
    try {
        const token = req.body.token
        if (!token) return next(new messageError("Provide a token", 400));
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED JWT Fetch :",decoded)
        const user = await User.findOne({ _id: decoded.id })
        console.log(user)
        const userArrayFav = user.favorites
        console.log(userArrayFav)
        const favProductDocs = []
        for(i=0;i<userArrayFav.length;i++){
            console.log(userArrayFav[i])
            const productDoc = await Product.findOne({ _id: userArrayFav[i] })
            console.log(productDoc)
            if(productDoc){
                favProductDocs.push({productDoc})
            }
        }
        console.log("product Array Returned",favProductDocs)
        res.status(200).send(favProductDocs)

        
    } catch (error) {
        console.log(error)
        next(new messageError("Failed Fetch Favorite ", 400));

    }
}

exports.deleteFav = async (req, res, next) => {
    try {
        const token = req.body.token
        const productId = req.body.id
        if (!token) return next(new messageError("Provide a token", 400));
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED JWT Fetch :",decoded)
        const user = await User.findOne({ _id: decoded.id })
        console.log(user)
        const userArrayFav = user.favorites
        console.log("Fav Array",userArrayFav)
        const bool = userArrayFav.includes(productId)
        console.log("Includes or not",bool)
        if(userArrayFav.includes(productId)){
            const index = userArrayFav.indexOf(productId);
            if (index > -1) { // only splice array when item is found
                userArrayFav.splice(index, 1); // 2nd parameter means remove one item only
            }
            user.favorites = userArrayFav
            console.log(userArrayFav)
            user.save()
            res.status(200).json({successDelete : true})

        }
        else{
            res.status(400).json({
                successDelete: false,
            })
        }
    } catch (error) {
        next(new messageError("Failed Delete Favorite ", 400));
    }
}