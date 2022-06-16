var express = require('express');
var router = express.Router();


let userData = {

}

let userIdRoute = '/:userId'
checkUserId = (userId)=>{
    userId = parseInt(userId)
    if (!userId){
        return false;
    }
    return userId

}
router.get('/',(req,res)=>{
    res.send('follow')
})
router.get (userIdRoute,(req, res,next)=>{
    let userId = checkUserId (req.params.userId)
    if (!userId){
        res.json(
            {
                resultCode: 1,
                messages: ['userId not a number'],
                data: {userId:req.params.userId}
            }
        )
        
    }else{
        if (!(userId in userData)){
                userData[userId] = {follow:false}
            }
        res.send (userData[userId].follow)
    }
})


router.post (userIdRoute,(req,res)=>{
    let userId = checkUserId (req.params.userId)
    if (!userId){
        res.json(
            {
                resultCode: 1,
                messages: ['userId not a number'],
                data: {userId:req.params.userId}
            }
        )
    }
    else{
        if (!(userId in userData)){
        userData[userId] = {}
        }
        userData[userId] = {follow:true}
        let resData = {
            resultCode: 0,
            messages: ['ok'],
            data: {[userId]:userData[userId].follow}
        }
        //console.log (JSON.stringify(resData))
        res.json (resData)

    }
    } 

)


router.delete (userIdRoute,(req,res)=>{
    let userId = checkUserId (req.params.userId)
    if (!userId){
        res.json(
            {
                resultCode: 1,
                messages: ['userId not a number'],
                data: {userID:req.params.userId}
            }
        )
    }else{
        if (!(userId in userData)){
                userData[userId] = {follow:false}
            }
        userData[userId] = {follow:false}
        let resData = {
            resultCode: 0,
            messages: ['ok'],
            data: {[userId]:userData[userId].follow}
        }
        
        res.json (resData)
    } 
})







module.exports = router;