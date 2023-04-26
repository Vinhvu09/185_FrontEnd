import { useLocation, useNavigate } from "react-router-dom";
import AddBoxBorder from "../../components/AddBoxBorder/AddBoxBorder";
import FileItem from "../../components/FileItem/FileItem";
import Redirect from "../../components/Redirect/Redirect";
import RedirectHead from "../../components/RedirectHead/RedirectHead";
import "./OfficialDispatch.scss";
import searchIcon from "../../assets/svg/search-white.svg";
import ImageReview from "./components/ImageReview";
import { useReducer, useState } from "react";
import ReactDatePicker from "react-datepicker";
import WordFileItem from "./components/WordFileItem/WordFileItem";
import { v4 as uuidv4 } from "uuid";
import UploadGroup from "../../components/UploadGroup/UploadGroup";
import { useRef } from "react";
import StatusLoading from "../../components/StatusLoading/StatusLoading";
import imgFile from "../../assets/svg/img_file.svg";
import { useEffect } from "react";
import Checkbox from "../Director/components/Checkbox/Checkbox";
import useCheckbox from "../../hooks/useCheckbox";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import MainButton from "../../components/MainButton/MainButton";
import addIcon from "../../assets/svg/add_icon.svg";
import transferIcon from "../../assets/svg/transfer_icon.svg";
import returnIcon from "../../assets/svg/return_icon.svg";
import seenIcon from "../../assets/svg/seen_icon.svg";
import endIcon from "../../assets/svg/end_icon.svg";
import Modal from "../../components/Modal/Modal";
import PopupSearch from "../../components/PopupSearch/PopupSearch";
import tableArrow from '../../assets/svg/tableArrow.svg';
import arrowDown from '../../assets/svg/arrow_down.svg';
import dispatchIcon from '../../assets/svg/back&go.svg';
import doubleArrow from '../../assets/svg/doubleArrow.svg';
import closeIcon from '../../assets/svg/close.svg';



const dataRedirect = [{
    key: "director",
    name: "Ban giám đốc",
},
{
    key: "document-come",
    name: "Công văn đến",
},
{
    key: "document-out",
    name: "Công văn đi",
},
{
    key: "restorativeDocument",
    name: "P. Tu Bổ Di Tích",
    nextName: "Quản lý văn thư P.TBDT",
},
{
    key: "document",
    name: "P. Lập Hồ Sơ Di Tích",
    nextName: "Quản lý văn thư P.LHSDT",
},
{
    key: "administrativeDocument",
    name: "P. Hành Chính - Tổng Hợp",
    nextName: "Quản lý văn thư P.HCTH",
},
{
    key: "advisory-document",
    name: "Công văn tham mưu",
},
{
    key: "direct-document",
    name: "Công văn chỉ đạo",
},
];



const table = [
    {
        id: Math.random() * Math.random(),
        isChecked: false,
        signalNum: '2767/BC-SVHTT',
        date: '29/08/2022',
        personCompose: 'Nguyen Van A',
        personSign: 'Nguyen Van A',
        info: 'Số 1022/UBND-VHTT ngày 30/06/2022 Trích yếu ý kiến đối với dự thảo danh sách đề xuất'
    },
    {
        id: Math.random() * Math.random(),
        isChecked: false,
        signalNum: '2622/C',
        date: '29/08/2022',
        personCompose: 'Nguyen Van A',
        personSign: 'Nguyen Van A',
        info: 'Số 1022/UBND-VHTT ngày 30/06/2022 Trích yếu ý kiến đối với dự thảo danh sách đề xuất'
    },
    {
        id: Math.random() * Math.random(),
        isChecked: false,
        signalNum: '2622/C',
        date: '29/08/2022',
        personCompose: 'Nguyen Van A',
        personSign: 'Nguyen Van A',
        info: 'Số 1022/UBND-VHTT ngày 30/06/2022 Trích yếu ý kiến đối với dự thảo danh sách đề xuất'
    },
    {
        id: Math.random() * Math.random(),
        isChecked: false,
        signalNum: '2622/C',
        date: '29/08/2022',
        personCompose: 'Nguyen Van A',
        personSign: 'Nguyen Van A',
        info: 'Số 1022/UBND-VHTT ngày 30/06/2022 Trích yếu ý kiến đối với dự thảo danh sách đề xuất'
    },
    {
        id: Math.random() * Math.random(),
        isChecked: false,
        signalNum: '2622/C',
        date: '29/08/2022',
        personCompose: 'Nguyen Van A',
        personSign: 'Nguyen Van A',
        info: 'Số 1022/UBND-VHTT ngày 30/06/2022 Trích yếu ý kiến đối với dự thảo danh sách đề xuất'
    },
    {
        id: Math.random() * Math.random(),
        isChecked: false,
        signalNum: '2622/C',
        date: '29/08/2022',
        personCompose: 'Nguyen Van A',
        personSign: 'Nguyen Van A',
        info: 'Số 1022/UBND-VHTT ngày 30/06/2022 Trích yếu ý kiến đối với dự thảo danh sách đề xuất'
    },
];

function containsUndefined(arr) {
    return arr.includes(undefined);
}
export default function OfficialDispatch() {
    const dataForDirectorCheckbox = [...Array(10).keys()].map((index) => { return { id: `${index}` }; });
    const navigate = useNavigate();
    const { handleClickCheckAll, handleClickCheckbox, selectedValues, checkAll } = useCheckbox(dataForDirectorCheckbox);
    const [openUploadFile, setOpenUploadFile] = useState(false);
    const [compared, setCompared] = useState(0);
    const [distance, setDistance] = useState(0);
    const [width, setWidth] = useState(0);
    const uploadFileRef = useRef();
    const location = useLocation();
    const [file, setFile] = useState();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isOpenTable, setIsOpenTable] = useState(false);
    const [tableData, setTableData] = useState(table);
    let pathNames = location.pathname.split("/");
    const removePathNames = ["", "admin"];
    pathNames = pathNames.filter(pathName => !removePathNames.includes(pathName));
    let data = [];
    pathNames.map((pathName, index) => {
        const redirectItem = dataRedirect.filter(redirectItem => redirectItem.key === pathName)[0];
        if (redirectItem) {
            data.push({
                id: data.length + 1,
                name: redirectItem?.name,
                path: `/admin/${pathNames.slice(0, index + 1).join("/")}`
            });
            if (redirectItem?.nextName) {
                data.push({
                    id: data.length + 1,
                    name: redirectItem?.nextName,
                    path: `/admin/${pathNames.slice(0, index + 1).join("/")}`
                });
            }
        }

    });
    window.addEventListener("click", (e) => {
        if (uploadFileRef.current && !uploadFileRef.current.contains(e.target)) {
            setOpenUploadFile(false);
        }
    });
    const handleInputOnChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleTabs = (e) => {
        let id = e.currentTarget.dataset.id;
        setCompared(parseInt(id));
    };
    useEffect(() => {
        let listLi = document.querySelectorAll(".tabs .item");
        listLi.forEach((e) => {
            let id = e.dataset.id;
            if (parseInt(id) === compared) {
                setDistance(e.offsetLeft + e.firstElementChild.offsetLeft);
                setWidth(e.firstElementChild.offsetWidth);
            }
        });
    }, [compared]);


    //Search Advanced
    const handleClickSearchAdvanced = () => {
        if (pathNames.includes('director')) {
            navigate('/admin/director/searchAdvanced');
        }
        else {
            setIsOpenSearch(true);
        }
    };
    return (
        <>
            {isOpenSearch &&
                <Modal closePopup={setIsOpenSearch}>
                    <PopupSearch openList={setIsOpenTable} closePopup={setIsOpenSearch} />
                </Modal>
            }
            {(isOpenTable)
                &&
                <Modal closePopup={setIsOpenTable}>
                    <div className="searchAdvanced__popup">
                        <div className="searchAdvanced__popup--close">
                            <img src={closeIcon} alt="svg" onClick={() => {
                                setIsOpenSearch(false);
                                setIsOpenTable(false);
                            }} />
                        </div>
                        <div className="searchAdvanced__popup--button">
                            <MainButton icon={dispatchIcon} className="mainButton">Chuyển xử lý</MainButton>
                            <MainButton className="mainButton bigger">Dự thảo văn bản trả lời</MainButton>
                            <MainButton icon={returnIcon} className="mainButton">Trả lại</MainButton>
                        </div>
                        <table className="searchAdvanced__popup--table">
                            <thead>
                                <th>
                                    <div className="thWrapper">
                                        <input type="checkbox" />
                                    </div>
                                </th>
                                <th>
                                    <div className="thWrapper">
                                        Số kí hiệu
                                        <img src={tableArrow} alt="" />
                                    </div>

                                </th>
                                <th>
                                    <div className="thWrapper">
                                        Ngày PH
                                        <img src={tableArrow} alt="" />
                                    </div>

                                </th>
                                <th>
                                    <div className="thWrapper">
                                        Người soạn
                                        <img src={tableArrow} alt="" />
                                    </div>

                                </th>
                                <th>
                                    <div className="thWrapper">
                                        Người ký
                                        <img src={tableArrow} alt="" />
                                    </div>

                                </th>
                                <th>
                                    <div className="thWrapper">
                                        Thông tin công văn
                                        <img src={tableArrow} alt="" />
                                    </div>
                                </th>
                            </thead>
                            <tbody>
                                {tableData.map((e, index) => {
                                    return (
                                        <tr e={e.id}>
                                            <td>
                                                <input type="checkbox" defaultChecked={e.isChecked} onChange={(event) => {
                                                    const value = event.target.checked;
                                                    setTableData(prev => {
                                                        const data = prev;
                                                        data[index].isChecked = value;
                                                        return data;
                                                    });
                                                }} />
                                            </td>
                                            <td>
                                                {e.signalNum}
                                            </td>
                                            <td>
                                                {e.date}
                                            </td>
                                            <td>
                                                {e.personSign}
                                            </td>
                                            <td>
                                                {e.personCompose}
                                            </td>
                                            <td>
                                                {e.info}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                        <div className="searchAdvanced__popup--paginate">
                            <div className="left">
                                <p>Hiển thị</p>
                                <div className="inputGroup">
                                    <input type="number" defaultValue={6} />
                                    <img src={arrowDown} alt="svg" />
                                </div>
                                <p>trong tổng số 100 dữ liệu</p>
                            </div>
                            <div className="right">
                                <img src={doubleArrow} alt="svg" />
                                <img src={arrowDown} alt="svg" style={{ margin: '0 14px', transform: 'rotate(90deg)' }} />
                                <p className='active'>1</p>
                                <p>2</p>
                                <p>...</p>
                                <p>15</p>
                                <img src={arrowDown} alt="svg" style={{ margin: '0 14px', transform: 'rotate(-90deg)' }} />
                                <img src={doubleArrow} alt="svg" style={{ transform: 'rotate(180deg)' }} />

                            </div>
                        </div>
                    </div>
                </Modal>
            }
            {
                !containsUndefined(data) &&
                <div className='official-dispatch'>
                    <div className="container-fluid">
                        <RedirectHead data={data} className="mainButton" style={{ width: '250px' }} icon={searchIcon} onClick={handleClickSearchAdvanced}>Tìm kiếm nâng cao</RedirectHead>
                        {
                            pathNames?.includes('director') &&
                            <div className="group-operation">
                                <div className="group-button">
                                    {((compared === 0) && pathNames?.includes('document-come')) && <MainButton icon={transferIcon} className="mainButton big">Chuyển xử lý</MainButton>}
                                    {((compared === 0) && pathNames?.includes('document-come')) && <MainButton className="mainButton" style={{ width: "260px" }}>Dự thảo văn bản trả lời</MainButton>}
                                    {((compared === 1) && pathNames?.includes('document-come')) && <MainButton icon={endIcon} className="mainButton">Kết thúc</MainButton>}
                                    {((compared === 2) && pathNames?.includes('document-come')) && <MainButton icon={seenIcon} className="mainButton" style={{ width: "220px" }}>Xác nhận đã xem</MainButton>}
                                    {((compared === 0 || compared === 2) && pathNames?.includes('document-come')) && <MainButton icon={returnIcon} className="mainButton">Trả lại</MainButton>}
                                    {pathNames?.includes('document-out') && <MainButton icon={addIcon} className="mainButton big">Thêm mới</MainButton>}
                                    {pathNames?.includes('document-out') && <MainButton icon={transferIcon} className="mainButton big">Chuyển xử lý</MainButton>}
                                    {pathNames?.includes('document-out') && <MainButton icon={returnIcon} className="mainButton">Trả lại</MainButton>}
                                </div>

                                <div className="search">
                                    <div className="search-svg">
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.71 16.29L14.31 12.9C15.407 11.5025 16.0022 9.77666 16 8C16 6.41775 15.5308 4.87103 14.6518 3.55544C13.7727 2.23985 12.5233 1.21447 11.0615 0.608967C9.59966 0.00346625 7.99113 -0.15496 6.43928 0.153721C4.88743 0.462403 3.46197 1.22433 2.34315 2.34315C1.22433 3.46197 0.462403 4.88743 0.153721 6.43928C-0.15496 7.99113 0.00346625 9.59966 0.608967 11.0615C1.21447 12.5233 2.23985 13.7727 3.55544 14.6518C4.87103 15.5308 6.41775 16 8 16C9.77666 16.0022 11.5025 15.407 12.9 14.31L16.29 17.71C16.383 17.8037 16.4936 17.8781 16.6154 17.9289C16.7373 17.9797 16.868 18.0058 17 18.0058C17.132 18.0058 17.2627 17.9797 17.3846 17.9289C17.5064 17.8781 17.617 17.8037 17.71 17.71C17.8037 17.617 17.8781 17.5064 17.9289 17.3846C17.9797 17.2627 18.0058 17.132 18.0058 17C18.0058 16.868 17.9797 16.7373 17.9289 16.6154C17.8781 16.4936 17.8037 16.383 17.71 16.29ZM2 8C2 6.81332 2.3519 5.65328 3.01119 4.66658C3.67047 3.67989 4.60755 2.91085 5.7039 2.45673C6.80026 2.0026 8.00666 1.88378 9.17055 2.11529C10.3344 2.3468 11.4035 2.91825 12.2426 3.75736C13.0818 4.59648 13.6532 5.66558 13.8847 6.82946C14.1162 7.99335 13.9974 9.19975 13.5433 10.2961C13.0892 11.3925 12.3201 12.3295 11.3334 12.9888C10.3467 13.6481 9.18669 14 8 14C6.4087 14 4.88258 13.3679 3.75736 12.2426C2.63214 11.1174 2 9.5913 2 8Z" fill="#888888" />
                                        </svg>
                                    </div>
                                    <input type="text" className="search-input" placeholder="Nhập từ khoá tìm kiếm" />
                                </div>
                            </div>
                        }

                        {pathNames?.includes('director') ?
                            <>
                                {pathNames?.includes('document-come') && <div className="tabs">
                                    <div
                                        className={`item ${compared === 0 ? "active" : ""}`}
                                        data-id={0}
                                        onClick={(e) => handleTabs(e)}
                                    >
                                        <p>CV đang xử lý</p>
                                    </div>
                                    <div
                                        className={`item ${compared === 1 ? "active" : ""}`}
                                        data-id={1}
                                        onClick={(e) => handleTabs(e)}
                                    >
                                        <p>CV đã xử lý</p>
                                    </div>
                                    <div
                                        className={`item ${compared === 2 ? "active" : ""}`}
                                        data-id={2}
                                        onClick={(e) => handleTabs(e)}
                                    >
                                        <p>CV thông báo</p>
                                    </div>

                                    <div
                                        className="line"
                                        style={{ left: distance + "px", width: width + "px" }}
                                    ></div>
                                </div>}
                                {pathNames?.includes('document-out') && <div className="tabs">
                                    <div
                                        className={`item ${compared === 0 ? "active" : ""}`}
                                        data-id={0}
                                        onClick={(e) => handleTabs(e)}
                                    >
                                        <p>Dự thảo công văn</p>
                                    </div>
                                    <div
                                        className={`item ${compared === 1 ? "active" : ""}`}
                                        data-id={1}
                                        onClick={(e) => handleTabs(e)}
                                    >
                                        <p>CV trả lại</p>
                                    </div>
                                    <div
                                        className={`item ${compared === 2 ? "active" : ""}`}
                                        data-id={2}
                                        onClick={(e) => handleTabs(e)}
                                    >
                                        <p>Chuyển phát hành</p>
                                    </div>
                                    <div
                                        className={`item ${compared === 3 ? "active" : ""}`}
                                        data-id={3}
                                        onClick={(e) => handleTabs(e)}
                                    >
                                        <p>CV đã phát hành</p>
                                    </div>
                                    <div
                                        className={`item ${compared === 4 ? "active" : ""}`}
                                        data-id={4}
                                        onClick={(e) => handleTabs(e)}
                                    >
                                        <p>CV SVHTT đã phát hành</p>
                                    </div>
                                    <div
                                        className="line"
                                        style={{ left: distance + "px", width: width + "px" }}
                                    ></div>
                                </div>}

                                <div className="main">
                                    <div className="left-director">
                                        <div className="row row-header">
                                            <Checkbox checkAll={checkAll} handleClickCheckbox={handleClickCheckAll} selectedValues={selectedValues} />
                                            <span className="date">Ngày đến</span>
                                            <span className="name">Tên công văn</span>
                                        </div>
                                        <div className="list">
                                            {
                                                dataForDirectorCheckbox.map((data) => {
                                                    return (
                                                        <div className="row " key={uuidv4()}>
                                                            <Checkbox value={data.id} handleClickCheckbox={handleClickCheckbox} selectedValues={selectedValues} />
                                                            <span className="date">29/08/2022</span>
                                                            <span className="name">Số 1022/UBND-VHTT ngày 30/06/2022 Trích yếu ý kiến đối với dự thảo danh sách đề...</span>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>


                                    </div>
                                    <div className="right-director">
                                        <ImageReview />
                                    </div>
                                </div>
                            </>
                            : <div className="official-dispatch__main" style={{ padding: '24px 40px', marginTop: '26px', boxShadow: "0px 6px 12px rgba(28, 73, 143, 0.08)", borderRadius: '6px' }}>
                                <div className="head-title">
                                    <div className="title" style={{ fontSize: '20px', marginBottom: '32px', fontWeight: 600 }}>
                                        {data[data.length - 1]?.name}
                                    </div>
                                    <div className="upload-file" onClick={(e) => { e.stopPropagation(); setOpenUploadFile(true); }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.1476 10.7578C12.1301 10.7354 12.1076 10.7173 12.0821 10.7048C12.0565 10.6923 12.0284 10.6859 11.9999 10.6859C11.9715 10.6859 11.9434 10.6923 11.9178 10.7048C11.8922 10.7173 11.8698 10.7354 11.8523 10.7578L9.22728 14.0789C9.20564 14.1065 9.19221 14.1397 9.18853 14.1746C9.18485 14.2095 9.19107 14.2447 9.20647 14.2763C9.22187 14.3078 9.24584 14.3344 9.27563 14.3529C9.30542 14.3715 9.33983 14.3813 9.37493 14.3812H11.107V20.0625C11.107 20.1656 11.1913 20.25 11.2945 20.25H12.7007C12.8038 20.25 12.8882 20.1656 12.8882 20.0625V14.3836H14.6249C14.782 14.3836 14.8687 14.2031 14.7726 14.0812L12.1476 10.7578Z" fill="#1A48E9" />
                                            <path d="M19.0172 8.59453C17.9438 5.76328 15.2086 3.75 12.0047 3.75C8.80078 3.75 6.06562 5.76094 4.99219 8.59219C2.98359 9.11953 1.5 10.95 1.5 13.125C1.5 15.7148 3.59766 17.8125 6.18516 17.8125H7.125C7.22813 17.8125 7.3125 17.7281 7.3125 17.625V16.2188C7.3125 16.1156 7.22813 16.0312 7.125 16.0312H6.18516C5.39531 16.0312 4.65234 15.7172 4.09922 15.1477C3.54844 14.5805 3.25547 13.8164 3.28125 13.0242C3.30234 12.4055 3.51328 11.8242 3.89531 11.3344C4.28672 10.8352 4.83516 10.4719 5.44453 10.3102L6.33281 10.0781L6.65859 9.22031C6.86016 8.68594 7.14141 8.18672 7.49531 7.73438C7.8447 7.28603 8.25857 6.89191 8.72344 6.56484C9.68672 5.8875 10.8211 5.52891 12.0047 5.52891C13.1883 5.52891 14.3227 5.8875 15.2859 6.56484C15.7523 6.89297 16.1648 7.28672 16.5141 7.73438C16.868 8.18672 17.1492 8.68828 17.3508 9.22031L17.6742 10.0758L18.5602 10.3102C19.8305 10.6523 20.7188 11.8078 20.7188 13.125C20.7188 13.9008 20.4164 14.632 19.868 15.1805C19.599 15.451 19.2791 15.6655 18.9266 15.8115C18.5742 15.9576 18.1963 16.0323 17.8148 16.0312H16.875C16.7719 16.0312 16.6875 16.1156 16.6875 16.2188V17.625C16.6875 17.7281 16.7719 17.8125 16.875 17.8125H17.8148C20.4023 17.8125 22.5 15.7148 22.5 13.125C22.5 10.9523 21.0211 9.12422 19.0172 8.59453Z" fill="#1A48E9" />
                                        </svg>
                                        <span>Tải lên tài liệu  </span>
                                    </div>
                                </div>

                                <div className="wrapper" >
                                    <div className="left">
                                        <span>Chọn ngày*</span>
                                        <ReactDatePicker
                                            selectsRange={true}
                                            startDate={startDate}
                                            endDate={endDate}
                                            onChange={(update) => {
                                                setDateRange(update);
                                            }}
                                            isClearable={true}
                                        />
                                        <div className="list">
                                            {
                                                [...Array(20).keys()].map(item => {
                                                    return <WordFileItem key={uuidv4()} />;
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="right">
                                        <ImageReview />
                                    </div>

                                </div>
                                {openUploadFile &&
                                    <div className="upload-file-wrapper">
                                        <div className="upload-file" ref={uploadFileRef}>
                                            <input type="file" className="upload-file-input" onChange={handleInputOnChange} />
                                            <UploadGroup sub="JPG, PNG hoặc PDF, Word, Excel">
                                                Chọn một tệp tin hoặc kéo và thả ở đây


                                            </UploadGroup>
                                            {file && <StatusLoading icon={imgFile} name="Bản vẽ kỹ thuật Di tích Địa đạo Củ Chi" size="2.5" />}
                                            <div className="svg" onClick={() => setOpenUploadFile(false)}>
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.40994 7.00019L12.7099 2.71019C12.8982 2.52188 13.004 2.26649 13.004 2.00019C13.004 1.73388 12.8982 1.47849 12.7099 1.29019C12.5216 1.10188 12.2662 0.996094 11.9999 0.996094C11.7336 0.996094 11.4782 1.10188 11.2899 1.29019L6.99994 5.59019L2.70994 1.29019C2.52164 1.10188 2.26624 0.996094 1.99994 0.996094C1.73364 0.996094 1.47824 1.10188 1.28994 1.29019C1.10164 1.47849 0.995847 1.73388 0.995847 2.00019C0.995847 2.26649 1.10164 2.52188 1.28994 2.71019L5.58994 7.00019L1.28994 11.2902C1.19621 11.3832 1.12182 11.4938 1.07105 11.6156C1.02028 11.7375 0.994141 11.8682 0.994141 12.0002C0.994141 12.1322 1.02028 12.2629 1.07105 12.3848C1.12182 12.5066 1.19621 12.6172 1.28994 12.7102C1.3829 12.8039 1.4935 12.8783 1.61536 12.9291C1.73722 12.9798 1.86793 13.006 1.99994 13.006C2.13195 13.006 2.26266 12.9798 2.38452 12.9291C2.50638 12.8783 2.61698 12.8039 2.70994 12.7102L6.99994 8.41019L11.2899 12.7102C11.3829 12.8039 11.4935 12.8783 11.6154 12.9291C11.7372 12.9798 11.8679 13.006 11.9999 13.006C12.132 13.006 12.2627 12.9798 12.3845 12.9291C12.5064 12.8783 12.617 12.8039 12.7099 12.7102C12.8037 12.6172 12.8781 12.5066 12.9288 12.3848C12.9796 12.2629 13.0057 12.1322 13.0057 12.0002C13.0057 11.8682 12.9796 11.7375 12.9288 11.6156C12.8781 11.4938 12.8037 11.3832 12.7099 11.2902L8.40994 7.00019Z" fill="#434547" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>
                        }

                    </div >

                </div >
            }
        </>
    );
}
