import UserMoney from "@/components/counterMoney/page";
import MovementMoney from "@/components/spent/page";
import MovementTable from "@/components/movementTable/MovementTable";
import CategorySummary from "@/components/categorySummary/CategorySummary";
import { prisma } from "@/lib/prisma";
import style from "./page.module.css"

export default async function Home() {

  const movements = await prisma.movement.findMany({
    orderBy: { createdAt: "desc" }
  })

  // Si todavía no se ha asignado ninguna cantidad, la fila no existe y usamos 0
  const account = await prisma.account.findUnique({ where: { id: 1 } })
  const initialAmount = account?.initialAmount ?? 0

  // Solo enviamos al Client Component dos números, no la lista completa
  const totalIncome = movements
    .filter((movement) => movement.type === "INCOME")
    .reduce((sum, movement) => sum + movement.amount, 0)

  const totalExpense = movements
    .filter((movement) => movement.type === "EXPENSE")
    .reduce((sum, movement) => sum + movement.amount, 0)

  return (
    <main className={style.layout}>
      <div className={style.userMoney}>
        <UserMoney initialAmount={initialAmount} totalIncome={totalIncome} totalExpense={totalExpense}>
          <MovementMoney></MovementMoney>
        </UserMoney>
      </div>
      <div className={style.tableMovements}>
        <MovementTable movements={movements} />
      </div>
      <div className={style.extra}>
        <CategorySummary movements={movements} />
      </div>
    </main>
  );
}
