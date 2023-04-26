import { useLocation, useParams } from "react-router-dom"
import AddBoxBorder from "../../components/AddBoxBorder/AddBoxBorder"
import FileItem from "../../components/FileItem/FileItem"
import MainButton from "../../components/MainButton/MainButton"
import Redirect from "../../components/Redirect/Redirect"
import "./Documentary.scss"


const dataRedirect = [{
    key: "director",
    name: "Ban giám đốc",
    path: "/admin/director"
},
{
    key: "document-come",
    name: "Công văn đến",
    path: "/admin/director/document-come"
},
{
    key: "document-out",
    name: "Công văn đi",
    path: "/admin/director/document-out"
},
{
    key: "restorativeDocument",
    name: "P. Tu Bổ Di Tích",
    path: "/admin/restorativeDocument",
    nextName: "Quản lý văn thư P.TBDT",
    nextPath: "/admin/restorativeDocument",
},
{
    key: "document",
    name: "P. Lập Hồ Sơ Di Tích",
    path: "/admin/document",
    nextName: "Quản lý văn thư P.LHSDT",
    nextPath: "/admin/document",
},
{
    key: "administrativeDocument",
    name: "P. Hành Chính - Tổng Hợp",
    path: "/admin/administrativeDocument",
    nextName: "Quản lý văn thư P.HCTH",
    nextPath: "/admin/administrativeDocument",
},
{
    key: "advisory-document",
    name: "Công văn tham mưu",
    path: "/admin/administrativeDocument",
},
{
    key: "direct-document",
    name: "Công văn chỉ đạo",
    path: "/admin/administrativeDocument",
},
]
function containsUndefined(arr) {
    return arr.includes(undefined)
}
export default function Documentary() {
    const location = useLocation()
    let pathNames = location.pathname.split("/")
    const removePathNames = ["", "admin"]
    pathNames = pathNames.filter(pathName => !removePathNames.includes(pathName))
    let data = []
    pathNames.map((pathName, index) => {
        const redirectItem = dataRedirect.filter(redirectItem => redirectItem.key === pathName)[0]
        if (redirectItem) {
            data.push({
                id: data.length + 1,
                name: redirectItem?.name,
                path: redirectItem?.path
            })
        }
        if (redirectItem?.nextName && redirectItem?.nextPath) {
            data.push({
                id: data.length + 1,
                name: redirectItem?.nextName,
                path: redirectItem?.nextPath
            })
        }
    })
    return (
        <>
            {
                !containsUndefined(data) &&
                <div className='documentary'>
                    <div className="container-fluid">
                        <Redirect data={data} />
                        <div className="documentary__main" style={{ padding: '24px 40px', marginTop: '26px', boxShadow: "0px 6px 12px rgba(28, 73, 143, 0.08)", borderRadius: '6px' }}>
                            <div className="documentary__main--docs">
                                <div className="title" style={{ fontSize: '20px', marginBottom: '32px', fontWeight: 600 }}>
                                    Danh mục
                                </div>
                                <div className="wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                                    <FileItem name="Công văn tham mưu" num="23" prefix={false} route="advisory-document" />
                                    <FileItem name="Công văn chỉ đạo" num="23" prefix={false} route="direct-document" />
                                    <AddBoxBorder />
                                </div>
                            </div>

                        </div>
                    </div >
                </div >
            }
        </>
    )
}
