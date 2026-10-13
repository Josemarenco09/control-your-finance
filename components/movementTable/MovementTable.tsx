import type { Movement } from "@/app/generated/prisma/client"
import styles from "./MovementTable.module.css"

// Formatea números como pesos colombianos: 15000 -> "$ 15.000"
const currency = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
})

export default function MovementTable({ movements }: { movements: Movement[] }) {
    if (movements.length === 0) {
        return <p className={styles.empty}> Todavía no hay movimientos </p>
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th> Fecha </th>
                    <th> Tipo </th>
                    <th> Categoría </th>
                    <th className={styles.amountCell}> Monto </th>
                </tr>
            </thead>
            <tbody>
                {movements.map((movement) => (
                    <tr key={movement.id}>
                        <td> {movement.createdAt.toLocaleDateString("es-CO")} </td>
                        <td> {movement.type === "INCOME" ? "Ingreso" : "Gasto"} </td>
                        <td> {movement.category ?? "—"} </td>
                        <td className={`${styles.amountCell} ${movement.type === "INCOME" ? styles.income : styles.expense}`}>
                            {movement.type === "INCOME" ? "+" : "-"} {currency.format(movement.amount)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
