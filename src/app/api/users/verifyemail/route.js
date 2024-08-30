import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";
import User from "../../../../models/userModel";


connect();

export async function POST(req, resp) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "invalid token" }, { status: 400 });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully",
      },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
