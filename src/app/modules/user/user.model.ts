import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const UserSchema = new Schema<TUser>(
    {
        id:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        needPasswordChange:{
            type:Boolean,
            default:true
        },
        role:{
            type:String,
            enum:["admin","student","faculty"]
        },
        status:{
            type:String,
            enum:["in-progress","blocked"],
            default:'in-progress'
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true
    }
)

// **creating mongoose middleware
// pre hook / middleware
UserSchema.pre('save', async function(next){
    console.log(this, 'pre hook: we will save data');
    // **hashing password and save into DB */
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
    next();
  
  }
  )
  
  //post middleware / hook
  
  UserSchema.post('save',function(doc, next){
    doc.password = '';
    // console.log(this, 'post hook: we saved our data');
    next()
  })

export const User = model<TUser>('User',UserSchema);