window.onload = function() {
    var urlsp = new URLSearchParams(window.location.search);
    var productId = urlsp.get('id');
    getctProduct(productId, function(product) {
        if (product) {
            var showctsp = document.getElementById("ctsp");
            showctsp.innerHTML = `
            <div class="top">
            </div>
            <div class="content">
                <div class="product_left">
                    <div class="img_small">
                        <img onclick="anhct('${product.hinh}')" src="${product.hinh}" alt="" height="auto">
                        <img onclick="anhct('${product.hinhct}')" src="${product.hinhct}" alt="">
                    </div>
                    <div class="img_big">
                        <div id="anhct" ><img src="${product.hinh}" alt="" width="100%"></div>
                    </div>
                </div>
                <div class="product_right">
                    <div class="product_name">
                        <p>${product.tenSP}</p>
                    </div>
                    <div class="product_price">
                        <p> ${product.Gia}.000 VNĐ (<del>1.000.000 <sup>vnđ</sup></del>) <small> <a href=""> 30% giảm</a></small>    </p>
                    </div>
                    <div class="product_info">
                        <div class="info_left">
                            <p align="center">(Voucher)</p>
                            <p align="center">miễn phí </p>
                            <p align="center">vận chuyển </p>
                        </div>
                        <div class="info_right">z
                            <p>✅ Cam kết chất lượng như hình ảnh</p>
                            <p>✅ Nhận hàng và kiểm tra trước khi thanh toán </p>
                            <p>✅ Xử lý đơn hàng bởi <strong>BALOCAOCAP</strong> </p>
                            <span>Miễn phí vận chuyển</span>
                        </div>
                    </div>
                    <div class="btn_mau">
                        <p><strong><span>Màu:</span></strong></p>
                        <button>Hồng</button>
                        <button>Xanh</button>
                    </div>
                    <div class="product_color">
                        <p><span>Size:</span></p>
                        <div class="color">
                            <span>  <a href="">22cm</a>   </span>
                            <span>  <a href="">30cm</a>     </span>
                        </div>
                    </div> 
                    <div class="product_quantity">
                        <p>Số Lượng:</p>
                        <div class="upanddown">
                            <input style="border-radius: 4px 0 0 4px;" class="upanddown_left" type="button" value="-"><input  class="input-qty" type="text" placeholder="1" ><input style="border-radius: 0 4px  4px 0;" class="upanddown_left" type="button" value="+">
                        </div>
                    </div>  
                    <div class="product_button">
                        <button class="button_left" ><a href="index.html">Thêm vào giỏ hàng</a><i class="fa-solid fa-cart-plus"></i></i></button>   
                        <button class="button_right"><a>LIKE 👍</a></button>
                    </div>
                </div>
            </div>
            <div class="bottom">
                    <h1>Thông tin</h1>
                    <p>
                    ${product.moTa}
                    </p>
            </div>
            `;
        } else {
            alert('Không tìm thấy sản phẩm');
        }
    });
}

function getctProduct(id, callback){
    fetch(productAPI + '/' + id)
    .then(response => response.json())
    .then(callback)
    .catch(err => console.log(err));
}
