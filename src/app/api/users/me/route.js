import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../utiles/mailer";
import { connect } from "../../../../db/dbConfig";
import User from "../../../../models/userModel";
import { getDatafromToken } from "../../../../utiles/getDatafromToken";
connect();

export async function POST(request) {

  const userId = await getDatafromToken(request);

  const user = await User.findOne({ _id: userId }).select("-password");

  return NextResponse.json({ message: "user found", data: user });
}
