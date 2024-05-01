const fs=require("fs")
exports.getdata=(req,res)=>{
    const userdata=req.userdata;
    console.log(userdata);
    const page = parseInt(req.query.page);
    const pagelimit = parseInt(req.query.pagelimit);
    const startIndex = (page - 1) * pagelimit;
    const endIndex = page * pagelimit;

    const paginateuser = userdata.slice(startIndex, endIndex);
    return res.status(200).json({page : page,pagelimit:pagelimit,paginateuser})

}