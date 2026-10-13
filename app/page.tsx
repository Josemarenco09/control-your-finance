import UserMoney from "@/components/counterMoney/page";
import MovementMoney from "@/components/spent/page";
import MovementTable from "@/components/movementTable/MovementTable";
import { prisma } from "@/lib/prisma";
import style from "./page.module.css"

export default async function Home() {
  // page.tsx es un Server Component: puede leer la base de datos directamente
  const movements = await prisma.movement.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <main className={style.layout}>
      <div className={style.userMoney}>
        <UserMoney>
          <MovementMoney></MovementMoney>
        </UserMoney>
      </div>
      <div className={style.tableMovements}>
        <MovementTable movements={movements} />
      </div>
      <div className={style.extra}>

      </div>
    </main>
  );
}
