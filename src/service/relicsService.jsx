import { deleteAxios, getAxios, postAxios, updateAxios } from "../api/Axios";
const relicsService = {
    getRelicsList(params = '') {
        return getAxios(`/relics?${params}`);
    },
    getRelicsDetail(id) {
        return getAxios(`/relics/${id}`);
    },
    getRelicsRelative(id) {
        return getAxios(`/relics/${id}/related`);
    },
    postRelics(data) {
        return postAxios('/relics', data);
    },
    deleteRelicsItem(id) {
        return deleteAxios(`/relics/${id}?logical=true`,);
    },
    updateRelicsItem(id, data) {
        return updateAxios(`/relics/${id}`, data);
    }

};

export default relicsService;