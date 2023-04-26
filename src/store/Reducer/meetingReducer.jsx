import { createSlice } from "@reduxjs/toolkit";
import imageAvatar from "../../assets/imgs/avatar1.png";
import { v4 as uuidv4 } from "uuid";
import imageAvatar1 from "../../assets/imgs/employee1.png";
import imageAvatar2 from "../../assets/imgs/employee2.png";
import imageAvatar3 from "../../assets/imgs/employee3.png";
import imageAvatar4 from "../../assets/imgs/employee4.png";
import imageAvatar5 from "../../assets/imgs/employee5.png";
import imageAvatar6 from "../../assets/imgs/employee6.png";
const backendDataSchedulesInitial = [
  {
    id: uuidv4(),
    name: "Họp triển khai kế hoạch tuần 1 tháng 12",
    description: "Triển khai kế hoạch tuần 1 tháng 12",
    start_at: "00:00:00",
    end_at: "00:55:00",
    schedule_date: "2022-12-02",
    type: "BU",
    employees: [
      {
        id: 3,
        user_code: `HCTH3`,
        full_name: `Nguyễn Văn A`,
        avatar: imageAvatar3,
      },
      {
        id: 4,
        user_code: `HCTH4`,
        full_name: `Đỗ Thị Hòa`,
        avatar: imageAvatar4,
      },
      {
        id: 6,
        user_code: `HCTH6`,
        full_name: `Đỗ Bảo`,
        avatar: imageAvatar6,
      },
    ]
  },
  {
    id: uuidv4(),
    name: "Họp triển khai kế hoạch tháng 12",
    description: "Triển khai kế hoạch tháng 12",
    start_at: "00:00:00",
    end_at: "00:35:00",
    schedule_date: "2022-12-10",
    type: "OT",
    employees: [
      {
        id: 7,
        user_code: `HCTH7`,
        full_name: `Cao Văn Sơn`,
        avatar: imageAvatar1,
      },
      {
        id: 8,
        user_code: `HCTH8`,
        full_name: `Trần Công Vũ`,
        avatar: imageAvatar2,
      },
      {
        id: 9,
        user_code: `HCTH9`,
        full_name: `Đỗ Bảo`,
        avatar: imageAvatar2,
      },
      {
        id: 10,
        user_code: `HCTH10`,
        full_name: `Kiều Nguyệt Anh`,
        avatar: imageAvatar3,
      },
      {
        id: 11,
        user_code: `HCTH11`,
        full_name: `Trần Trung Sĩ`,
        avatar: imageAvatar3,
      },
    ]
  },
  {
    id: uuidv4(),
    name: "Họp triển khai kế hoạch tháng 12",
    description: "Triển khai kế hoạch tháng 12",
    start_at: "02:00:00",
    end_at: "02:55:00",
    schedule_date: "2022-12-10",
    type: "BU",
    employees: [
      {
        id: 4,
        user_code: `HCTH4`,
        full_name: `Đỗ Thị Hòa`,
        avatar: imageAvatar4,
      },
      {
        id: 5,
        user_code: `HCTH5`,
        full_name: `Nguyễn Thị Hòa`,
        avatar: imageAvatar5,
      },
      {
        id: 6,
        user_code: `HCTH6`,
        full_name: `Đỗ Bảo`,
        avatar: imageAvatar6,
      },
    ]
  },
  {
    id: uuidv4(),
    name: "Họp triển khai kế hoạch tháng 12",
    description: "Triển khai kế hoạch tháng 12",
    start_at: "09:00:00",
    end_at: "09:35:00",
    schedule_date: "2022-12-13",
    type: "OT",
    employees: [
      {
        id: 1,
        user_code: `HCTH1`,
        full_name: `Lê Quốc Việt`,
        avatar: imageAvatar1,
      },
      {
        id: 2,
        user_code: `HCTH2`,
        full_name: `Võ Văn Minh`,
        avatar: imageAvatar2,
      },

      {
        id: 9,
        user_code: `HCTH9`,
        full_name: `Đỗ Bảo`,
        avatar: imageAvatar2,
      },
      {
        id: 10,
        user_code: `HCTH10`,
        full_name: `Kiều Nguyệt Anh`,
        avatar: imageAvatar3,
      },
      {
        id: 11,
        user_code: `HCTH11`,
        full_name: `Trần Trung Sĩ`,
        avatar: imageAvatar3,
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Họp triển khai kế hoạch tháng 12",
    description: "Triển khai kế hoạch tháng 12",
    start_at: "02:00:00",
    end_at: "04:35:00",
    schedule_date: "2022-12-12",
    type: "ME",
    employees: [
      {
        id: 5,
        user_code: `HCTH5`,
        full_name: `Nguyễn Thị Hòa`,
        avatar: imageAvatar5,
      },
      {
        id: 6,
        user_code: `HCTH6`,
        full_name: `Đỗ Bảo`,
        avatar: imageAvatar6,
      },
      {
        id: 7,
        user_code: `HCTH7`,
        full_name: `Cao Văn Sơn`,
        avatar: imageAvatar1,
      },
      {
        id: 8,
        user_code: `HCTH8`,
        full_name: `Trần Công Vũ`,
        avatar: imageAvatar2,
      },
      {
        id: 9,
        user_code: `HCTH9`,
        full_name: `Đỗ Bảo`,
        avatar: imageAvatar2,
      },
      {
        id: 10,
        user_code: `HCTH10`,
        full_name: `Kiều Nguyệt Anh`,
        avatar: imageAvatar3,
      },
      {
        id: 11,
        user_code: `HCTH11`,
        full_name: `Trần Trung Sĩ`,
        avatar: imageAvatar3,
      },
      {
        id: 12,
        user_code: `HCTH12`,
        full_name: `Đỗ Bảo`,
        avatar: imageAvatar4,
      },
      {
        id: 13,
        user_code: `HCTH13`,
        full_name: `Nguyễn Văn Cầu`,
        avatar: imageAvatar5,
      },
      {
        id: 14,
        user_code: `HCTH14`,
        full_name: `Lê Văn Sự`,
        avatar: imageAvatar5,
      },
      {
        id: 15,
        user_code: `HCTH12`,
        full_name: `Nguyễn Tường Vy`,
        avatar: imageAvatar6,
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Họp triển khai kế hoạch tháng 12",
    description: "Triển khai kế hoạch tháng 12",
    start_at: "00:00:00",
    end_at: "01:15:00",
    schedule_date: "2022-12-14",
    type: "BU",
    employees: [
      {
        id: 5,
        user_code: `HCTH5`,
        full_name: `Nguyễn Thị Hòa`,
        avatar: imageAvatar5,
      },
      {
        id: 6,
        user_code: `HCTH6`,
        full_name: `Đỗ Bảo`,
        avatar: imageAvatar6,
      },
      {
        id: 7,
        user_code: `HCTH7`,
        full_name: `Cao Văn Sơn`,
        avatar: imageAvatar1,
      },
      {
        id: 8,
        user_code: `HCTH8`,
        full_name: `Trần Công Vũ`,
        avatar: imageAvatar2,
      },
      {
        id: 9,
        user_code: `HCTH9`,
        full_name: `Đỗ Bảo`,
        avatar: imageAvatar2,
      },
      {
        id: 10,
        user_code: `HCTH10`,
        full_name: `Kiều Nguyệt Anh`,
        avatar: imageAvatar3,
      },
      {
        id: 11,
        user_code: `HCTH11`,
        full_name: `Trần Trung Sĩ`,
        avatar: imageAvatar3,
      },
      {
        id: 12,
        user_code: `HCTH12`,
        full_name: `Đỗ Bảo`,
        avatar: imageAvatar4,
      },
      {
        id: 13,
        user_code: `HCTH13`,
        full_name: `Nguyễn Văn Cầu`,
        avatar: imageAvatar5,
      },
      {
        id: 14,
        user_code: `HCTH14`,
        full_name: `Lê Văn Sự`,
        avatar: imageAvatar5,
      },
      {
        id: 15,
        user_code: `HCTH12`,
        full_name: `Nguyễn Tường Vy`,
        avatar: imageAvatar6,
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Họp triển khai kế hoạch tháng 12",
    description: "Triển khai kế hoạch tháng 12",
    start_at: "01:00:00",
    end_at: "02:15:00",
    schedule_date: "2022-12-15",
    type: "BU",
    employees: [
      {
        id: 5,
        user_code: `HCTH5`,
        full_name: `Nguyễn Thị Hòa`,
        avatar: imageAvatar5,
      },
      {
        id: 6,
        user_code: `HCTH6`,
        full_name: `Đỗ Bảo`,
        avatar: imageAvatar6,
      },
      {
        id: 7,
        user_code: `HCTH7`,
        full_name: `Cao Văn Sơn`,
        avatar: imageAvatar1,
      },
      {
        id: 8,
        user_code: `HCTH8`,
        full_name: `Trần Công Vũ`,
        avatar: imageAvatar2,
      },
      {
        id: 9,
        user_code: `HCTH9`,
        full_name: `Đỗ Bảo`,
        avatar: imageAvatar2,
      },
      {
        id: 10,
        user_code: `HCTH10`,
        full_name: `Kiều Nguyệt Anh`,
        avatar: imageAvatar3,
      },
      {
        id: 11,
        user_code: `HCTH11`,
        full_name: `Trần Trung Sĩ`,
        avatar: imageAvatar3,
      },
      {
        id: 12,
        user_code: `HCTH12`,
        full_name: `Đỗ Bảo`,
        avatar: imageAvatar4,
      },
      {
        id: 13,
        user_code: `HCTH13`,
        full_name: `Nguyễn Văn Cầu`,
        avatar: imageAvatar5,
      },
      {
        id: 14,
        user_code: `HCTH14`,
        full_name: `Lê Văn Sự`,
        avatar: imageAvatar5,
      },
      {
        id: 15,
        user_code: `HCTH12`,
        full_name: `Nguyễn Tường Vy`,
        avatar: imageAvatar6,
      }
    ]
  }
];

const initialState = {
  backendDataSchedules: backendDataSchedulesInitial,
  errorsAddSchedule: null,
  dataSchedules: [],
  editSchedule: null,
};

export const meetingReducer = createSlice({
  name: "meeting",
  initialState,
  reducers: {

    addScheduleStart: (state) => {
      return {
        ...state,
        loadingAddSchedule: true,
      };
    },
    addScheduleSuccess: (state) => {
      return {
        ...state,
        loadingAddSchedule: false,
        stateAddSuccess: true,
      };
    },
    setErrorAddSchedule: (state, action) => {
      return {
        ...state,
        loadingAddSchedule: false,
        errorsAddSchedule: action.payload,
      };
    },
    resetMeetingState: (state) => {
      return {
        ...initialState,
        dataSchedules: state.dataSchedules,
      };
    },
    resetErrorState: (state) => {
      return {
        ...state,
        errorsAddSchedule: null,
      };
    },
    getDataSchedulesStart: () => { },
    getDataSchedules: (state, action) => {
      return {
        ...state,
        dataSchedules: action.payload,
      };
    },

    addBackendDataSchedule: (state, action) => {
      return {
        ...state,
        backendDataSchedules: action.payload
      };
    },
    addEditSchedule: (state, action) => {
      return {
        ...state,
        editSchedule: action.payload
      };
    }
  },
});

export const {

  resetErrorState,

  getDataSchedules,
  getDataSchedulesStart,
  setErrorAddSchedule,
  addScheduleSuccess,
  addScheduleStart,
  resetMeetingState,
  addBackendDataSchedule,
  addEditSchedule,
} = meetingReducer.actions;


export default meetingReducer.reducer;
