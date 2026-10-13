import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MOVEMENT_TYPES = ["INCOME", "EXPENSE"]
const EXPENSE_CATEGORIES = ["Hogar", "Merienda", "Otro"]

export async function GET() {
    const movements = await prisma.movement.findMany({
        orderBy: { createdAt: "desc" }
    })
    return NextResponse.json({
        movements: movements
    })
}

export async function POST(request: Request) {
    // 1. Leer el body: si no es JSON válido, el error es de quien envía (400)
    let body
    try {
        body = await request.json()
    } catch {
        return NextResponse.json(
            { error: "El cuerpo de la petición debe ser un JSON válido" },
            { status: 400 }
        )
    }

    const { typeMovement, amount, whyMovement } = body ?? {}

    // 2. Validar cada campo antes de tocar la base de datos
    if (!MOVEMENT_TYPES.includes(typeMovement)) {
        return NextResponse.json(
            { error: "typeMovement debe ser INCOME o EXPENSE" },
            { status: 400 }
        )
    }

    // 3. Convertir el monto: puede llegar como texto ("15000") desde un input
    const amountNumber = Number(amount)
    if (amount === "" || !Number.isInteger(amountNumber) || amountNumber <= 0) {
        return NextResponse.json(
            { error: "amount debe ser un número entero mayor que 0" },
            { status: 400 }
        )
    }

    if (typeMovement === "EXPENSE" && !EXPENSE_CATEGORIES.includes(whyMovement)) {
        return NextResponse.json(
            { error: "whyMovement debe ser Hogar, Merienda u Otro" },
            { status: 400 }
        )
    }

    // 4. Guardar. El catch queda solo para fallos inesperados del servidor
    try {
        const newMovement = await prisma.movement.create({
            data: {
                type: typeMovement,
                amount: amountNumber,
                category: typeMovement === "EXPENSE" ? whyMovement : null
            }
        })

        return NextResponse.json(
            { movement: newMovement },
            { status: 201 }
        )
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { error: "No se pudo guardar el movimiento" },
            { status: 500 }
        )
    }
}
