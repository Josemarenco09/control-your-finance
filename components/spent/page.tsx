"use client"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import style from "./Movement.module.css"

export default function MovementMoney() {
    const ref = useRef<HTMLDialogElement>(null)
    const router = useRouter()

    const [typeMovement, setTypeMovement] = useState("")
    const [amount, setAmount] = useState("")
    const [whyMovement, setWhyMovement] = useState("")
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

    // El botón Guardar solo se activa cuando están los datos necesarios
    const isValid =
        typeMovement !== "" &&
        Number(amount) > 0 &&
        (typeMovement === "INCOME" || whyMovement !== "")

    function handleClick() {
        // show() lo abre sin ser modal: se queda dentro de su columna
        ref.current?.show()
    }

    function handleClose() {
        ref.current?.close()
        resetForm()
    }

    function resetForm() {
        setTypeMovement("")
        setAmount("")
        setWhyMovement("")
        setError("")
    }

    async function handleSave() {
        setSaving(true)
        setError("")

        const response = await fetch("/api/movement", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                typeMovement: typeMovement,
                amount: Number(amount),
                whyMovement: whyMovement
            })
        })

        setSaving(false)

        // Si la API responde 400 o 500, mostramos su mensaje al usuario
        if (!response.ok) {
            const data = await response.json()
            setError(data.error ?? "Ocurrió un error")
            return
        }

        resetForm()
        handleClose()

        // Vuelve a ejecutar los Server Components (page.tsx) para que la tabla
        // lea de nuevo los movimientos, sin recargar toda la página
        router.refresh()
    }

    return (
        <>
            <div>
                <button className={style.addMovementButton} onClick={handleClick}> Agregar movimiento</button>
                    <div className={style.addMovement}>
                        <dialog className={style.dialogMovement} ref={ref} onClose={resetForm}>
                            <div className={style.dialogContent}>
                                <label htmlFor="typeMovement"> Detalla tu movimiento </label>
                                <select id="typeMovement" value={typeMovement} onChange={(e) => setTypeMovement(e.target.value)}>
                                    <option value="" disabled> Que tipo fue </option>
                                    <option value="INCOME"> Ingreso </option>
                                    <option value="EXPENSE"> Gasto </option>
                                </select>
                                <input
                                    className={style.inputMovement}
                                    type="number"
                                    min="1"
                                    step="1"
                                    placeholder="Cantidad de ingreso o egreso"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                ></input>
                                {typeMovement === "EXPENSE" && (
                                    <select className={style.select} value={whyMovement} onChange={(e) => setWhyMovement(e.target.value)}>
                                        <option className={style.optionSpentType} value="" disabled> Selecciona </option>
                                        <option className={style.optionSpentType} value="Hogar"> Hogar </option>
                                        <option className={style.optionSpentType} value="Trabajo"> Trabajo </option>
                                        <option className={style.optionSpentType} value="Merienda"> Merienda </option>
                                        <option className={style.optionSpentType} value="Otro"> Otro </option>
                                    </select>
                                )}
                                {error && <p className={style.errorMessage}> {error} </p>}
                                <button className={style.addMovementButton} onClick={handleSave} disabled={!isValid || saving}>
                                    {saving ? "Guardando..." : "Guardar"}
                                </button>
                                <button className={style.buttonCloseDialog} onClick={handleClose}> Cerrar </button>
                            </div>
                        </dialog>
                    </div>
            </div>
        </>
    )
}