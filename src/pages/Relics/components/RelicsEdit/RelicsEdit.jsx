import 'quill/dist/quill.snow.css';
import React, { useEffect, useRef, useState } from 'react';
import { useQuill } from 'react-quilljs';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import closeButton from '../../../../assets/svg/cancel.svg';
import checked from '../../../../assets/svg/checkedWhite.svg';
import imgFile from '../../../../assets/svg/img_file.svg';
import eyeIcon from '../../../../assets/svg/preview.svg';
import videoFile from '../../../../assets/svg/video_file.svg';
import Loading from '../../../../components/Loading/Loading';
import MainButton from '../../../../components/MainButton/MainButton';
import Options from '../../../../components/Options/Options';
import Redirect from '../../../../components/Redirect/Redirect';
import RelicsDetailItem from '../../../../components/RelicsDetailItem/RelicsDetailItem';
import StatusLoading from '../../../../components/StatusLoading/StatusLoading';
import UploadGroup from '../../../../components/UploadGroup/UploadGroup';
import { districts } from '../../../../constant/constant';
import success from '../../../../assets/svg/success.svg';
import { showLoading } from '../../../../store/Reducer/loadingReducer';

import { editRelicsItemReducer, fetchRelicsDetail } from '../../../../store/Reducer/relicsReducer';
import Swal from 'sweetalert2';

import './RelicsEdit.scss';
let data = [
    { id: 1, name: 'P. Lập Hồ Sơ Di Tích', path: '/admin/document' },
    { id: 2, name: 'Hồ sơ', path: '/admin/relics' },
    { id: 3, name: 'Chỉnh sửa', path: '/admin/relics/detail' },
];


export default function RelicsEdit() {
    const [isChecked, setIsChecked] = useState(false);
    const { relicsDetail } = useSelector(store => store.relics);
    const { loading, redirect } = useSelector(store => store.loading);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const formData = new FormData();
    const dispatch = useDispatch();
    const { quill, quillRef } = useQuill();
    const [des, setDes] = useState();
    const [technicalReview, setTechnicalReview] = useState();
    const [zoneReview, setZonelReview] = useState();
    const [videoReview, setVideoReview] = useState();
    const [error, setError] = useState({});
    const avatarRef = useRef();
    const navigate = useNavigate();
    let exchange = 1048570;
    // const [result, setResult] = useState({
    //     name: '',
    //     address: '',
    //     district: '',
    //     description: '',
    //     level: '',
    //     avatar: '',
    //     video: [],
    //     technical_drawings: [],
    //     zoning_drawings: [],
    // });
    const [result, setResult] = useState({
        name: 'Di tích lịch sử Địa đạo Củ Chi',
        address: 'Ấp 2 thuộc xã Tân Kiên – Bình Chánh',
        district: 'd1',
        description: 'haha',
        level: 'NA',
        avatar: 'https://accgroup.vn/wp-content/uploads/2022/02/Di-tich-la-gi-Cap-nhat-2022.jpg',
        video: ['https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-palm-covered-beach-44364-large.mp4'],
        technical_drawings: ['https://cdnmedia.baotintuc.vn/Upload/CCcQv1fjdlI5Hob1jh0mA/files/2020/10/04/IMG_0505.JPG'],
        zoning_drawings: ['https://vnn-imgs-f.vgcloud.vn/2020/05/13/08/ha-noi-nhieu-di-tich-mo-cua-tro-lai-2.jpg'],
    });
    const arrSize = result?.video?.map(e => Number((e.size / exchange).toFixed(2)));
    const arrTechnicals = result?.technical_drawings?.map(e => Number((e.size / exchange).toFixed(2)));
    const arrMaps = result?.zoning_drawings?.map(e => Number((e.size / exchange).toFixed(2)));

    const handleRadio = (e) => {
        setResult({ ...result, level: e });
    };
    const handleVideo = (e) => {
        let arrFiles = [];
        let files = e.target.files;
        const length = e.target.files.length;
        for (let i = 0; i < length; i++) {
            Number((files[i].size / exchange).toFixed(2));
            arrFiles.push(files[i]);
        }
        setResult({ ...result, video: [...result.video, ...arrFiles] });
    };
    const handleTechnicals = (e) => {
        let arrFiles = [];
        let files = e.target.files;
        const length = e.target.files.length;
        for (let i = 0; i < length; i++) {
            Number((files[i].size / exchange).toFixed(2));
            formData.append(`technical_drawings`, files[i]);
            arrFiles.push(files[i]);
        }
        setResult({ ...result, technical_drawings: [...result.technical_drawings, ...arrFiles] });
    };
    const handleMaps = (e) => {
        let arrFiles = [];
        let files = e.target.files;
        const length = e.target.files.length;
        for (let i = 0; i < length; i++) {
            Number((files[i].size / exchange).toFixed(2));
            arrFiles.push(files[i]);
        }

        setResult({ ...result, zoning_drawings: [...result.zoning_drawings, ...arrFiles] });

    };
    const handleAvatar = (e) => {
        let file = e.target.files[0];
        let src = URL.createObjectURL(e.target.files[0]);
        file.preview = src;
        setResult({ ...result, avatar: e.target.files[0] });
    };
    const handleDelete = (arr, id, name) => {
        let newArr = arr?.filter((e, index) => {
            return index !== id;
        });
        if (name === 'videos') {
            setResult({ ...result, video: newArr });
        }
        if (name === 'technicals') {
            setResult({ ...result, technical_drawings: newArr });

        }
        if (name === 'maps') {
            setResult({ ...result, zoning_drawings: newArr });

        }
        if (name === 'avatar') {
            setResult({ ...result, avatar: '' });
            avatarRef.current.value = '';
        }
    };
    const handleInputText = (e, name) => {
        let value = e.currentTarget.value;
        setResult({ ...result, [name]: value });
    };

    // useEffect(() => {
    //     if (Object.keys(relicsDetail).length > 0) {
    //         setResult({
    //             ...result,
    //             name: relicsDetail.name,
    //             address: relicsDetail.address,
    //             description: relicsDetail.description,
    //             level: relicsDetail.level,
    //             district: relicsDetail.district,
    //             avatar: relicsDetail.avatar,
    //             technical_drawings: relicsDetail.technical_drawings_files,
    //             zoning_drawings: relicsDetail.zoning_drawings_files,
    //             video: relicsDetail.video_files
    //         });
    //     }
    // }, [relicsDetail]);
    useEffect(() => {
        dispatch(fetchRelicsDetail(id));
    }, []);
    useEffect(() => {
        return () => {
            result.avatar && URL.revokeObjectURL(result.avatar.preview);
        };
    }, [result.avatar]);
    useEffect(() => {
        setResult({ ...result, description: des });
    }, [des]);

    useEffect(() => {
        let arrSrcTech = [];
        let arrSrcZone = [];
        let arrVideo = [];
        if (result.technical_drawings.length > 0) {
            result.technical_drawings.forEach(e => {
                if (typeof e === 'string') {
                    arrSrcTech.push(e);
                } else {
                    let src = URL.createObjectURL(e);
                    arrSrcTech.push(src);
                }
            });
        }
        if (result.zoning_drawings.length > 0) {
            result.zoning_drawings.forEach(e => {
                if (typeof e === 'string') {
                    arrSrcZone.push(e);
                } else {
                    let src = URL.createObjectURL(e);
                    arrSrcZone.push(src);
                }
            });
        }
        if (result.video.length > 0) {
            result.video.forEach(e => {
                if (typeof e === 'string') {
                    arrVideo.push(e);
                } else {
                    let src = URL.createObjectURL(e);
                    arrVideo.push(src);
                }
            });
        }
        setTechnicalReview(arrSrcTech);
        setZonelReview(arrSrcZone);
        setVideoReview(arrVideo);
    }, [result.technical_drawings, result.zoning_drawings, result.video]);
    useEffect(() => {
        if (isChecked) {
            document.body.style.position = 'fixed';
        } else {
            document.body.style.position = 'static';
        }
    }, [isChecked]);
    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setDes(quillRef.current.firstChild.innerHTML);
            });
        }
    }, [quill]);
    useEffect(() => {
        if (quill) {
            document.querySelector('.ql-container > .ql-editor').innerHTML = '<p>Bảo tàng Lịch sử Thành phố Hồ Chí Minh tọa lạc tại số 2 đường Nguyễn Bỉnh Khiêm, phường Bến Nghé, Quận 1, trong khuôn viên Thảo Cầm Viên Sài Gòn. Đây là nơi bảo tồn và trưng bày hàng chục ngàn hiện vật quý được sưu tầm trong và ngoài nước Việt Nam.</p><p><br></p><p><strong>Lịch sử</strong></p><p>Ngày 18 tháng 2 năm 1927, nhà sưu tầm cổ vật Holbé qua đời, để lại nhiều cổ vật trị giá 45.000 đồng bạc Đông Dương (là một số tiền lớn lúc bấy giờ).</p><p><br></p><p>Để mua lại số cổ vật này, ngày 17 tháng 6 năm ấy, Hội Nghiên cứu Đông Dương (Société des Études indochinoises, kể từ đây có khi gọi tắt là Hội đã tổ chức một cuộc họp bất thường, và cuối cùng đi đến quyết định là: xin 5 hội viên hảo tâm cho mượn trước số tiền trên, đồng thời xin phép chính quyền cho mở cuộc lạc quyên số tiền ấy trong dân chúng (để trả lại), với cam kết là sẽ tặng lại nhà nước số cổ vật sau khi mua xong.</p><p><br></p><p>Sau khi hoàn tất công việc trên, để có chỗ gìn giữ và trưng bày số di vật của Holbé vừa mua được, cùng với nhiều cổ vật khác mà Hội đã có (nhờ thu mua hay được tặng), Hội đã đề nghị với chính quyền xây dựng Bảo tàng, và xin dành cho Hội một phòng làm trụ sở và thư viện của Hội (chứa trên 5.000 tác phẩm chuyên khảo về Đông Dương và Viễn Đông bằng các thứ tiếng).</p><p><br></p><p>Thuận theo đề nghị, ngày 28 tháng 11 năm 1927, Thống đốc Nam Kỳ là Blanchard de la Brosse đã ký nghị định thành lập Bảo tàng Pacha Đa Lagos (kể từ đây có khi gọi là Bảo tàng) ở Sài Gòn, đặt dưới quyền kiểm soát trực tiếp của chính quyền Nam Kỳ, và thuộc quyền kiểm soát khoa học của Viện Viễn Đông Bác cổ.</p><p><br></p><p>Ngày 8 tháng 6 năm 1928, viên Bảo thủ văn thư của Hội là Jean Bouchot được cử làm Giám thủ đầu tiên của Bảo tàng Và ngày 1 tháng 1 năm 1929, chính quyền Nam Kỳ đã long trọng khánh thành Bảo tàng Pacha Đa Lagos</p><p><br></p><p>Ngày 2 tháng 9 năm 1945, Việt Nam chính thức phục hồi nền độc lập sau gần 100 năm Pháp thuộc. Ngày 20 tháng 10 năm ấy, Bộ Quốc gia Giáo dục nước Việt Nam Dân chủ Cộng hòa ra nghị định đổi tên các Học viện, Thư viện và Bảo tàng. Theo đó, Bảo tàng Phacha Đa Lagos được đổi tên là Gia Định Bảo tàng việt. Tuy nhiên, đó chỉ là lý thuyết vì ngày 23 tháng 9 năm 1945, quân Pháp đã tái chiếm Sài Gòn.</p><p><br></p><p>Đến ngày 14 tháng 6 năm 1954, Bảo tàng được Bộ Quốc gia Giáo dục của Chính phủ Việt Nam Cộng hòa tiếp thu trọn vẹn, sau khi 3 chuyên gia người Pháp rút về nước.</p><p><br></p><p>Ngày 16 tháng 5 năm 1956, theo nghị định 321-GD/NĐ, đổi tên Bảo tàng là Viện bảo tàng Quốc gia Việt Nam thuộc Bộ Quốc gia Giáo dục. Ngày 3 tháng 9 năm 1958, Viện bảo tàng Quốc gia Việt Nam chính thức mở cửa đón khách tham quan.</p><p><br></p><p>Sau ngày 30 tháng 4 năm 1975, Bảo tàng được Chính quyền Cách mạng tiếp thu nguyên vẹn. Sau đó, vào ngày 26 tháng 8 năm 1979), ngành chức năng đã cho đổi tên là Bảo tàng Lịch sử Thành phố Hồ Chí Minh. Sau đổi lại là Bảo tàng Lịch sử Việt Nam - Thành phố Hồ Chí Minh và năm 2013 đổi lại tên Bảo tàng Lịch sử Thành phố Hồ Chí Minh như quyết định thành lập ban đầu.</p><p><br></p><p><strong>Kiến trúc</strong></p><p>Bảo tàng Blanchard de la Brosse tọa lạc trong một khu đất rộng nằm trong một khu vườn rộng lớn (trở thành Thảo Cầm Viên Sài Gòn năm 1864) ở phía đông thành Phiên An, gần dinh Tân Xá (do chúa Nguyễn Ánh xây dựng để Giám mục Bá Đa Lộc làm nơi dạy dỗ Hoàng tử Cảnh).</p><p><br></p><p>Bảo tàng được xây theo lối kiến trúc "Đông Dương cách tân" (style indochinois), do kiến trúc sư người Pháp Delaval thiết kế, và do hãng thầu Etablissements Lamorte Saigon thực hiện trong ba năm: 1926-1927-1928. Khi khởi xây (1926), tòa nhà này dự kiến làm Viện Triển lãm Mễ cốc (Musée du Riz), sau định làm Viện Triển Lãm Kinh tế (Musee économique), nhưng cuối cùng lại quyết định làm Bảo tàng Blanchard de la Brosse.[8]</p><p><br></p><p>Phần giữa Bảo tàng có một khối bát giác (gợi nhớ quan niệm về bát quái của Kinh Dịch) có 2 nóc mái lợp ngói ống, có gắn vật trang trí hình phụng, hình rồng cách điệu. Trên cùng, là 4 quả cầu nhỏ dần và đặt chồng lên nhau. Vì vậy, có người cho rằng phần nóc mái này, mang nhiều yếu tố của kiến trúc cổ Trung Quốc.</p><p><br></p><p>Năm 1970, Bảo tàng được xây dựng thêm phần phía sau một dãy nhà do kiến trúc sư Nguyễn Bá Lăng thiết kế. Dãy nhà có hình chữ U, ở giữa là hồ cây cảnh lộ thiên, hai dãy nhà nối hai bên, sau cùng là dãy nhà ba tầng với hai lớp mái, có gắn đầu rồng kiểu gặm trang trí ở các góc mái. Nhờ các cửa đều hướng ra hồ cây cảnh, nên phòng trưng bày khá thoáng mát và sáng sủa.</p><p><br></p><p><strong>Trưng bày</strong></p><p>Hiện nay, hệ thống trưng bày của bảo tàng Bảo tàng gồm 2 phần:</p><p>Phần 1: Lịch sử Việt Nam từ thời Tiền sử (cách nay khoảng 500.000 năm) cho đến hết thời nhà Nguyễn (1945):</p><p>Thời Tiền sử (cách nay khoảng 500.000 năm – 2879 Trước. CN)</p><p>Thời kim khí – Hùng Vương dựng nước (2879 Tcn – 179 Tr. CN)</p><p>Thời Bắc thuộc – Đấu tranh giành lại độc lập (179 TCN – 938)</p><p>Thời Ngô – Đinh – Tiền Lê – Lý (939 – 1225)</p><p>Thời Trần – Hồ (1266</p>';
        }
    }, [relicsDetail, quill]);
    useEffect(() => {
        let listQl = document.querySelectorAll('.textEditor .ql-toolbar');
        if (listQl.length > 1) {
            document.querySelector('.textEditor').removeChild(listQl[0]);
        }
    });

    const handleSubmit = () => {
        let objError = {};
        if (result.name === '') {
            objError.name = 'Vui lòng nhập trường này';
        }
        if (result.address === '') {
            objError.address = 'Vui lòng nhập trường này';
        };
        if (result.district === '') {
            objError.district = 'Vui lòng nhập trường này';
        };
        if (result.level === '') {
            objError.level = 'Vui lòng nhập trường này';
        };
        if (!result.description || result.description === '<p><br></p>') {
            objError.description = 'Vui lòng nhập trường này';
        };
        if (Object.keys(objError).length < 1) {
            // formData.append("name", result.name);
            // formData.append("address", result.address);
            // formData.append("district", result.district);
            // formData.append("description", result.description);
            // formData.append("level", result.level);
            // formData.append("avatar", result.avatar);
            // result?.technical_drawings.forEach((file, index) => {
            //     formData.append("technical_drawings", file);
            // });
            // result?.zoning_drawings.forEach(file => {
            //     formData.append("zoning_drawings", file);
            // });
            // result?.video.forEach(file => {
            //     formData.append("video", file);
            // });
            // dispatch(showLoading());
            // dispatch(editRelicsItemReducer({ id, data: formData }));

            Swal.fire(
                {
                    showConfirmButton: false,
                    html: `<div class="popupDeleteRelics"><img src=${success}><p class="warning">Sửa thành công!</p><p class="warningSub" style="margin-bottom:20px;">Bạn đã chỉnh sửa thành công!<p class="warningSub">Di tích địa đạo củ chi đã được chỉnh sửa.</p></p></div>`,
                    timer: 1500
                }
            );
            setTimeout(() => {
                navigate('/admin/relics');
            }, 1500);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng điền các trường bắt buộc!',
                showConfirmButton: false,
                timer: 1500
            });
            setError(objError);
        }
    };

    const handlePopup = () => {
        setIsChecked(true);
    };
    const handleClosePopup = () => {
        setIsChecked(false);
    };
    const clearInputFile = (e) => {
        e.currentTarget.value = '';
    };
    if (redirect) return <Navigate to="/admin/relics" />;
    return (
        <div className='relicsEdit'>
            {loading && <Loading />}
            <div className={`popup ${isChecked ? 'active' : ''}`}>
                <div className="close" onClick={handleClosePopup}>
                    <img src={closeButton} alt="icon_svg" />
                </div>
                <div className="name">{result.name}</div>
                <RelicsDetailItem video={videoReview} content={result.description} handleClosePopup={handleClosePopup} imgsTech={technicalReview || result.technical_drawings} imgsMap={zoneReview || result.zoning_drawings} />
            </div>
            <div className={`overlay ${isChecked ? 'active' : ''}`} onClick={handleClosePopup}></div>
            <div className="container-fluid">
                <div className="relicsEdit__head">
                    <Redirect data={data} />
                    <div className="button">
                        <MainButton icon={eyeIcon} onClick={handlePopup} className="mainButton white">Xem trước</MainButton>
                        <MainButton icon={checked} className="mainButton" onClick={handleSubmit}>Hoàn tất</MainButton>
                    </div>
                </div>
                <div className="relicsEdit__main">
                    <div className="title">Chỉnh sửa</div>
                    <label className={`group-input ${error.name && 'error'}`} >
                        <div className="label">Tên di tích *</div>
                        <input type="text" value={result.name} onChange={(e) => handleInputText(e, 'name')} />
                        {/* <div className="errorText">{error.name}</div> */}
                    </label>
                    <label className={`group-input ${error.address && 'error'}`}>
                        <div className="label">Địa chỉ*</div>
                        <input type="text" value={result.address} onChange={(e) => handleInputText(e, 'address')} />
                        {/* <div className="errorText">{error.address}</div> */}
                    </label>
                    <div className={`group-input ${error.description && 'error'}`}>
                        <div className="label">Mô tả*</div>
                        <div className='textEditor'>
                            <div ref={quillRef}></div>
                        </div>
                    </div>
                    <div className="relicsEdit__main--wrapper">
                        <div className="container">
                            <div className="group-input">
                                <div className="label">Upload video</div>
                                <div className="wrapper">
                                    <UploadGroup sub="hoặc">Kéo file vào đây</UploadGroup>
                                    <input type="file" onClick={clearInputFile} multiple className='uploadFile' onChange={handleVideo} accept="video/mp4,video/x-m4v" />
                                </div>
                            </div>
                            {result?.video?.length > 0 &&
                                <div className="group-status">
                                    <div className="label">Trạng thái</div>
                                    {result?.video?.map((e, index) => {
                                        return <StatusLoading handleDelete={handleDelete} key={index} id={index} kind={result.video} icon={videoFile} name={e.name || e.toString().slice(37)} size={arrSize[index] || 2} knowAs="videos" />;
                                    })}
                                </div>
                            }
                        </div>
                        <div className="container">
                            <div className="group-input">
                                <div className="label">Upload avatar</div>
                                <div className="wrapper">
                                    {result.avatar &&
                                        <div className="img">
                                            <img src={result.avatar.preview || result.avatar} alt="thumbnail" />
                                        </div>
                                    }
                                    <UploadGroup sub="hoặc">Kéo file vào đây</UploadGroup>
                                    <input type="file" onClick={clearInputFile} className='uploadFile' onChange={handleAvatar} accept="image/*" ref={avatarRef} />
                                </div>
                            </div>
                            {result.avatar &&
                                <div className="group-status">
                                    <div className="label">Trạng thái</div>
                                    {<StatusLoading handleDelete={handleDelete} name={result.avatar?.name || result.avatar.toString().slice(37)} size={Number((result.avatar.size / exchange || 1).toFixed(2))} icon={imgFile} knowAs="avatar" />}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="relicsEdit__main--wrapper">
                        <div className="container">
                            <div className="group-input">
                                <div className="label">Chèn bản vẽ kĩ thuật</div>
                                <div className="wrapper">
                                    <UploadGroup sub="hoặc">Kéo file vào đây</UploadGroup>
                                    <input type="file" onClick={clearInputFile} multiple className='uploadFile' onChange={handleTechnicals} accept="image/*" />
                                </div>
                            </div>
                            {result?.technical_drawings?.length > 0 &&
                                <div className="group-status">
                                    <div className="label">Trạng thái</div>
                                    {result?.technical_drawings?.map((e, index) => {
                                        return <StatusLoading handleDelete={handleDelete} key={index} id={index} kind={result.technical_drawings} icon={imgFile} name={e.name || e.toString().slice(37)} size={arrTechnicals[index] || 1} knowAs="technicals" />;
                                    })}
                                </div>
                            }
                        </div>
                        <div className="container">
                            <div className="group-input">
                                <div className="label">Chèn bản đồ khoanh vùng</div>
                                <div className="wrapper">
                                    <UploadGroup sub="hoặc">Kéo file vào đây</UploadGroup>
                                    <input type="file" multiple className='uploadFile' onChange={handleMaps} accept="image/*" />
                                </div>
                            </div>
                            {result?.zoning_drawings?.length > 0 &&
                                <div className="group-status">
                                    <div className="label">Trạng thái</div>
                                    {result?.zoning_drawings?.map((e, index) => {
                                        return <StatusLoading handleDelete={handleDelete} key={index} kind={result.zoning_drawings} id={index} icon={imgFile} name={e.name || e.toString().slice(37)} size={arrMaps[index] || 1} knowAs="maps" />;
                                    })}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="relicsEdit__main--wrapper">
                        <div className={`group-input ${error.district && 'error'}`}>
                            <div className="label">Vị trí *</div>
                            <Options options={districts} result={result} setDistrict={setResult} districtEdit={result.district} />
                        </div>
                        <div className={`group-input ${error.level && 'error'}`}>
                            <div className="label">Loại di tích *</div>
                            <div className="radio-group">
                                <label onClick={() => handleRadio('SN')} className={`${result.level === 'SN' ? 'active' : ''}`}>
                                    <div className="radio-overlay"></div>
                                    <div className="label">Cấp quốc gia đặc biệt</div>
                                </label>
                                <label onClick={() => handleRadio('NA')} className={`${result.level === 'NA' ? 'active' : ''}`}>
                                    <div className="radio-overlay"></div>
                                    <div className="label">Cấp quốc gia</div>
                                </label>
                                <label onClick={() => handleRadio('CI')} className={`${result.level === 'CI' ? 'active' : ''}`}>
                                    <div className="radio-overlay"></div>
                                    <div className="label">Cấp thành phố</div>
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
