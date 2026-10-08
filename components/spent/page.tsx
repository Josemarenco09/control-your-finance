"use client"
import { useRef } from "react"
import style from "./Movement.module.css"

export default function MovementMoney() {
    const ref = useRef<HTMLDialogElement>(null)

    function handleClick() {
        ref.current?.showModal()
    }

    function handleClose() {
        ref.current?.close()
    }

    return (
        <>
            <div>
                <button className={style.addMovementButton} onClick={handleClick}> Presioname </button>
                    <div className={style.addMovement}>
                        <dialog className={style.dialogMovement} ref={ref}>
                            <div className={style.dialogContent}> 
                                <label> Detalla tu movimiento </label>
                                <select>
                                    <option> Que tipo fue </option>
                                    <option> Ingreso </option>
                                    <option> Gasto </option>
                                </select>
                                <input className={style.inputMovement} type="number" placeholder="Cantidad de ingreso o egreso"></input>
                                <select>
                                    <option className={style.optionSpentType}> Selecciona </option>
                                    <option className={style.optionSpentType}> Hogar </option>
                                    <option className={style.optionSpentType}> Merienda </option>
                                    <option className={style.optionSpentType}> Otro </option>
                                </select>
                                <button className={style.buttonCloseDialog} onClick={handleClose}> Cerrar </button>
                            </div>
                        </dialog>
                    </div>
            </div>
        </>
    )
}