// Khai báo lớp đối tượng nhân viên

function NhanVien(taikhoan,hoten,email,matkhau,ngaylam,luongcoban,chucvu,giolam){
    // Thuộc tính
    this.taiKhoanNV = taikhoan;
    this.hoTenNV = hoten;
    this.email = email;
    this.matKhau = matkhau;
    this.ngayLam = ngaylam;
    this.luongCoban = luongcoban;
    this.chucVu = chucvu;
    this.gioLam = giolam;

    this.loaiNV = "";
    this.tongLuong = 0;

    // Phương thức xếp loại & tính lương
    this.tinhTongLuong = function(selID){

        var optIndex = document.getElementById(selID).selectedIndex;
        if(optIndex == 1){
            return (this.tongLuong = this.luongCoban * 3);
        }else if(optIndex == 2){
            return (this.tongLuong = this.luongCoban * 2);
        }else if(optIndex == 3){
            return (this.tongLuong = this.luongCoban * 1);
        }else{
            return this.luongCoban;
        }
    }

    this.xepLoai = function(){
        if( 80 < this.gioLam && this.gioLam < 160){
            return this.loaiNV = "Trung bình";
        }else if(160 <= this.gioLam && this.gioLam < 176){
            return this.loaiNV = "Khá";
        }else if(176 <= this.gioLam && this.gioLam < 192){
            return this.xepLoai = "Giỏi";
        }else{
            return this.loaiNV = "Xuất sắc"
        }
    }
    
}