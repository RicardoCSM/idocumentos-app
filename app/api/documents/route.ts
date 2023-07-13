import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { name, email, document, category, subcategory, description } = body;

    const created_at = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const updated_at = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    const status = 0;

    let admin = "";
    switch (body.category) {
      case 1:
        admin = "Administrador para nomes";
        break;
      case 2:
        admin = "Administrador para cursos";
        break;
      case 3:
        admin = "Administrador para disciplinas";
        break;
      case 4:
        admin = "Administrador Master";
        break;
    }

    const response = await axios.post("http://localhost:3001/documents", {
      ...body,
      created_at,
      updated_at,
      status,
      admin
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.error();
  }
}