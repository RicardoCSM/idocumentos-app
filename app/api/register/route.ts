import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import axios from "axios";

const isEmailAlreadyUsed = async (email: string) => {
  const response = await axios.get(`http://localhost:3001/users?email=${email}`);
  const existingUser = response.data;
  return existingUser.length > 0;
};

const isAdminIdAlreadyUsed = async (admin_id: string) => {
  const response = await axios.get(`http://localhost:3001/users?admin_id=${admin_id}`);
  const existingUser = response.data;
  return existingUser.length > 0;
};

const isUsernameAlreadyUsed = async (username: string) => {
  const response = await axios.get(`http://localhost:3001/users?username=${username}`);
  const existingUser = response.data;
  return existingUser.length > 0;
};

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { email, admin_id, username, password } = body;
    
    const isEmailUsed = await isEmailAlreadyUsed(email);
    if (isEmailUsed) {
      return NextResponse.json(
        { error: "Email já está em uso" },
        { status: 400 }
      );
    }

    const isAdminIdUsed = await isAdminIdAlreadyUsed(admin_id);
    if (isAdminIdUsed) {
      return NextResponse.json(
        { error: "Esse administrador já foi cadastrado" },
        { status: 400 }
      );
    }

    const isUsernameUsed = await isUsernameAlreadyUsed(username);
    if (isUsernameUsed) {
      return NextResponse.json({ error: "Esse nome de usuário já está em uso" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const response = await axios.post("http://localhost:3001/users", {
      email,
      admin_id,
      username,
      hashedPassword,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.error();
  }
}
