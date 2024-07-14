const librarian=require('../models/Admin');


exports.registeradmin = async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        let admin=await Admin.findOne({email});
        if(admin) {
            return res
                .status(400)
                .json({success:false, message:"User already exists"});
        }
        admin=await Admin.create({
            name,
            email,
            password,
            
        });

        res.status(201).json({
            success:true,
            admin,
        
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });

    }
};

exports.loginadmin=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const admin=await Admin.findOne({email}).select("+password");
        if(!admin){
            return res.status(400).json({
                success:false,
                message:"admin does not exist!!please register First!!",
            });
        }

        const ismatch=await user.matchPassword(password);

        if(!ismatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect password",
            });
        }
        const token=await admin.generateToken();
        const options={
            expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true
        };
        res.status(201)
           .cookie("token",token, options)
            .json({
            success:true,
            admin,
            token,
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
    });
    }

}

exports.Logoutadmin=async (req,res)=>{
    try{
    res.status(200).cookie("token","null",{
        expires:new Date(Date.now()),
        httpOnly:true,
    }).json({
        success:true,
        message:"Logged out successfully",
    });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }

}

exports.forgetPassword=async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }

        const resetPasswordToken=user.getResetPasswordToken();

        await user.save();

        const resetUrl=`${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`;

        const message=`reset your password by clicking on this link below: \n\n ${resetUrl}`;

        try{
            await sendEmail({
                email:user.email,
                subject:"Reset Password",
                message,
            });
            res.status(200).json({
                success:true,
                message:`email sent to ${user.email}`,
            })

        }catch(error){
              user.reserPasswordToken=undefined;
              user.resetPasswordExpire=undefined;
              await user.save();
              res.status(500).json({
                    success:false,
                    message:error.message
                });
        }


    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}