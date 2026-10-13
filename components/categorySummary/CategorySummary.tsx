import type {Movement} from "@/app/generated/prisma/client"

export default function CategorySummary({ movements }: { movements: Movement[] }) {

    const expenseMovements = movements.filter(movement => movement.type === "EXPENSE")

    return (
        <section>
            <h2> Gastos por categoría </h2>
            <p> Gastos totales: {expenseMovements.length} </p>
        </section>
    )
}