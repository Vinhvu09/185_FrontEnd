import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import empty_img from '../../assets/svg/empy_img.svg';
import tech1 from '../../assets/imgs/tech1.jpg';
import tech2 from '../../assets/imgs/tech2.jpg';
import map1 from '../../assets/imgs/map.jpg';
import './RelicsDetailsItem.scss';
export default function RelicsDetailItem({ imgsTech, imgsMap, content, title, handleClosePopup, video, demo }) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get('id');

    const [compared, setCompared] = useState(0);
    const [distance, setDistance] = useState(0);
    const [width, setWidth] = useState(0);
    const handleTabs = (e) => {
        let id = e.currentTarget.dataset.id;
        setCompared(parseInt(id));
    };
    const handleRedirect = (id) => {
        navigate(`/admin/relics/edit?id=${id}`);
    };
    useEffect(() => {
        let listLi = document.querySelectorAll('.tabs .item');
        listLi.forEach(e => {
            let id = e.dataset.id;
            if (parseInt(id) === compared) {
                setDistance(e.offsetLeft + e.firstElementChild.offsetLeft);
                setWidth(e.firstElementChild.offsetWidth);
            }
        });
    }, [compared]);
    return (
        <div className='relicsDetailItem'>
            <h3 className="title">{title}</h3>
            <div className="tabs">
                <div className={`item ${compared === 0 ? 'active' : ''}`}
                    data-id={0} onClick={(e) => handleTabs(e)}>
                    <p>
                        Thông tin di tích
                    </p>
                </div>
                <div className={`item ${compared === 1 ? 'active' : ''}`}
                    data-id={1} onClick={(e) => handleTabs(e)}>
                    <p>
                        Bản vẽ kĩ thuật
                    </p>
                </div>
                <div className={`item ${compared === 2 ? 'active' : ''}`}
                    data-id={2} onClick={(e) => handleTabs(e)}>
                    <p>
                        Bản vẽ khoanh vùng
                    </p>
                </div>
                <div className="line" style={{ left: distance + 'px', width: width + 'px' }}></div>
            </div>
            <div className="content">
                {compared === 0 &&
                    <>
                        {(content === undefined || content === '<p><br></p>') && video?.length <= 0 ?
                            <div className="content__empty">
                                Chưa có dữ liệu
                            </div>
                            :
                            <div className="content__text ql-editor" dangerouslySetInnerHTML={{ __html: content }} ></div>
                        }
                        {video?.length > 0 &&
                            <div className="content__video">
                                {video?.map((e, index) => {
                                    return (
                                        <video key={index} src={e} controls></video>
                                    );
                                })}
                            </div>
                        }
                    </>
                }
                {compared === 1 &&
                    <div className="content__technicals">
                        {demo ?
                            <>
                                <div className="img">
                                    <img src={tech1} alt="map" />
                                </div>
                                <div className="img">
                                    <img src={tech2} alt="map" />
                                </div>
                            </>
                            :
                            imgsTech?.length < 1 ?
                                <div className="emptyImage">
                                    <div className="wrapper" onClick={handleClosePopup ? handleClosePopup : () => handleRedirect(id)}>
                                        <img src={empty_img} alt="empty_icon" />
                                        <p>Bạn chưa tải ảnh lên</p>
                                    </div>
                                </div>
                                :
                                imgsTech?.map(e => {
                                    return <div className="img" key={e}>
                                        <img src={e} alt="" />
                                    </div>;
                                })}
                    </div>
                }
                {compared === 2 &&
                    <div className="content__maps">
                        {demo ?
                            <div className="img">
                                <img src={map1} alt="map" />
                            </div>
                            :
                            imgsMap?.length < 1 ?
                                <div className="emptyImage">
                                    <div className="wrapper" onClick={handleClosePopup ? handleClosePopup : () => handleRedirect(id)}>
                                        <img src={empty_img} alt="empty_icon" />
                                        <p>Bạn chưa tải ảnh lên</p>
                                    </div>
                                </div>
                                :
                                imgsMap?.map(e => {
                                    return <div className="img" key={e}>
                                        <img src={e} alt="" />
                                    </div>;
                                })
                        }
                    </div>
                }
            </div>
        </div>
    );
}
