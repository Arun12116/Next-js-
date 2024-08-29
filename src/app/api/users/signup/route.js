

import {NextResponse } from "next/server";
import { sendEmail } from "../../../../utiles/mailer";
import { connect } from "../../../../db/dbConfig";
import User from "../../../../models/userModel";
import bcryptjs from "bcryptjs";

await connect();

export async function POST(req, resp) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    console.log("Received data:", reqBody);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send a verification email
    await sendEmail({ email, emailType: "VERIFY", userID: savedUser._id });

    // Respond with success
    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      user: savedUser,
    });

  } catch (error) {
    console.error("Error during registration:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
