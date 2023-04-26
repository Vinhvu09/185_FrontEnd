import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { getAxios } from "../../../../../../api/Axios";
import "./DataDateItem.scss";
import WeekScheduleItem from "./WeekScheduleItem/WeekScheduleItem";

export default function DataDateItem({ date, index }) {
  const dayRef = new Date(date.setDate(date.getDate() - date.getDay() + index));
 const {backendDataSchedules}=useSelector(store=> store.meeting);
  let dataSchedules= [...backendDataSchedules];
  dataSchedules= dataSchedules.filter(dataSchedule=>dataSchedule.schedule_date=== `${dayRef.getFullYear()}-${dayRef.getMonth() + 1}-${dayRef.getDate()}`);

  // const daySelected= `${dayRef.getFullYear()}-${dayRef.getMonth() + 1}-${dayRef.getDate()}`
  // console.log(daySelected)
  // useEffect(() => {
  //   async function fetchDataSchedule() {
  //     await getAxios(
  //       `schedules?schedule_date=${dayRef.getFullYear()}-${
  //         dayRef.getMonth() + 1
  //       }-${dayRef.getDate()}`
  //     ).then((res) => {
  //       setDataSchedules(res.results);
  //     });
  //   }
  //   fetchDataSchedule();
  // }, [date]);
  return (
    <>
      {dataSchedules && (
        <div className="dataDateItem">
          <div
            className={`dataDateItem__data ${
              dayRef.getDay() === 6 ? `borderNone` : ``
            }`}
          >
            {dataSchedules &&
              dataSchedules.map((dataSchedule, index) => {
                return (
                  <WeekScheduleItem
                    dataSchedule={dataSchedule}
                    key={index}
                  ></WeekScheduleItem>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
