import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
    params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: Params) {
    // params es una promesa: hay que esperarla para obtener el id
    const { id } = await params

    // El id llega como texto desde la URL ("5"), pero en la base de datos es Int
    const movementId = Number(id)
    if (!Number.isInteger(movementId) || movementId <= 0) {
        return NextResponse.json(
            { error: "El id debe ser un número entero mayor que 0" },
            { status: 400 }
        )
    }

    const movement = await prisma.movement.findUnique({
        where: { id: movementId }
    })

    // findUnique devuelve null si no existe ningún movimiento con ese id
    if (!movement) {
        return NextResponse.json(
            { error: "No existe un movimiento con ese id" },
            { status: 404 }
        )
    }

    return NextResponse.json({ movement: movement })
}

export function PUT(){
    return NextResponse.json({
        message: "Updating your movement"
    })
}

export function DELETE(){
    return NextResponse.json({
        message: "Deleting your movement"
    })
}