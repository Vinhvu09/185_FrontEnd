import "./ImageReview.scss"
import WordImage from "../../../../assets/imgs/word_file.png"
import AttachIcon from "../../../../assets/svg/attach_icon.svg"
import { useState } from "react"
import Checkbox from "../../../../pages/Director/components/Checkbox/Checkbox"
import useCheckbox from "../../../../hooks/useCheckbox"
import SignatureImage1 from "../../../../assets/imgs/signature1.png"
import SignatureImage2 from "../../../../assets/imgs/signature2.png"
import SignatureImage3 from "../../../../assets/imgs/signature3.png"
import Stamp from '../../../../assets/imgs/stamp2.png'
import SignatureAndStampImage from "../../../../assets/imgs/signature_and_stamp.png"
import { v4 as uuidv4 } from "uuid"
import { useRef } from "react"
const arrayImage = [SignatureImage1, SignatureImage2, SignatureImage3]
export default function ImageReview() {
    const [num, setNum] = useState(1)
    const { selectedValues, handleClickCheckbox } = useCheckbox()
    const [inserted, setInserted] = useState(false)
    const [openInsertSignatureAndStamp, setOpenInsertSignatureAndStamp] = useState(false)
    const insertSignatureAndStampRef = useRef()
    window.addEventListener("click", (e) => {
        if (insertSignatureAndStampRef?.current && !insertSignatureAndStampRef?.current.contains(e.target)) {
            setOpenInsertSignatureAndStamp(false)
        }
    })
    const handleClickOpenInsertSignatureAndStamp = (e) => {
        e.stopPropagation()
        setOpenInsertSignatureAndStamp(true)
    }
    const handleClickSignatureOrStamp = () => {
        setOpenInsertSignatureAndStamp(false)
        setInserted(true)
    }
    return (
        <div className="image-review">
            <div className="image">
                {!inserted && <div className="operation" onClick={(e) => handleClickOpenInsertSignatureAndStamp(e)}>
                    <img src={AttachIcon} alt="Attach Icon" />
                    <span>Chèn</span>
                </div>}
                {openInsertSignatureAndStamp && <div className="popup-insert" ref={insertSignatureAndStampRef}>
                    <div className="row">
                        <div className="left">
                            <Checkbox value={1} name="Chữ ký" selectedValues={selectedValues} handleClickCheckbox={handleClickCheckbox} />
                        </div>
                        <div className="right">
                            {arrayImage.map(item => {
                                return <img src={item} alt="stamp" key={uuidv4()} onClick={handleClickSignatureOrStamp} />
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="left">
                            <Checkbox value={2} name="Con dấu" selectedValues={selectedValues} handleClickCheckbox={handleClickCheckbox} />
                        </div>
                        <div className="right">
                            {[...Array(3).keys()].map(item => {
                                return <img src={Stamp} alt="stamp" key={uuidv4()} onClick={handleClickSignatureOrStamp} />
                            })}
                        </div>
                    </div>
                </div>}
                {inserted && <div className="inserted">
                    <img src={SignatureAndStampImage} alt="Signature And Stamp" />
                </div>}
                <img src={WordImage} alt="Word File Review" />
            </div>
            <div className="pagination">
                <div className="prev" onClick={() => { if (num > 1) { setNum(num => num - 1) } }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 3.49965H1.57L3.385 1.31965C3.46987 1.21754 3.5107 1.0859 3.49851 0.953688C3.48632 0.821475 3.42211 0.699519 3.32 0.61465C3.21789 0.52978 3.08625 0.488949 2.95404 0.501139C2.82183 0.513329 2.69987 0.577541 2.615 0.67965L0.115 3.67965C0.0981804 3.70351 0.0831396 3.72858 0.0699999 3.75465C0.0699999 3.77965 0.0700001 3.79465 0.0350001 3.81965C0.0123368 3.87698 0.000470561 3.938 0 3.99965C0.000470561 4.06129 0.0123368 4.12232 0.0350001 4.17965C0.0350001 4.20465 0.0349999 4.21965 0.0699999 4.24465C0.0831396 4.27072 0.0981804 4.29579 0.115 4.31965L2.615 7.31965C2.66201 7.37609 2.72088 7.42148 2.78742 7.45259C2.85397 7.4837 2.92654 7.49977 3 7.49965C3.11683 7.49988 3.23004 7.45919 3.32 7.38465C3.37063 7.34268 3.41248 7.29112 3.44316 7.23295C3.47383 7.17478 3.49273 7.11112 3.49877 7.04564C3.50481 6.98015 3.49787 6.91411 3.47834 6.85131C3.45882 6.78851 3.4271 6.73017 3.385 6.67965L1.57 4.49965H7.5C7.63261 4.49965 7.75979 4.44697 7.85355 4.3532C7.94732 4.25943 8 4.13226 8 3.99965C8 3.86704 7.94732 3.73986 7.85355 3.6461C7.75979 3.55233 7.63261 3.49965 7.5 3.49965Z" fill="#434547" />
                    </svg>
                </div>
                <span>{num}/5</span>
                <div className="next" onClick={() => { if (num < 5) { setNum(num => num + 1) } }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 3.49965H1.57L3.385 1.31965C3.46987 1.21754 3.5107 1.0859 3.49851 0.953688C3.48632 0.821475 3.42211 0.699519 3.32 0.61465C3.21789 0.52978 3.08625 0.488949 2.95404 0.501139C2.82183 0.513329 2.69987 0.577541 2.615 0.67965L0.115 3.67965C0.0981804 3.70351 0.0831396 3.72858 0.0699999 3.75465C0.0699999 3.77965 0.0700001 3.79465 0.0350001 3.81965C0.0123368 3.87698 0.000470561 3.938 0 3.99965C0.000470561 4.06129 0.0123368 4.12232 0.0350001 4.17965C0.0350001 4.20465 0.0349999 4.21965 0.0699999 4.24465C0.0831396 4.27072 0.0981804 4.29579 0.115 4.31965L2.615 7.31965C2.66201 7.37609 2.72088 7.42148 2.78742 7.45259C2.85397 7.4837 2.92654 7.49977 3 7.49965C3.11683 7.49988 3.23004 7.45919 3.32 7.38465C3.37063 7.34268 3.41248 7.29112 3.44316 7.23295C3.47383 7.17478 3.49273 7.11112 3.49877 7.04564C3.50481 6.98015 3.49787 6.91411 3.47834 6.85131C3.45882 6.78851 3.4271 6.73017 3.385 6.67965L1.57 4.49965H7.5C7.63261 4.49965 7.75979 4.44697 7.85355 4.3532C7.94732 4.25943 8 4.13226 8 3.99965C8 3.86704 7.94732 3.73986 7.85355 3.6461C7.75979 3.55233 7.63261 3.49965 7.5 3.49965Z" fill="#434547" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
