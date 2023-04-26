import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { getAxios } from "../../../../../../api/Axios";
import DataItemMonth from "../DataItemMonth/DataItemMonth";
import "./MonthItemDate.scss";

export default function MonthItemDate({ dateNum, startDate }) {
  const firstDayInMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    1
  );

  const dateNow = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    dateNum
  );
  const {backendDataSchedules}=useSelector(store=> store.meeting);
  let dataSchedules=[...backendDataSchedules];
  dataSchedules=dataSchedules.filter(dataSchedule=> dataSchedule.schedule_date===  `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`)
  // const [dataSchedules, setDataSchedules] = useState();


  // useEffect(() => {
  //   async function fetchDataSchedule() {
  //     await getAxios(
  //       `schedules?schedule_date=${dateNow.getFullYear()}-${
  //         dateNow.getMonth() + 1
  //       }-${dateNow.getDate()}`
  //     ).then((res) => {
  //       setDataSchedules(res.results);
  //     });
  //   }
  //   fetchDataSchedule();
  // }, [startDate]);
  return (
    <div
      className="monthItemDate"
      style={{
        marginLeft: `${
          dateNum === 1 ? `calc(100% / 7 * ${firstDayInMonth.getDay()})` : ``
        }`,
        color: `${
          dateNow.getDay() === 0 || dateNow.getDay() === 6
            ? `rgba(102, 102, 102, 0.5)`
            : ``
        }`,
      }}
    >
      <div className="monthItemDate__date">{dateNum}</div>
      <div className="monthItemDate__data">
        {
          dataSchedules && dataSchedules.map((dataSchedule,index)=>{
            return <DataItemMonth key={index} schedule={dataSchedule}/>
          })
        }
      </div>
    </div>
  );
}
