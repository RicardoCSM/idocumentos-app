import { NextRequest, NextResponse } from "next/server";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const f = formData.get("file");

    if (!f) {
        return NextResponse.json({}, { status: 400 });
    }

    const file = f as File;

    if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "O arquivo é muito grande (máximo de 10 MB)" },
          { status: 400 }
        );
    }
    
    const allowedExtensions = ["pdf", "rtf"];
    const fileExtension = file.name.split(".").pop() as string;
    if (!allowedExtensions.includes(fileExtension)) {
        return NextResponse.json(
          { error: "A extensão do arquivo deve ser .pdf ou .rtf" },
          { status: 400 }
        );
    }

    const destinationDirPath = path.join(process.cwd(), "upload/");
    const fileArrayBuffer = await file.arrayBuffer();

    if (!existsSync(destinationDirPath)) {
        fs.mkdir(destinationDirPath, { recursive: true });
    }

    const fileName = file.name;
    const filePath = path.join(destinationDirPath, fileName);

    await fs.writeFile(filePath, Buffer.from(fileArrayBuffer));

    const relativeFilePath = path.relative(process.cwd(), filePath);

    return NextResponse.json({
        fileName,
        filePath: relativeFilePath,
        size: file.size,
        lastModified: new Date(file.lastModified),
    });
}