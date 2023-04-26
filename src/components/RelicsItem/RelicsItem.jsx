import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import mapIcon from '../../assets/svg/address.svg';
import deleteButton from '../../assets/svg/delete.svg';
import editIcon from '../../assets/svg/edit.svg';
import { deleteRelicsItemReducer } from '../../store/Reducer/relicsReducer';
import cancel from '../../assets/svg/question.svg';
import success from '../../assets/svg/success.svg';
import Swal from 'sweetalert2';
import './RelicsItem.scss';
export default function RelicsItem({ img, name, index, address, id, qs }) {
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btnRelicsItem --delete',
                cancelButton: 'btnRelicsItem --cancel'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            html: `<div class="popupDeleteRelics"><img src=${cancel}><p class="warning">Bạn có muốn xóa di tích này?</p><p class="warningSub">Bạn sẽ xóa vĩnh viễn di tích này!<p class="warningSub">Bấm hủy để trở lại.</p></p></div>`,
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteRelicsItemReducer({ id: id, qs: qs }));
                swalWithBootstrapButtons.fire(
                    {
                        html: `<div class="popupDeleteRelics"><img src=${success}><p class="warning">Xoá thành công!</p><p class="warningSub">Bạn đã xóa thành công!<p class="warningSub">Di tích địa đạo củ chi đã được xóa.</p></p></div>`,
                    }
                );
            }
        });
    };
    return (
        <div className='relicsItem'>
            <div className="wrapper">
                <Link to={`detail?id=${id}`} className="avatar">
                    <img src={img} alt="thumbnail" />
                </Link>
                <div className="info">
                    <div className="name"><span>{index}.</span> {name}</div>
                    <div className="address">
                        <img src={mapIcon} alt="icon_svg" />
                        <span>{address}</span>
                    </div>
                    <Link to={`detail?id=${id}`}>Xem chi tiết</Link>
                </div>
            </div>
            <div className="options">
                <Link to={`/admin/relics/edit?id=${id}`}>
                    <img src={editIcon} alt="svg_icon" />
                </Link>
                <img src={deleteButton} alt="svg_icon" onClick={() => handleDelete(id)} />
            </div>
        </div>
    );
}
