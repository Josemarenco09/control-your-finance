"use client"
import { useState } from "react";
import styles from "./CounterMoney.module.css";



// Formatea números como pesos colombianos: 15000 -> "$ 15.000"
const currency = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
})

interface UserMoneyProps {
    children: React.ReactNode
    totalIncome: number
    totalExpense: number
}

export default function UserMoney({ children, totalIncome, totalExpense }: UserMoneyProps){

    // Texto, no número: así el input puede empezar vacío ("") en vez de con 0
    const [userMoney, setUserMoney] = useState("")
    const [showMoney, setShowMoney] = useState(0)

    // Se calcula en cada render: no necesita su propio useState
    const balance = showMoney + totalIncome - totalExpense

    function submitMoney() {
        // Convertimos a número solo al momento de usarlo
        setShowMoney(Number(userMoney))
        setUserMoney("")
    }
    
    return (
        <>
            <div className={styles.card}>
                <h1 className={styles.amount}> {showMoney} </h1>
                    <section className={styles.form}>
                        <input type="number" className={styles.input} placeholder="Cantidad de dinero actual" value={userMoney} onChange={(e) => setUserMoney(e.target.value)}></input>
                        <button className={styles.button} type="submit" onClick={submitMoney}> Asignar mi cantidad </button>
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