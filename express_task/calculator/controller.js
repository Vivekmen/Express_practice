exports.calcaulator=(req,res)=>{
    const {a,b,operatore}=req.query
    const num1=Number(a);
    const num2=Number(b)
    if(isNaN(num1) || isNaN(num2)) return res.status(400).send({Message:"Is Not a Number"})
    let result;
    switch (operatore) {
        case "add":
            result=num1+num2;
            console.log(result);
            break;
        case "sub":
            result=num1-num2;
            break;
        case "mul":
            result=num1*num2;
            break;
        case "div":
            if(num2==0) return res.status(400).send({Message:"Divison by zero is not allowed"})
            result=num1/num2;
            break;  
        default:
            break;
    }
 
    return res.status(200).json({Message:result})
}