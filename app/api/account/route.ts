import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// La app tiene una sola cuenta: siempre usamos la fila con este id
const ACCOUNT_ID = 1

export async function PUT(request: Request) {
    let body
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: "El cuerpo debe ser JSON válido" }, { status: 400 })
    }

    const amount = Number(body?.initialAmount)

    // A diferencia de un movimiento, aquí 0 sí es válido: se puede empezar sin dinero
    if (body?.initialAmount === "" || !Number.isInteger(amount) || amount < 0) {
        return NextResponse.json({ error: "La cantidad debe ser un número entero mayor o igual a 0" }, { status: 400 })
    }

    try {
        // upsert: la primera vez crea la fila, las siguientes la actualiza
        const account = await prisma.account.upsert({
            where: { id: ACCOUNT_ID },
            update: { initialAmount: amount },
            create: { id: ACCOUNT_ID, initialAmount: amount }
        })
        return NextResponse.json({ account })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "No se pudo guardar la cantidad" }, { status: 500 })
    }
}
