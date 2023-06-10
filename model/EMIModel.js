const mongoose = require("mongoose");

const EmiSchema = mongoose.Schema(
    {
        loan:{type:Number,required:true},
        rate:{type:Number,required:true},
        tenure:{type:Number,required:true},
        emi:{type:Number},
        interest:{type:Number},
        payment:{type:Number}
    },{
        versionKey:false
    }
)

const EmiModel = mongoose.model("emi",EmiSchema)

module.exports={EmiModel}