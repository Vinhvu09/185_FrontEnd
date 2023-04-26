import 'quill/dist/quill.snow.css';
import React, { useEffect, useRef, useState } from 'react';
import { useQuill } from 'react-quilljs';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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
import { showLoading } from '../../../../store/Reducer/loadingReducer';
import { postRelics } from '../../../../store/Reducer/relicsReducer';
import success from '../../../../assets/svg/success.svg';
import './RelicsCreate.scss';
let data = [
    { id: 1, name: 'P. Lập Hồ Sơ Di Tích', path: '/admin/document' },
    { id: 2, name: 'Hồ sơ', path: '/admin/relics' },
    { id: 3, name: 'Tạo mới', path: '/admin/relics/create' },
];
export default function RelicsCreate() {
    const [isChecked, setIsChecked] = useState(false);
    const { loading, redirect } = useSelector(store => store.loading);
    const navigate = useNavigate();
    const formData = new FormData();
    const dispatch = useDispatch();
    const { quill, quillRef } = useQuill();
    const [des, setDes] = useState();
    const [technicalReview, setTechnicalReview] = useState();
    const [zoneReview, setZonelReview] = useState();
    const [videoReivew, setVideoReview] = useState();
    const [result, setResult] = useState({
        name: '',
        address: '',
        district: '',
        description: '',
        level: '',
        avatar: '',
        video: [],
        technical_drawings: [],
        zoning_drawings: [],
    });
    const [error, setError] = useState({});
    const avatarRef = useRef();
    let exchange = 1048570;
    const arrSize = result?.video.map(e => Number((e.size / exchange).toFixed(2)));
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
            // result?.technical_drawings.forEach(file => {
            //     formData.append("technical_drawings", file);
            // });
            // result?.zoning_drawings.forEach(file => {
            //     formData.append("zoning_drawings", file);
            // });
            // result?.video.forEach(file => {
            //     formData.append("video", file);
            // });
            // dispatch(showLoading());
            // dispatch(postRelics(formData));

            //Xet' cung'
            Swal.fire(
                {
                    showConfirmButton: false,
                    html: `<div class="popupDeleteRelics"><img src=${success}><p class="warning">Tạo thành công!</p><p class="warningSub" style="margin-bottom:20px;">Bạn đã tạo thành công!<p class="warningSub">Di tích địa đạo củ chi đã được tạo.</p></p></div>`,
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
    useEffect(() => {
        return () => {
            result.avatar && URL.revokeObjectURL(result.avatar.preview);
        };
    }, [result.avatar]);
    useEffect(() => {
        setResult({ ...result, description: des });
    }, [des]);
    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setDes(quillRef.current.firstChild.innerHTML);
            });
        }
    }, [quill]);
    useEffect(() => {
        let arrSrcTech = [];
        let arrSrcZone = [];
        let arrVideo = [];
        result.technical_drawings.forEach(e => {
            let src = URL.createObjectURL(e);
            arrSrcTech.push(src);
        });
        result.zoning_drawings.forEach(e => {
            let src = URL.createObjectURL(e);
            arrSrcZone.push(src);
        });
        result.video.forEach(e => {
            let src = URL.createObjectURL(e);
            arrVideo.push(src);
        });
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
    const handlePopup = () => {
        setIsChecked(true);
    };
    const handleClosePopup = () => {
        setIsChecked(false);

    };
    if (redirect) return <Navigate to="/admin/relics" />;
    return (
        <div className='relicsCreate'>
            {loading && <Loading />}
            <div className={`popup ${isChecked ? 'active' : ''}`}>
                <div className="close" onClick={handleClosePopup}>
                    <img src={closeButton} alt="icon_svg" />
                </div>
                <div className="name">{result.name}</div>
                <RelicsDetailItem video={videoReivew} content={result.description} handleClosePopup={handleClosePopup} imgsTech={technicalReview} imgsMap={zoneReview} />
            </div>
            <div className={`overlay ${isChecked ? 'active' : ''}`} onClick={handleClosePopup}></div>
            <div className="container-fluid">
                <div className="relicsCreate__head">
                    <Redirect data={data} />
                    <div className="button">
                        <MainButton icon={eyeIcon} onClick={handlePopup} className="mainButton white">Xem trước</MainButton>
                        <MainButton icon={checked} className="mainButton" onClick={handleSubmit}>Hoàn tất</MainButton>
                    </div>
                </div>
                <div className="relicsCreate__main">
                    <div className="title">Tạo mới</div>
                    <label className={`group-input ${error.name && 'error'}`} >
                        <div className="label">Tên di tích *</div>
                        <input type="text" value={result.name} onChange={(e) => handleInputText(e, 'name')} />
                        {/* <div className="errorText">{error.name}</div> */}
                    </label>
                    <label className={`group-input ${error.address && 'error'}`}>
                        <div className="label">Địa chỉ *</div>
                        <input type="text" value={result.address} onChange={(e) => handleInputText(e, 'address')} />
                        {/* <div className="errorText">{error.address}</div> */}
                    </label>
                    <div className={`group-input ${error.description && 'error'}`}>
                        <div className="label">Mô tả*</div>
                        <div className='textEditor'>
                            <div ref={quillRef}></div>
                        </div>
                    </div>
                    <div className="relicsCreate__main--wrapper">
                        <div className="container">
                            <div className="group-input">
                                <div className="label">Upload video</div>
                                <div className="wrapper">
                                    <UploadGroup sub="hoặc">Kéo file vào đây</UploadGroup>
                                    <input type="file" multiple className='uploadFile' onChange={handleVideo} accept="video/mp4,video/x-m4v" />
                                </div>
                            </div>
                            {result?.video?.length > 0 &&
                                <div className="group-status">
                                    <div className="label">Trạng thái</div>
                                    {result?.video?.map((e, index) => {
                                        return <StatusLoading handleDelete={handleDelete} key={index} id={index} kind={result.video} icon={videoFile} name={e.name} size={arrSize[index]} knowAs="videos" />;
                                    })}
                                </div>
                            }
                        </div>
                        <div className="container">
                            <div className="group-input">
                                <div className="label">Upload avatar</div>
                                <div className="wrapper">
                                    {result.avatar?.preview &&
                                        <div className="img">
                                            <img src={result.avatar.preview} alt="thumbnail" />
                                        </div>
                                    }
                                    <UploadGroup sub="hoặc">Kéo file vào đây</UploadGroup>
                                    <input type="file" className='uploadFile' onChange={handleAvatar} accept="image/*" ref={avatarRef} />
                                </div>
                            </div>
                            {result.avatar &&
                                <div className="group-status">
                                    <div className="label">Trạng thái</div>
                                    {<StatusLoading handleDelete={handleDelete} name={result.avatar?.name} size={Number((result.avatar.size / exchange).toFixed(2))} icon={imgFile} knowAs="avatar" />}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="relicsCreate__main--wrapper">
                        <div className="container">
                            <div className="group-input">
                                <div className="label">Chèn bản vẽ kĩ thuật</div>
                                <div className="wrapper">
                                    <UploadGroup sub="hoặc">Kéo file vào đây</UploadGroup>
                                    <input type="file" multiple className='uploadFile' onChange={handleTechnicals} accept="image/*" />
                                </div>
                            </div>
                            {result?.technical_drawings?.length > 0 &&
                                <div className="group-status">
                                    <div className="label">Trạng thái</div>
                                    {result?.technical_drawings?.map((e, index) => {
                                        return <StatusLoading handleDelete={handleDelete} key={index} id={index} kind={result.technical_drawings} icon={imgFile} name={e.name} size={arrTechnicals[index]} knowAs="technicals" />;
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
                                        return <StatusLoading handleDelete={handleDelete} key={index} kind={result.zoning_drawings} id={index} icon={imgFile} name={e.name} size={arrMaps[index]} knowAs="maps" />;
                                    })}
                                </div>
                            }
                        </div>

                    </div>
                    <div className="relicsCreate__main--wrapper">
                        <div className={`group-input ${error.district && 'error'}`}>
                            <div className="label">Vị trí *</div>
                            <Options options={districts} resultCreate={result} setDistrictCreate={setResult} />
                        </div>
                        <div className={`group-input ${error.level && 'error'}`}>
                            <div className="label">Loại di tích*</div>
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
