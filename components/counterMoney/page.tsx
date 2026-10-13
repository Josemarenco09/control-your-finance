"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CounterMoney.module.css";



// Formatea números como pesos colombianos: 15000 -> "$ 15.000"
const currency = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
})

interface UserMoneyProps {
    children: React.ReactNode
    initialAmount: number
    totalIncome: number
    totalExpense: number
}

export default function UserMoney({ children, initialAmount, totalIncome, totalExpense }: UserMoneyProps){

    const router = useRouter()

    // Texto, no número: así el input puede empezar vacío ("") en vez de con 0
    const [userMoney, setUserMoney] = useState("")
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

    // Se calcula en cada render: no necesita su propio useState
    const balance = initialAmount + totalIncome - totalExpense

    async function submitMoney() {
        setSaving(true)
        setError("")

        // Guardamos en la base de datos en vez de en useState, para que no se pierda al recargar
        const response = await fetch("/api/account", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ initialAmount: Number(userMoney) })
        })

        setSaving(false)

        if (!response.ok) {
            const data = await response.json()
            setError(data.error ?? "Ocurrió un error")
            return
        }

        setUserMoney("")

        // Vuelve a ejecutar page.tsx, que lee la cantidad nueva y la pasa como prop
        router.refresh()
    }
    
    return (
        <>
            <div className={styles.card}>
                <h1 className={styles.amount}> {currency.format(initialAmount)} </h1>
                    <section className={styles.form}>
                        <input type="number" className={styles.input} placeholder="Cantidad de dinero actual" value={userMoney} onChange={(e) => setUserMoney(e.target.value)}></input>
                        <button className={styles.button} type="submit" onClick={submitMoney} disabled={userMoney === "" || saving}>
                            {saving ? "Guardando..." : "Asignar mi cantidad"}
                        </button>
                        {error && <p className={styles.errorMessage}> {error} </p>}
                    </section> 
                    {children}
                    <section className={styles.balance}>
                        <p className={styles.balanceLabel}> Dinero actual </p>
                        <p className={`${styles.balanceAmount} ${balance < 0 ? styles.negative : ""}`}>
                            {currency.format(balance)}
                        </p>
                        <p className={styles.balanceDetail}>
                            <span className={styles.income}> + {currency.format(totalIncome)} </span>
                            <span className={styles.expense}> − {currency.format(totalExpense)} </span>
                        </p>
                    </section>
            </div>
        </>
    )
}