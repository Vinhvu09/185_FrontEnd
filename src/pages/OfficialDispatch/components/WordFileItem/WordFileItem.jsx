import "./WordFileItem.scss"
import wordIcon from "../../../../assets/svg/word_icon.svg"
export default function WordFileItem() {
    return (
        <div className="word-file-item">
            <img src={wordIcon} alt="word icon" />
            <span>congvanngay của uỷ ban nhân dân 2/7.word</span>
        </div>
    )
}
