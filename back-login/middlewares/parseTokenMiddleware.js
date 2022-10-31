function verifyToken(req,res,next){

    const bearerHeader = req.headers['Authorization']
    console.log('Bearer Header',bearerHeader)
    if(typeof bearerHeader != undefined){
        const bearer = bearerHeader.split(' ')
        console.log('Bearer',bearer)
        const bearerToken = bearer[1]
        console.log('Bearer Token',bearerToken)
        req.token = bearerToken
        console.log('Request Token Set')

        next()

    }
    else{
        res.status(403).send("An Error Occured")
    }

}

module.exports = verifyToken;