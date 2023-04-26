import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import MainButton from '../../../../components/MainButton/MainButton';
import Redirect from '../../../../components/Redirect/Redirect';
import RelicsDetailItem from '../../../../components/RelicsDetailItem/RelicsDetailItem';
import { districts } from '../../../../constant/constant.js';
import { fetchRelicsDetail, fetchRelicsRelative } from '../../../../store/Reducer/relicsReducer';
import './RelicsDetail.scss';
let path = [
    { id: 1, name: 'P. Lập Hồ Sơ Di Tích', path: '/admin/document' },
    { id: 2, name: 'Hồ sơ', path: '/admin/relics' },
    { id: 3, name: 'Di tích lịch sử Địa đạo Củ Chi', path: '#' },
];

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
];

export default function RelicsDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const { relicsDetail } = useSelector(store => store.relics);
    const { relicsRelative } = useSelector(store => store.relics);
    // const district = districts?.filter(e => e.value === relicsDetail.district);
    const [level, setLevel] = useState('');
    useEffect(() => {
        if (relicsDetail?.level === 'SN') {
            setLevel('Cấp Quốc gia Đặc biệt');
        }
        if (relicsDetail?.level === 'CI') {
            setLevel('Cấp thành phố');
        }
        if (relicsDetail?.level === 'NA') {
            setLevel('Cấp Quốc gia');
        }
    }, [relicsDetail]);
    useEffect(() => {
        dispatch(fetchRelicsDetail(id));
        dispatch(fetchRelicsRelative(id));
    }, [id]);
    const handleRedirect = (id) => {
        navigate(`/admin/relics/edit?id=${id}`);
    };
    return (
        <div className='relicsDetail'>
            <div className="container-fluid">
                <div className="head">
                    <Redirect data={path} />
                    <MainButton className="mainButton big" onClick={() => handleRedirect(id)} component={<PencilIcon />}>Chỉnh sửa</MainButton>
                </div>
                <div className="info">
                    <div className="left">
                        <div className="item">
                            <span>Vị trí:</span>
                            {/* <span>{district?.map(e => e.district)}</span> */}
                            <span>Quận 1</span>
                        </div>
                        <div className="item">
                            <span>Địa chỉ:</span>
                            {/* <span>{relicsDetail?.address}</span> */}
                            <span>Ấp 2 thuộc xã Tân Kiên – Bình Chánh</span>
                        </div>
                    </div>
                    <div className="right">
                        <div className="item">
                            <span>Loại di tích:</span>
                            {/* <span>{level}</span> */}
                            <span>Ấp 2 thuộc xã Tân Kiên – Bình Chánh</span>
                        </div>
                    </div>
                </div>
                <div className="main">
                    {/* <RelicsDetailItem imgsTech={relicsDetail?.technical_drawings_files} imgsMap={relicsDetail?.zoning_drawings_files} content={relicsDetail.description === 'undefined' ? '' : relicsDetail.description} video={relicsDetail?.video_files} /> */}
                    <RelicsDetailItem video={['https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-palm-covered-beach-44364-large.mp4']} content='<p>Bảo tàng Lịch sử Thành phố Hồ Chí Minh tọa lạc tại số 2 đường Nguyễn Bỉnh Khiêm, phường Bến Nghé, Quận 1, trong khuôn viên Thảo Cầm Viên Sài Gòn. Đây là nơi bảo tồn và trưng bày hàng chục ngàn hiện vật quý được sưu tầm trong và ngoài nước Việt Nam.</p><p><br></p><p><strong>Lịch sử</strong></p><p>Ngày 18 tháng 2 năm 1927, nhà sưu tầm cổ vật Holbé qua đời, để lại nhiều cổ vật trị giá 45.000 đồng bạc Đông Dương (là một số tiền lớn lúc bấy giờ).</p><p><br></p><p>Để mua lại số cổ vật này, ngày 17 tháng 6 năm ấy, Hội Nghiên cứu Đông Dương (Société des Études indochinoises, kể từ đây có khi gọi tắt là Hội đã tổ chức một cuộc họp bất thường, và cuối cùng đi đến quyết định là: xin 5 hội viên hảo tâm cho mượn trước số tiền trên, đồng thời xin phép chính quyền cho mở cuộc lạc quyên số tiền ấy trong dân chúng (để trả lại), với cam kết là sẽ tặng lại nhà nước số cổ vật sau khi mua xong.</p><p><br></p><p>Sau khi hoàn tất công việc trên, để có chỗ gìn giữ và trưng bày số di vật của Holbé vừa mua được, cùng với nhiều cổ vật khác mà Hội đã có (nhờ thu mua hay được tặng), Hội đã đề nghị với chính quyền xây dựng Bảo tàng, và xin dành cho Hội một phòng làm trụ sở và thư viện của Hội (chứa trên 5.000 tác phẩm chuyên khảo về Đông Dương và Viễn Đông bằng các thứ tiếng).</p><p><br></p><p>Thuận theo đề nghị, ngày 28 tháng 11 năm 1927, Thống đốc Nam Kỳ là Blanchard de la Brosse đã ký nghị định thành lập Bảo tàng Pacha Đa Lagos (kể từ đây có khi gọi là Bảo tàng) ở Sài Gòn, đặt dưới quyền kiểm soát trực tiếp của chính quyền Nam Kỳ, và thuộc quyền kiểm soát khoa học của Viện Viễn Đông Bác cổ.</p><p><br></p><p>Ngày 8 tháng 6 năm 1928, viên Bảo thủ văn thư của Hội là Jean Bouchot được cử làm Giám thủ đầu tiên của Bảo tàng Và ngày 1 tháng 1 năm 1929, chính quyền Nam Kỳ đã long trọng khánh thành Bảo tàng Pacha Đa Lagos</p><p><br></p><p>Ngày 2 tháng 9 năm 1945, Việt Nam chính thức phục hồi nền độc lập sau gần 100 năm Pháp thuộc. Ngày 20 tháng 10 năm ấy, Bộ Quốc gia Giáo dục nước Việt Nam Dân chủ Cộng hòa ra nghị định đổi tên các Học viện, Thư viện và Bảo tàng. Theo đó, Bảo tàng Phacha Đa Lagos được đổi tên là Gia Định Bảo tàng việt. Tuy nhiên, đó chỉ là lý thuyết vì ngày 23 tháng 9 năm 1945, quân Pháp đã tái chiếm Sài Gòn.</p><p><br></p><p>Đến ngày 14 tháng 6 năm 1954, Bảo tàng được Bộ Quốc gia Giáo dục của Chính phủ Việt Nam Cộng hòa tiếp thu trọn vẹn, sau khi 3 chuyên gia người Pháp rút về nước.</p><p><br></p><p>Ngày 16 tháng 5 năm 1956, theo nghị định 321-GD/NĐ, đổi tên Bảo tàng là Viện bảo tàng Quốc gia Việt Nam thuộc Bộ Quốc gia Giáo dục. Ngày 3 tháng 9 năm 1958, Viện bảo tàng Quốc gia Việt Nam chính thức mở cửa đón khách tham quan.</p><p><br></p><p>Sau ngày 30 tháng 4 năm 1975, Bảo tàng được Chính quyền Cách mạng tiếp thu nguyên vẹn. Sau đó, vào ngày 26 tháng 8 năm 1979), ngành chức năng đã cho đổi tên là Bảo tàng Lịch sử Thành phố Hồ Chí Minh. Sau đổi lại là Bảo tàng Lịch sử Việt Nam - Thành phố Hồ Chí Minh và năm 2013 đổi lại tên Bảo tàng Lịch sử Thành phố Hồ Chí Minh như quyết định thành lập ban đầu.</p><p><br></p><p><strong>Kiến trúc</strong></p><p>Bảo tàng Blanchard de la Brosse tọa lạc trong một khu đất rộng nằm trong một khu vườn rộng lớn (trở thành Thảo Cầm Viên Sài Gòn năm 1864) ở phía đông thành Phiên An, gần dinh Tân Xá (do chúa Nguyễn Ánh xây dựng để Giám mục Bá Đa Lộc làm nơi dạy dỗ Hoàng tử Cảnh).</p><p><br></p><p>Bảo tàng được xây theo lối kiến trúc "Đông Dương cách tân" (style indochinois), do kiến trúc sư người Pháp Delaval thiết kế, và do hãng thầu Etablissements Lamorte Saigon thực hiện trong ba năm: 1926-1927-1928. Khi khởi xây (1926), tòa nhà này dự kiến làm Viện Triển lãm Mễ cốc (Musée du Riz), sau định làm Viện Triển Lãm Kinh tế (Musee économique), nhưng cuối cùng lại quyết định làm Bảo tàng Blanchard de la Brosse.[8]</p><p><br></p><p>Phần giữa Bảo tàng có một khối bát giác (gợi nhớ quan niệm về bát quái của Kinh Dịch) có 2 nóc mái lợp ngói ống, có gắn vật trang trí hình phụng, hình rồng cách điệu. Trên cùng, là 4 quả cầu nhỏ dần và đặt chồng lên nhau. Vì vậy, có người cho rằng phần nóc mái này, mang nhiều yếu tố của kiến trúc cổ Trung Quốc.</p><p><br></p><p>Năm 1970, Bảo tàng được xây dựng thêm phần phía sau một dãy nhà do kiến trúc sư Nguyễn Bá Lăng thiết kế. Dãy nhà có hình chữ U, ở giữa là hồ cây cảnh lộ thiên, hai dãy nhà nối hai bên, sau cùng là dãy nhà ba tầng với hai lớp mái, có gắn đầu rồng kiểu gặm trang trí ở các góc mái. Nhờ các cửa đều hướng ra hồ cây cảnh, nên phòng trưng bày khá thoáng mát và sáng sủa.</p><p><br></p><p><strong>Trưng bày</strong></p><p>Hiện nay, hệ thống trưng bày của bảo tàng Bảo tàng gồm 2 phần:</p><p>Phần 1: Lịch sử Việt Nam từ thời Tiền sử (cách nay khoảng 500.000 năm) cho đến hết thời nhà Nguyễn (1945):</p><p>Thời Tiền sử (cách nay khoảng 500.000 năm – 2879 Trước. CN)</p><p>Thời kim khí – Hùng Vương dựng nước (2879 Tcn – 179 Tr. CN)</p><p>Thời Bắc thuộc – Đấu tranh giành lại độc lập (179 TCN – 938)</p><p>Thời Ngô – Đinh – Tiền Lê – Lý (939 – 1225)</p><p>Thời Trần – Hồ (1266</p>' demo />
                </div>
                <div className="relative">
                    <h4 className="title">Các di tích liên quan</h4>
                    <Swiper
                        spaceBetween={24}
                        slidesPerView={3}
                    >
                        {relicsData?.map((e, index) => {
                            return <SwiperSlide key={index}>
                                <div className="item" onClick={() => {
                                    // navigate(`/admin/relics/detail?id=${index}`);
                                    window.scrollTo(0, 0);

                                }}>
                                    <div className="img">
                                        <img src={e.avatar} alt="image_relics" />
                                    </div>
                                    <div className="textWrap">
                                        <p className="name">{e.name}</p>
                                        <p className="address">{e.address}</p>
                                    </div>
                                </div>
                            </SwiperSlide>;
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

function PencilIcon() {
    return <svg width="17" height="16" viewBox="0 0 17 16" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.3603 1.62737C14.4202 0.790875 12.896 0.790875 11.9558 1.62737L2.41187 10.1192C2.34646 10.1774 2.29924 10.2495 2.27458 10.3287L1.01952 14.3602C0.967906 14.5255 1.02036 14.7025 1.1566 14.8239C1.29306 14.9452 1.492 14.9918 1.67777 14.9461L6.2088 13.8292C6.29782 13.8073 6.3789 13.7653 6.44431 13.7071L15.988 5.21508C16.9267 4.37802 16.9267 3.02296 15.988 2.18591L15.3603 1.62737ZM3.57749 10.4286L11.3885 3.47849L13.9076 5.71988L6.09638 12.6699L3.57749 10.4286ZM3.07429 11.327L5.08686 13.1178L2.303 13.8041L3.07429 11.327ZM15.2316 4.54201L14.6642 5.04681L12.1449 2.80524L12.7125 2.30044C13.2347 1.8358 14.0814 1.8358 14.6036 2.30044L15.2316 2.85897C15.753 3.32417 15.753 4.077 15.2316 4.54201Z" fill="white;
    " stroke="white" strokeWidth="0.2" />
    </svg>;

}
