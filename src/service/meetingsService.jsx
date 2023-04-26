
import { axiosPrivate, getAxios } from "../api/Axios";

const meetingsService={
    addSchedule(data){
            const response=axiosPrivate.post("http://192.168.1.36:8000/api/schedules",data)
            return response;
   
    },
    getSchedules(date){
        return getAxios(`schedules?schedule_date=${date}`).then(res=>res.results);
        
    }
}

export default meetingsService