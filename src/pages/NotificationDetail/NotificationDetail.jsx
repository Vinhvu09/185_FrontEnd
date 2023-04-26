import React from 'react';
import './NotificationDetail.scss';
export default function NotificationDetail() {
    return (
        <div className='notificationDetail'>
            <div className="notificationDetail__group">
                <div className="notificationDetail__group--title">
                    Thông báo nhiệm vụ
                </div>
                <div className="notificationDetail__group--text">
                    <p><span>Admin</span> phân công nhiệm vụ <span style={{ color: "#888888" }}>BÁO CÁO HỒ SƠ THÁNG 2</span> cho bạn</p>
                </div>
            </div>
            <div className="notificationDetail__group">
                <div className="notificationDetail__group--title">
                    Thông báo chuyển trạng thái nhiệm vụ
                </div>
                <div className="notificationDetail__group--text">
                    <p><span>Admin</span> đã chuyển trạng thái nhiệm vụ “...” từ <span style={{ color: "#1A9AFF" }}>CHỜ DUYỆT</span> sang <span style={{ color: '#3CD5A3' }}>HOÀN THÀNH</span></p>
                    <p><span>Admin</span> đã chuyển trạng thái nhiệm vụ “...” từ <span style={{ color: "#1A9AFF" }}>CHỜ DUYỆT</span> sang <span style={{ color: '#E62614' }}>TRỄ</span></p>
                    <p><span>Admin</span> đã chuyển trạng thái nhiệm vụ “...” từ <span style={{ color: "#1A9AFF" }}>CHỜ DUYỆT</span> sang <span style={{ color: '#FFAF37' }}>ĐANG THỰC HIỆN</span></p>
                    <p><span>Admin</span> đã chuyển trạng thái nhiệm vụ “...” từ <span style={{ color: '#3CD5A3' }}>HOÀN THÀNH</span> sang <span style={{ color: '#A56EF4' }}>ĐÃ ĐÓNG</span></p>
                    <p><span>Admin</span> đã chuyển trạng thái nhiệm vụ “...” từ <span style={{ color: "#1A9AFF" }}>CHỜ DUYỆT</span> sang <span style={{ color: '#A56EF4' }}>ĐÃ ĐÓNG</span></p>
                    <p><span>Admin</span> đã chuyển trạng thái nhiệm vụ “...” từ <span style={{ color: '#FFAF37' }}>ĐANG THỰC HIỆN</span> sang <span style={{ color: '#A56EF4' }}>ĐÃ ĐÓNG</span></p>
                    <p><span>Admin</span> đã chuyển trạng thái nhiệm vụ “...” từ <span style={{ color: "#1A9AFF" }} >CHỜ DUYỆT</span> sang <span style={{ color: '#E62614' }}>TRỄ</span></p>
                </div>
            </div>
            <div className="notificationDetail__group">
                <div className="notificationDetail__group--title">
                    Thông báo lịch hẹn
                </div>
                <div className="notificationDetail__group--text">
                    <p><span>Admin</span> phân công nhiệm vụ <span style={{ color: "#1A9AFF" }}>HỌP TRIỂN KHAI KẾ HOẠCH TUẦN 2 THÁNG 6</span> </p>
                </div>
            </div>
            <div className="notificationDetail__group">
                <div className="notificationDetail__group--title">
                    Thông báo thành công
                </div>
                <div className="notificationDetail__group--text">
                    <p><span>Admin</span> chưa nhận được</p>
                </div>
            </div>
            <div className="notificationDetail__group">
                <div className="notificationDetail__group--title">
                    Thông báo Cảnh báo
                </div>
                <div className="notificationDetail__group--text">
                    <p> Sắp quá hạn thời gian hoàn thành nhiệm vụ <span style={{ color: '#E62614' }}>BÁO CÁO HỒ SƠ THÁNG 2</span></p>
                </div>
            </div>
            <div className="notificationDetail__group">
                <div className="notificationDetail__group--title">
                    Thông báo Công văn
                </div>
                <div className="notificationDetail__group--text">
                    <p>Đang đợi</p>
                </div>
            </div>
        </div>
    );
}
