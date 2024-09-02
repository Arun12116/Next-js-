import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";
import User from "../../../../models/userModel";

import { writeFile } from "fs/promises";

connect();

export const POST = async (req) => {
  try {
    const data = await req.formData();
    const file = data.get("file");
    if (!file) {
      return NextResponse.json({ message: "no image found", success: false });
    }
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./public/${file.name}`;
    await writeFile(path, buffer);
    return NextResponse.json({ message: "image upload sucessfully " });
  } catch (error) {
    console.error("Error uploading image:", error.message);
    return NextResponse.json(
      { message: "Error uploading image", success: false },
      { status: 500 }
    );
  }
};
