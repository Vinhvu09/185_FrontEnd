import { createSlice } from "@reduxjs/toolkit"
import imageAvatar1 from "../../assets/imgs/employee1.png"
import imageAvatar2 from "../../assets/imgs/employee2.png"
import imageAvatar3 from "../../assets/imgs/employee3.png"
import imageAvatar4 from "../../assets/imgs/employee4.png"
import imageAvatar5 from "../../assets/imgs/employee5.png"
import imageAvatar6 from "../../assets/imgs/employee6.png"

const initialState = ({
    dataDepartmentUser: [
        {
            id: `1`,
            name: `Phòng Hành Chính - Tổng Hợp`,
            employee_joined_list: [
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
                    id: 5,
                    user_code: `HCTH5`,
                    full_name: `Nguyễn Thị Hòa`,
                    avatar: imageAvatar5,
                }
            ]
        },
        {
            id: `2`,
            name: `Phòng Tu bổ Di tích`,
            employee_joined_list: [
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
                }
            ]
        },
        {
            id: `3`,
            name: `Phòng Lập hồ sơ Di tích`,
            employee_joined_list: [
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
                },
            ]
        },
    ],
    usersData: [
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
        },
    ]
})


const departmentReducer = createSlice({
    name: 'department',
    initialState,
    reducers: {
        getDepartmentUserStart: () => { },
        getDepartmentUser: (state, action) => {
            return {
                ...state,
                dataDepartmentUser: action.payload
            }
        },
    }
})


export const { getDepartmentUser, getDepartmentUserStart } = departmentReducer.actions


export default departmentReducer.reducer