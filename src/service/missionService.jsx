import { getAxios } from "../api/Axios";

const missionService = {
    getList() {
        return getAxios('/missions');
    }
};

export default missionService;