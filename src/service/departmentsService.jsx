import { getAxios } from "../api/Axios";


const departmentsService = {
    getDepartmentsUser() {
        return getAxios('/departments/employee').then(res => res.results);
    }
};

export default departmentsService;