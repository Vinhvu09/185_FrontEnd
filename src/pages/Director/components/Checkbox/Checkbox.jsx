import { useState } from "react"
import "./Checkbox.scss"
export default function Checkbox({ name = "", value = "", selectedValues, handleClickCheckbox, checkAll = false }) {
    let checked = false

    if (checkAll) {
        checked = checkAll
    }
    else checked = selectedValues?.includes(value) ? 1 : 0
    return (
        <div className="checkbox">
            <input
                type="checkbox"
                className="checkboxTypeSchedule"
                onClick={() => handleClickCheckbox(value)}
                checked={checked}
                onChange={() => null}
            />
            <span className="checkmark" id="checkmark"></span>

            <span className="text">{name}</span>
        </div>
    )
}
