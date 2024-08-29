import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";


connect();

export async function POST() {
  try {
    const response = NextResponse.json({
      message: "LogOut Successfully",
      success: true,
    });
    response.cookies.set("token", "1d", {
      httpOnly: true,
      expires: new Date(0),
    });
    return  response
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
