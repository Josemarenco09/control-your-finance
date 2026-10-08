"use client"
import { useState } from "react";
import styles from "./CounterMoney.module.css";



export default function UserMoney({children}: {children: React.ReactNode}){

    const [userMoney, setUserMoney] = useState(0)
    const [showMoney, setShowMoney] = useState(0)

    function submitMoney() {
        setShowMoney(userMoney)
        console.log(showMoney)
    }
    
    return (
        <>
            <div className={styles.card}>
                <h1 className={styles.amount}> {showMoney} </h1>
                    <section className={styles.form}>
                        <input type="number" className={styles.input} placeholder="Cantidad de dinero actual" value={userMoney} onChange={(e) => setUserMoney(Number(e.target.value))}></input>
                        <button className={styles.button} type="submit" onClick={submitMoney}> Asignar mi cantidad </button>
                    </section> 
                    {children}
            </div>
        </>
    )
}