import { useState } from "react"

const useCheckbox = (data = []) => {
    const [selectedValues, setSelectedValues] = useState([])
    const handleClickCheckAll = () => {
        if (selectedValues.length === data?.length) {
            setSelectedValues([])
        }
        else setSelectedValues(data?.map(document => document.id))
    }

    const handleClickCheckbox = (value) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues => selectedValues.filter(selectedValue => selectedValue !== value))
        }
        else setSelectedValues(selectedValues => [...selectedValues, value])
    }
    const handleClickCheckboxOnly = (value) => {
        if (selectedValues.includes(value)) {
            setSelectedValues([])
        }
        else setSelectedValues(value)
    }
    return {
        selectedValues,
        handleClickCheckAll,
        handleClickCheckboxOnly,
        handleClickCheckbox,
        checkAll: data?.length === selectedValues.length
    }
}


export default useCheckbox