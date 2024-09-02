import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const getDatafromToken = (request) => {

    // console.log("token",request);
    
  try {
    const token = request.cookies.get("token")?.value || "";
    const deCodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return deCodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
