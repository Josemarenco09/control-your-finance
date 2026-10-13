import type { Movement } from "@/app/generated/prisma/client"
import styles from "./CategorySummary.module.css"

// Formatea números como pesos colombianos: 15000 -> "$ 15.000"
const currency = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
})

export default function CategorySummary({ movements }: { movements: Movement[] }) {

    const expenseMovements = movements.filter(movement => movement.type === "EXPENSE")

    // 4.4 Retorno temprano: sin gastos no hay nada que agrupar ni porcentajes que calcular
    if (expenseMovements.length === 0) {
        return (
            <section className={styles.card}>
                <h2 className={styles.title}> Gastos por categoría </h2>
                <p className={styles.empty}> Todavía no hay gastos </p>
            </section>
        )
    }

    const totals = expenseMovements.reduce((acc, movement) => {
        const category = movement.category ?? "Otro"
        acc[category] = (acc[category] ?? 0) + movement.amount
        return acc
    }, {} as Record<string, number>)

    // 4.1 Total de todos los gastos: base para calcular los porcentajes
    const grandTotal = expenseMovements.reduce((sum, movement) => sum + movement.amount, 0)

    // 4.2 Objeto -> arreglo (para poder usar .map en el JSX) con el porcentaje de cada categoría
    const categories = Object.entries(totals).map(([category, total]) => ({
        category,
        total,
        percentage: Math.round(total / grandTotal * 100)
    }))

    // 4.3 De mayor a menor: primero la categoría en la que más se gasta
    categories.sort((a, b) => b.total - a.total)

    return (
        <section className={styles.card}>
            <h2 className={styles.title}> Gastos por categoría </h2>

            {/* 5. Una fila por categoría */}
            <ul className={styles.list}>
                {categories.map((item) => (
                    <li key={item.category} className={styles.item}>
                        <div className={styles.row}>
                            <span className={styles.name}> {item.category} </span>
                            <span className={styles.amount}> {currency.format(item.total)} </span>
                        </div>

                        {/* 6. La barra: el ancho de la parte de color es el porcentaje */}
                        <div className={styles.track}>
                            <div className={styles.fill} style={{ width: `${item.percentage}%` }}></div>
                        </div>

                        <span className={styles.percentage}> {item.percentage} % </span>
                    </li>
                ))}
            </ul>

            <p className={styles.total}>
                <span> Total gastado </span>
                <strong> {currency.format(grandTotal)} </strong>
            </p>
        </section>
    )
}
