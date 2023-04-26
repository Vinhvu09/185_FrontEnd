import "./ColumnDateItem.scss";

export default function ColumnDateItem({ date, index }) {
  const dayRef = new Date(date.setDate(date.getDate() - date.getDay() + index));
  const dayInMonth = dayRef.getDate();
  function getDayInWeek(date) {
    const weekday = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];
    return weekday[date.getDay()];
  }
  return (
    <div className="columnDateItem">
      <div className="columnDateItem__day">
        <span className="columnDateItem__day--dayInWeek">{getDayInWeek(dayRef)}</span>
        <span className="columnDateItem__day--dayInMonth">{dayInMonth}</span>

        <div
          className={`columnDateItem__day--border ${
            dayRef.getDay() === 6 ? `displayNone` : ``
          }`}
        ></div>
      </div>
    
    </div>
  );
}
