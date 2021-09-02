// Lớp đối tượng danh sách nhân viên

function DanhSachNhanVien(){
// Thuộc tính
this.mangNV = [];

// Phuong thức
this.themNhanVien = function(nv){
    this.mangNV.push(nv);
}

// Tìm vị trí nhân viên trong mãng

this.timVitri = function(taikhoannv){
    var viTri = -1;
    // Duyệt mãng
    this.mangNV.map(function(item,index){
        if(item.taiKhoanNV == taikhoannv){
            viTri = index;
        }
    })
    return viTri;
}

this.xoaNV = function(taikhoannv){
    var viTri = this.timVitri(taikhoannv);
    if(viTri >= 0){
        // Tìm thấy NV
        // splice() : Hàm xóa phần tử trong mãng
        this.mangNV.splice(viTri,1);
    }else{
        alert("Không tìm thấy nhân viên");
    }
}

this.capNhatNhanVien = function(nv){
    var viTri = this.timVitri(nv.taiKhoanNV);
    if(viTri >= 0){
        // Tìm được nhân viên
        this.mangNV[viTri] = nv;
    }else{
        alert("Không tìm thấy nhân viên");
    }
}

}

/**
 * Tìm kiếm
 * Khai báo mangKQ
 * tuKhoaLoai
 * Duyệt mangNV
 * Lấy loaiNV ra chuyễn => chữ thường
 * indexOf: So sánh chuỗi loaiNVThuong & lowerTK 
 * 
 */

/**
 * Sử dụng PROTOTYPE : Tất cả các đối tượng được tạo ra từ lớp(class) DanhSachNhanVien
 * đều kế thừa phương thức timKiem.
 * Được sử dụng khi phát triển thêm tính năng & không thể can thiệp vào lớp(class)
 * đã được tạo trước đây.
 */

DanhSachNhanVien.prototype.timKiem = function(tuKhoaLoai){
    var mangKQ = [];
    var lowerTK = tuKhoaLoai.trim().toLowerCase();

// Duyệt mãng nhân viên

    this.mangNV.map(function(item,index){
        
// Lấy loaiNV ra chuyễn => chữ thường
        var loaiNVThuong = item.loaiNV.trim().toLowerCase();

// Hàm indexOf trả về vị trí đầu tiên của một giá trị được chỉ định trong một chuỗi.
// Trả về -1 nếu giá trị không được tìm thấy.

    var kq = loaiNVThuong.indexOf(lowerTK);
     if(kq >= 0){
            mangKQ.push(item);
    }
})
    return mangKQ;
}

