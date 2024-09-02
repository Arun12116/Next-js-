import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";
import User from "../../../../models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();



export async function POST(req, resp) {
  try {
    const { email, password } = await req.json();

    console.log("Login data received:", { email });

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the user's email is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { message: "User not verified" },
        { status: 400 }
      );
    }

    // Validate the provided password against the stored hashed password
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Generate JWT token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Set the token in an HTTP-only cookie
    const response = NextResponse.json({
      token:token,
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
