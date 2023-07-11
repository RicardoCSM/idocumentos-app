import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { name, email, document, category, subcategory, description } = body;

    const response = await axios.post("http://localhost:3001/documents", body);

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.error();
  }
}
