import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import checked from '../../assets/svg/checkedWhite.svg'
import upload from '../../assets/svg/upload.svg'
import MainButton from '../../components/MainButton/MainButton'
import Options from '../../components/Options/Options'
import Redirect from '../../components/Redirect/Redirect'
import RelicsItem from '../../components/RelicsItem/RelicsItem'
import { districts } from '../../constant/constant'
import { setRedirect } from '../../store/Reducer/loadingReducer'
import { fetchRelicsList } from '../../store/Reducer/relicsReducer'
import notfound from '../../assets/imgs/notfoundrelics.png'
import './Relics.scss'
let data = [
    { id: 1, name: 'P. Lập hồ sơ tích', path: '/admin/document' },
    { id: 2, name: 'Quản lý hồ sơ P. LHSDT', path: '/admin/relics' },
]


const relicsData = [
    {
        name: 'Di tích kiến trúc nghệ thuật Chùa Từ Quang',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://accgroup.vn/wp-content/uploads/2022/02/Di-tich-la-gi-Cap-nhat-2022.jpg',
        level: 'CI',
        district: 'd1'
    },
    {
        name: 'Di tích Địa đạo Củ Chi',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://cdnmedia.baotintuc.vn/Upload/CCcQv1fjdlI5Hob1jh0mA/files/2020/10/04/IMG_0505.JPG',
        level: 'NA',
        district: 'd2'
    },
    {
        name: 'Di tích Lò gốm cổ Hưng Lợi',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://cdnimg.vietnamplus.vn/uploaded/lepz/2021_12_08/ttxvn_20211208_nguyen_thi_an.jpg',
        level: 'CI',
        district: 'd3'
    },
    {
        name: 'Di tích Toà án nhân dân Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://vnn-imgs-f.vgcloud.vn/2020/05/13/08/ha-noi-nhieu-di-tich-mo-cua-tro-lai-2.jpg',
        level: 'NA',
        district: 'd4'
    },
    {
        name: 'Di tích Bảo tàng lịch sử Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://cdnmedia.baotintuc.vn/Upload/DMDnZyELa7xUDTdLsa19w/files/2020/09/010920/030920/110920/180920/220920/260920/chua-cau-260920.jpg',
        level: 'SN',
        district: 'd5'
    },
    {
        name: 'Di tích Nhà hát Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://phutho.gov.vn/sites/default/files/users/user237/tubo1.jpg',
        level: 'CI',
        district: 'd6'
    },
    {
        name: 'Trụ sở Uỷ ban nhân dân Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'http://hanoimoi.com.vn/Uploads/images/tuandiep/2022/02/19/Du-khach-den-tham-quan-Khu-.jpg',
        level: 'SN',
        district: 'd7'
    },
    {
        name: 'Miếu Thiên Hậu (Quảng Triệu hội quán)',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://bcp.cdnchinhphu.vn/334894974524682240/2022/1/18/img-8073-1642499317074547085721.png',
        level: 'NA',
        district: 'd8'
    },
    {
        name: 'Di tích kiến trúc nghệ thuật Chùa Từ Quang',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://tourismcantho.vn/files/files/image-20211228210116-1.jpeg',
        level: 'NA',
        district: 'd9'
    },
    {
        name: 'Di tích kiến trúc nghệ thuật Chùa Từ Quang',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://accgroup.vn/wp-content/uploads/2022/02/Di-tich-la-gi-Cap-nhat-2022.jpg',
        level: 'SN',
        district: 'd10',
    },
    {
        name: 'Di tích Địa đạo Củ Chi',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://cdnmedia.baotintuc.vn/Upload/CCcQv1fjdlI5Hob1jh0mA/files/2020/10/04/IMG_0505.JPG',
        level: 'NA',
        district: 'd11',
    },
    {
        name: 'Di tích Lò gốm cổ Hưng Lợi',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://cdnimg.vietnamplus.vn/uploaded/lepz/2021_12_08/ttxvn_20211208_nguyen_thi_an.jpg',
        level: 'CI',
        district: 'd12',
    },
    {
        name: 'Di tích Toà án nhân dân Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://vnn-imgs-f.vgcloud.vn/2020/05/13/08/ha-noi-nhieu-di-tich-mo-cua-tro-lai-2.jpg',
        level: 'CI',
        district: 'd13',
    },
    {
        name: 'Di tích Bảo tàng lịch sử Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://cdnmedia.baotintuc.vn/Upload/DMDnZyELa7xUDTdLsa19w/files/2020/09/010920/030920/110920/180920/220920/260920/chua-cau-260920.jpg',
        level: 'SN',
        district: 'd14',
    },
    {
        name: 'Di tích Nhà hát Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://phutho.gov.vn/sites/default/files/users/user237/tubo1.jpg',
        level: 'NA',
        district: 'd15',
    },
    {
        name: 'Trụ sở Uỷ ban nhân dân Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'http://hanoimoi.com.vn/Uploads/images/tuandiep/2022/02/19/Du-khach-den-tham-quan-Khu-.jpg',
        level: 'NA',
        district: 'd16',
    },
    {
        name: 'Miếu Thiên Hậu (Quảng Triệu hội quán)',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://bcp.cdnchinhphu.vn/334894974524682240/2022/1/18/img-8073-1642499317074547085721.png',
        level: 'CI',
        district: 'd17',
    },
    {
        name: 'Di tích kiến trúc nghệ thuật Chùa Từ Quang',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://tourismcantho.vn/files/files/image-20211228210116-1.jpeg',
        level: 'SN',
        district: 'd18',
    },
    {
        name: 'Di tích kiến trúc nghệ thuật Chùa Từ Quang',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://accgroup.vn/wp-content/uploads/2022/02/Di-tich-la-gi-Cap-nhat-2022.jpg',
        level: 'CI',
        district: 'd1'
    },
    {
        name: 'Di tích Địa đạo Củ Chi',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://cdnmedia.baotintuc.vn/Upload/CCcQv1fjdlI5Hob1jh0mA/files/2020/10/04/IMG_0505.JPG',
        level: 'NA',
        district: 'd2'
    },
    {
        name: 'Di tích Lò gốm cổ Hưng Lợi',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://cdnimg.vietnamplus.vn/uploaded/lepz/2021_12_08/ttxvn_20211208_nguyen_thi_an.jpg',
        level: 'CI',
        district: 'd3'
    },
    {
        name: 'Di tích Toà án nhân dân Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://vnn-imgs-f.vgcloud.vn/2020/05/13/08/ha-noi-nhieu-di-tich-mo-cua-tro-lai-2.jpg',
        level: 'NA',
        district: 'd4'
    },
    {
        name: 'Di tích Bảo tàng lịch sử Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://cdnmedia.baotintuc.vn/Upload/DMDnZyELa7xUDTdLsa19w/files/2020/09/010920/030920/110920/180920/220920/260920/chua-cau-260920.jpg',
        level: 'SN',
        district: 'd5'
    },
    {
        name: 'Di tích Nhà hát Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://phutho.gov.vn/sites/default/files/users/user237/tubo1.jpg',
        level: 'CI',
        district: 'd6'
    },
    {
        name: 'Trụ sở Uỷ ban nhân dân Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'http://hanoimoi.com.vn/Uploads/images/tuandiep/2022/02/19/Du-khach-den-tham-quan-Khu-.jpg',
        level: 'SN',
        district: 'd7'
    },
    {
        name: 'Miếu Thiên Hậu (Quảng Triệu hội quán)',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://bcp.cdnchinhphu.vn/334894974524682240/2022/1/18/img-8073-1642499317074547085721.png',
        level: 'NA',
        district: 'd8'
    },
    {
        name: 'Di tích kiến trúc nghệ thuật Chùa Từ Quang',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://tourismcantho.vn/files/files/image-20211228210116-1.jpeg',
        level: 'NA',
        district: 'd9'
    },
    {
        name: 'Di tích kiến trúc nghệ thuật Chùa Từ Quang',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://accgroup.vn/wp-content/uploads/2022/02/Di-tich-la-gi-Cap-nhat-2022.jpg',
        level: 'SN',
        district: 'd10',
    },
    {
        name: 'Di tích Địa đạo Củ Chi',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://cdnmedia.baotintuc.vn/Upload/CCcQv1fjdlI5Hob1jh0mA/files/2020/10/04/IMG_0505.JPG',
        level: 'NA',
        district: 'd11',
    },
    {
        name: 'Di tích Lò gốm cổ Hưng Lợi',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://cdnimg.vietnamplus.vn/uploaded/lepz/2021_12_08/ttxvn_20211208_nguyen_thi_an.jpg',
        level: 'CI',
        district: 'd12',
    },
    {
        name: 'Di tích Toà án nhân dân Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://vnn-imgs-f.vgcloud.vn/2020/05/13/08/ha-noi-nhieu-di-tich-mo-cua-tro-lai-2.jpg',
        level: 'CI',
        district: 'd13',
    },
    {
        name: 'Di tích Bảo tàng lịch sử Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://cdnmedia.baotintuc.vn/Upload/DMDnZyELa7xUDTdLsa19w/files/2020/09/010920/030920/110920/180920/220920/260920/chua-cau-260920.jpg',
        level: 'SN',
        district: 'd14',
    },
    {
        name: 'Di tích Nhà hát Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://phutho.gov.vn/sites/default/files/users/user237/tubo1.jpg',
        level: 'NA',
        district: 'd15',
    },
    {
        name: 'Trụ sở Uỷ ban nhân dân Thành phố Hồ Chí Minh',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'http://hanoimoi.com.vn/Uploads/images/tuandiep/2022/02/19/Du-khach-den-tham-quan-Khu-.jpg',
        level: 'NA',
        district: 'd16',
    },
    {
        name: 'Miếu Thiên Hậu (Quảng Triệu hội quán)',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://bcp.cdnchinhphu.vn/334894974524682240/2022/1/18/img-8073-1642499317074547085721.png',
        level: 'CI',
        district: 'd17',
    },
    {
        name: 'Di tích kiến trúc nghệ thuật Chùa Từ Quang',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        avatar: 'https://tourismcantho.vn/files/files/image-20211228210116-1.jpeg',
        level: 'SN',
        district: 'd18',
    },
]


export default function Relics() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { relicsList } = useSelector(store => store.relics)
    const [isActive, setIsActive] = useState([])
    const [optionsFilter, setOptionsFilter] = useState({
        page_size: 10,
    })
    const [relicsDataFake, setRelicsDataFake] = useState(relicsData)
    const qs = new URLSearchParams(optionsFilter).toString()
    // useEffect(() => {
    //     dispatch(fetchRelicsList(qs));
    // }, [qs]);
    // useEffect(() => {
    //     window.addEventListener('scroll', e => {
    //         let scroll = e.target.documentElement.scrollTop;
    //         let heightWindow = window.innerHeight;
    //         let scrollHeight = e.target.documentElement.scrollHeight;
    //         if (scroll + heightWindow + 200 > scrollHeight) {
    //             if (optionsFilter.page_size + 10 < relicsList.count) {
    //                 setOptionsFilter({
    //                     ...optionsFilter,
    //                     page_size: optionsFilter.page_size + 10
    //                 });
    //             } else {
    //                 setOptionsFilter({
    //                     ...optionsFilter,
    //                     page_size: relicsList.count
    //                 });
    //             }
    //         }
    //     });
    //     return () => {
    //         window.removeEventListener('scroll', e => {
    //             let scroll = e.target.documentElement.scrollTop;
    //             let heightWindow = window.innerHeight;
    //             let scrollHeight = e.target.documentElement.scrollHeight;
    //             if (scroll + heightWindow + 100 > scrollHeight) {
    //                 if (optionsFilter.page_size + 10 < relicsList.count) {
    //                     setOptionsFilter({
    //                         ...optionsFilter,
    //                         page_size: optionsFilter.page_size + 10
    //                     });
    //                 } else {
    //                     setOptionsFilter({
    //                         ...optionsFilter,
    //                         page_size: relicsList.count
    //                     });
    //                 }
    //             }
    //         });
    //     };
    // }, [relicsList]);
    // useEffect(() => {
    //     dispatch(setRedirect());
    // }, []);
    const handleNavigate = () => {
        navigate('/admin/relics/create')
    }
    const handleActive = (e) => {
        let value = e.currentTarget.dataset.id
        if (isActive.includes(value)) {
            let data = isActive.filter(e => e !== value)
            if (data.length > 0) {
                // setOptionsFilter({
                //     ...optionsFilter,
                //     level: data.join(',')
                // });

                //xet cung'
                setOptionsFilter({
                    ...optionsFilter,
                    level: data
                })
            } else {
                // delete optionsFilter.level;
                // if (optionsFilter.page_size < 10) {
                //     setOptionsFilter({
                //         ...optionsFilter,
                //         page_size: 10,
                //     });
                // }
                setOptionsFilter({
                    ...optionsFilter,
                    level: 'ALL'
                })
            }
            setIsActive(data)
        } else {
            if (value === 'ALL') {
                setIsActive([value])
                // delete optionsFilter.level;

                // Xet cung'
                setOptionsFilter({
                    ...optionsFilter,
                    level: 'ALL'
                })

            } else {
                isActive.push(value)
                let data = isActive.filter(e => e !== 'ALL')
                setIsActive(data)
                // setOptionsFilter({
                //     ...optionsFilter,
                //     level: data.join(',')
                // });

                // xet cung'
                setOptionsFilter({
                    ...optionsFilter,
                    level: data
                })
            }
        }
    }

    //Xet cung'
    useEffect(() => {
        let arrayData = []

        if (optionsFilter.level === 'ALL' || optionsFilter.level === undefined) {
            if (optionsFilter.district) {
                let result = relicsData?.filter(e => e.district === optionsFilter.district)
                setRelicsDataFake(result)
            } else {
                setRelicsDataFake(relicsData)
            }
        } else {
            relicsData?.forEach(item => {
                optionsFilter?.level?.forEach(filter => {
                    if (item.level === filter) {
                        arrayData.push(item)
                    }
                })
            })
            if (optionsFilter.district) {
                let result = arrayData?.filter(e => e.district === optionsFilter.district)
                setRelicsDataFake(result)
            } else {
                setRelicsDataFake(arrayData)
            }
        }

    }, [optionsFilter])
    return (
        <div className="relics">
            <div className="container-fluid">
                <div className="relics__head">
                    <Redirect data={data} />
                    <MainButton icon={upload} className="mainButton bigger" onClick={handleNavigate}>Tải tài liệu lên</MainButton>
                </div>
                <div className="relics__filter">
                    <p className="title">Vị trí *</p>
                    <div className="filter">
                        <div className="left">
                            <Options options={districts} optionsFilter={optionsFilter} setOptionsFilter={setOptionsFilter} />
                        </div>
                        <div className="right">
                            <label data-id="ALL" onClick={handleActive} className={`${isActive.includes('ALL') ? 'active' : ''}`}>
                                <div className={`checkStyle`}>
                                    <img src={checked} alt="checked_svg" />
                                </div>
                                <div className="label">Tất cả</div>
                            </label>
                            <label data-id="SN" onClick={handleActive} className={`${isActive.includes('SN') ? 'active' : ''}`}>
                                <div className={`checkStyle ${isActive.includes('SN') ? 'active' : ''}`}>
                                    <img src={checked} alt="checked_svg" />
                                </div>
                                <div className="label">Cấp quốc gia đặc biệt</div>
                            </label>
                            <label data-id="NA" onClick={handleActive} className={`${isActive.includes('NA') ? 'active' : ''}`}>
                                <div className={`checkStyle`}>
                                    <img src={checked} alt="checked_svg" />
                                </div>
                                <div className="label">Cấp quốc gia</div>
                            </label>
                            <label data-id="CI" onClick={handleActive} className={`${isActive.includes('CI') ? 'active' : ''}`}>
                                <div className={`checkStyle`}>
                                    <img src={checked} alt="checked_svg" />
                                </div>
                                <div className="label">Cấp thành phố</div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="relics__list">
                    {relicsDataFake.length > 0 ?
                        relicsDataFake?.map((e, index) => {
                            return (
                                <div className="item" key={index}>
                                    <RelicsItem qs={qs} name={e.name} index={index + 1} id={e.id} address={e.address} img={e.avatar} />
                                </div>
                            )
                        })
                        :
                        <div className="relics__list--notfound">
                            <img src={notfound} alt="logo" />
                            <div className="text">
                                <div className="main">Cập Nhập Hồ Sơ</div>
                                <div className="sub">Hiện tại vẫn chưa có di tích mới tại khu vực bạn chọn</div>
                            </div>
                        </div>
                    }

                </div>
                <div className="relics__paginate">
                </div>
            </div>
        </div >
    )
}
