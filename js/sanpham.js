


var productAPI = 'http://localhost:3000/sanPham';
var danhmucAPI = 'http://localhost:3000/danhMuc';
var i = 0;
function start(){
   getProduct(function(product){
       renderProduct(product); // show product lên web
       renderProduct2(product); 
       renderProduct3(product); 
       renderDanhMuc(product);
});
getDanhMuc(function(product){
    renderDanhMuc(product);
});

}
start();
function getProduct(callback){
    fetch(productAPI)
    .then(response => response.json()) // parse JSON from request
    .then(callback) // callback trả về mảng product
    .then(err => console.log(err));
}
function renderProduct(product){
    var listProduct = document.querySelector('#sp');
    var htmls = product.map(function(e){
    if(e.iddm == 1){
         return `
         <div class="box_sp">
         <div class="box_img">
             <img src="${e.hinh}" alt="" id="anh1" width="100" height="180">
             <div class="chitiet">
                 <div><button class='btn1' onclick='addCart(${i++})'><i class='fa-brands fa-opencart'></i> Thêm sản phẩm</button></div>
                 <div><a><button id="xemctsp" onclick="showCTProduct(${e.id})" class="btn2"><i class="fa-solid fa-eye"></i></button></a></div>
             </div>
         </div>
         <div class="content">
             <p id="ten1" class="ten">${e.tenSP}</p>
             <p id="gia1" class="gia">${e.Gia}.000 VNĐ</p>
         </div>
     </div>
         `
    }

   });
   listProduct.innerHTML = htmls.join('');
}
function renderProduct2(product){
    var listProduct2 = document.querySelector('#sp2');
    var htmls = product.map(function(e){
    if(e.iddm == 2){
         return `
         <div class="box_sp">
         <div class="box_img">
             <img src="${e.hinh}" alt="" id="anh1" width="100" height="180">
             <div class="chitiet">
                 <div><button class='btn1' onclick='addCart(${i++})'><i class='fa-brands fa-opencart'></i> Thêm sản phẩm</button></div>
                 <div><a><button id="xemctsp" onclick="showCTProduct(${e.id})" class="btn2"><i class="fa-solid fa-eye"></i></button></a></div>
             </div>
         </div>
         <div class="content">
             <p id="ten1" class="ten">${e.tenSP}</p>
             <p id="gia1" class="gia">${e.Gia}.000 VNĐ</p>
         </div>
     </div>
         `
    }

   });
   listProduct2.innerHTML = htmls.join('');
}
function renderProduct3(product){
    var listProduct3 = document.querySelector('#sp3');
    var htmls = product.map(function(e){
    if(e.iddm == 3){
         return `
         <div class="box_sp">
         <div class="box_img">
             <img src="${e.hinh}" alt="" id="anh1" width="100" height="180">
             <div class="chitiet">
                 <div><button class='btn1' onclick='addCart(${i++})'><i class='fa-brands fa-opencart'></i> Thêm sản phẩm</button></div>
                 <div><a><button id="xemctsp" onclick="showCTProduct(${e.id})" class="btn2"><i class="fa-solid fa-eye"></i></button></a></div>
             </div>
         </div>
         <div class="content">
             <p id="ten1" class="ten">${e.tenSP}</p>
             <p id="gia1" class="gia">${e.Gia}.000 VNĐ</p>
         </div>
     </div>
         `
    }

   });
   listProduct3.innerHTML = htmls.join('');
}
function getDanhMuc(callback2){
    fetch(danhmucAPI)
    .then(response => response.json()) // parse JSON from request
    .then(callback2) // callback trả về mảng product
    .then(err => console.log(err));
}
function renderDanhMuc(product){
    var listDanhmuc = document.querySelector('#danhmuc');
    var showDM = product.map(function(dm, index){
         return `
         <li><a href="#" onclick="">${dm.tenLoai}</a></li>
         `
   });
   listDanhmuc.innerHTML = showDM.join('');
}

function renderctProduct3(product){
    var listctProduct = document.querySelector('#sp3');
    var htmls = product.onclick.map(function(e){
    if(e.iddm == 3){
         return `
         <div class="box_sp">
         <div class="box_img">
             <img src="${e.hinh}" alt="" id="anh1" width="100" height="180">
             <div class="chitiet">
                 <div><button class='btn1' onclick='addCart(${i++})'><i class='fa-brands fa-opencart'></i> Thêm sản phẩm</button></div>
                 <div><a><button id="xemctsp" onclick="showCTProduct(${e.id})" class="btn2"><i class="fa-solid fa-eye"></i></button></a></div>
             </div>
         </div>
         <div class="content">
             <p id="ten1" class="ten">${e.tenSP}</p>
             <p id="gia1" class="gia">${e.Gia}.000 VNĐ</p>
         </div>
     </div>
         `
    }

   });
   listctProduct.innerHTML = htmls.join('');
}

let cart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy giỏ hàng từ localStorage hoặc khởi tạo một mảng rỗng nếu không có
let sl = parseInt(localStorage.getItem('sl')) || 0; // Lấy số lượng từ localStorage hoặc đặt là 0 nếu không có
function addCart(a) {
    getProduct(function(products) {
        var productt = products[a];
        var check = cart.find(function(item) {
            return item.id === productt.id;
        });

        
    if (check) {
        check.quantity += 1;
    } else {
        productt.quantity = 1;
        cart.push(productt);
        sl++;
    }
        localStorage.setItem('sl', sl.toString());
        localStorage.setItem('cart', JSON.stringify(cart));
        countCartItems(); 
    });
}
function countCartItems() {
    let slStorage = localStorage.getItem('sl');
    let sl = slStorage ? parseInt(slStorage) : 0;
    let slElement = document.getElementById("sl");
    if (slElement) {
        slElement.innerHTML = sl.toString();
    }
    else {
        console.error("Lỗi không thể hiển thị");
    }
}
countCartItems();
function hienthigiohang(){
    var cartgh = JSON.parse(localStorage.getItem('cart'));                            
    var str = "";
    let tong = 0;
    if (cartgh) {
        for (let i = 0; i< cartgh.length; i++){
            str += `
                <tr>
                    <td style="display: flex;align-items: center;" padding-left:20px; ><img src="${cartgh[i].hinh}"><a class="chu">${cartgh[i].tenSP}</a></td>         
                    <td style="font-size: 18px; padding-left: 23px;">${cartgh[i].Gia}.000vnđ</td>
                    <td>${cartgh[i].quantity}</td>
                    <td style="font-size: 20px;" class="xoa"><a onclick="delElement('${cartgh[i].id}')"><i class="fa-solid fa-xmark"></i></a></td>
                </tr>`;
            tong += cartgh[i].Gia * cartgh[i].quantity;
        }
    }
    str += `<tr><br>
    <th colspan="2" style="font-weight: 700;font-size:20px; padding-top:30px" >Thành tiền:</th>
    <th  style="font-weight: 700;font-size:22px; color:red;padding-top:30px;width:200px" >${tong.toLocaleString('vi-VN')}.000 VNĐ</th>
    <th>
    <button style="margin-top:30px;width:65px;height:30px;border:1px solid gray; border-radius: 5px;cursor: pointer;" onclick="clearCart()">Xóa hết</button>
    </th>
    </tr>`;
    document.getElementById("cart").innerHTML= str;
    document.getElementById("tt").innerHTML= str;
    document.getElementById("tong").innerHTML= tong.toLocaleString('vi-VN') + ".000 VNĐ";
}
hienthigiohang();



function displayCart() {

    let j = 0; 
    let tong = 0;
    let tt = 0;
    document.getElementById('count').innerHTML = `
    <a style="margin-right: 10px;"> <i class="fa-solid fa-magnifying-glass" ></i></a>
    <a><i class="fa-solid fa-bag-shopping" onclick="show()" id="cart-btn"></i></a>
    <a id="sl" class="soluong" style="text-decoration: none;" >${cart.length}</a>
    <div class="dropdown">
        <a style="margin-left: 20px;"><i class="fa-regular fa-user"></i></a>
        <div class="cn"></div>
        <div class="dropdown-content">
          <a href="dangnhap..html">Đăng nhập</a><br>
          <a href="dangky.html">Đăng ký</a><br>
          <a href="#">Thông tin tài khoản</a>
          <hr>
          <a href="#">Đăng xuất</a>
        </div>
      </div>
    `;
        
    if(cart.length === 0){
        document.getElementById('hiensp').innerHTML = `
        <div><img src="./img/bg_gh_index.webp" alt=""></div>
        <div style="font-size: 20px; color: rgba(67, 67, 67, 0.597);">Chưa có sản phẩm trong giỏ hàng...</div>
        `;
        document.getElementById('cartItem').style.display = 'flex';
        document.getElementById('cartItem').style.justifyContent = 'center';
        document.getElementById('cartItem').style.alignItems = 'center';
        document.getElementById('cartItem').style.flexDirection = 'column';
     
    } else {
        document.getElementById('hiensp').innerHTML = cart.map((items) => {
            var {id, tenSP, Gia, hinh, quantity} = items;
            tong = Gia * quantity;
            tt += tong;
            document.getElementById('box_ic_vc').innerHTML = `
            <div id="vanchuyen">
            <div>Bạn đã được <strong>MIỄN PHÍ VẬN CHUYỂN</strong></div>
            </div> 
            <div id="icon_vc">
                <div style="border: 4px solid #f3a504; width: 420px;height: 0px; border-radius:6px;"></div>
                <div style="background: #f3a504;padding: 10px;border-radius: 20px; margin-left: -10px;font-size: 14px; color: #fff;"><i class="fa-solid fa-truck"></i></div>
            </div>
        `;
        document.getElementById('box_ic_vc').style.display = 'block';
        document.getElementById('box_ic_vc').style.flexDirection = 'column';
        document.getElementById('box_ic_vc').style.alignItems = 'center'; 
        document.getElementById("box_tongtien").style.display = "block";   
            return (`
        
            <div id="cartItem" class="cartItem2">
                        <div class="anh_Item">
                                <img id="anh${j}" src="${hinh}" alt="" width="70" height="70">
                          </div>
                          <div class="content_Item">
                              <div><strong>${tenSP}</strong></div>
                              <div style="font-size: 13px;">200 / xanh / 22cm</div>
                              <div class="btn_tg_sl">
                               <button onclick="tru(${id})">-</button>
                               <input id="quantity" type="text" value="${quantity}" readonly>
                               <button onclick="cong(${id})">+</button>
                             </div>
                        
                          </div>
                          <div class="cloes_tt" style="display: flex; display: flex;flex-direction: column; align-content: flex-end;align-items: flex-end;margin: 3px;">
                               <div><i id="xoaspgh" onclick='delElement(${items.id})' class="fa-solid fa-xmark" ></i></div><br>
                               <div><strong>${tong.toFixed(3)}.000vnđ</strong></div>
                           </div>
                           </div>

            `);
          
        }).join('');

        document.getElementById('tt').innerHTML = tt.toFixed(3)+".000VNĐ";
   
    }
}
function cong(id) {
    var item = cart.find(item => item.id === id);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

function tru(id) {
    var item = cart.find(item => item.id === id);
    if (item) {
        item.quantity--;
        if (item.quantity < 1) {
            item.quantity = 1; 
        }
        updateCart();
    }
}

function updateCart() {
    tt = 0;
    document.getElementById('hiensp').innerHTML = cart.map((items) => {
        var {id, tenSP, Gia, hinh, quantity} = items;
        tong = Gia * quantity;
        tt += tong;
        return (`
            <div id="cartItem" class="cartItem2">
                        <div class="anh_Item">
                                <img id="anh${j}" src="${hinh}" alt="" width="70" height="70">
                          </div>
                          <div class="content_Item">
                              <div><strong>${tenSP}</strong></div>
                              <div style="font-size: 13px;">200 / xanh / 22cm</div>
                              <div class="btn_tg_sl">
                               <button onclick="tru(${id})">-</button>
                               <input id="quantity" type="text" value="${quantity}" readonly>
                               <button onclick="cong(${id})">+</button>
                             </div>
                        
                          </div>
                          <div class="cloes_tt" style="display: flex; display: flex;flex-direction: column; align-content: flex-end;align-items: flex-end;margin: 3px;">
                               <div><i id="xoaspgh" onclick='delElement(${items.id})' class="fa-solid fa-xmark" ></i></div><br>
                               <div><strong>${tong.toFixed(3)}.000vnđ</strong></div>
                           </div>
                           </div>

            `);
    }).join('');
    document.getElementById('tt').innerHTML = tt.toFixed(3)+".000VNĐ";
}



function clearCart(){
    let result = confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?");
    if (result) {
        cart = [];
        sl = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('sl', sl.toString());
    }
    displayCart();
    countCartItems();
}

function delElement(productId) {
    let result = confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
    if (result) {
        let index = cart.findIndex((item) => item.id == productId);
        if (index !== -1) {
            let removedItem = cart.splice(index, 1)[0];
            sl -= removedItem.quantity;
            if (sl < 0)
                sl = 0;
            localStorage.setItem('sl', sl.toString());
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        if (cart.length === 0) {
            let box_ic_vc = document.getElementById('box_ic_vc');
            if (box_ic_vc) {
                box_ic_vc.style.display = "none";
            }
            let box_tongtien = document.getElementById("box_tongtien");
            if (box_tongtien) {
                box_tongtien.style.display = "none";
            }
        }
    }
    hienthigiohang(); 
    countCartItems();
}


    function hide() {
        document.getElementById("box_aside").style.display = "none";   
    }
    
    function show() {
        document.getElementById("box_aside").style.display = "block";
        displayCart();
    }
  

    function showCTProduct(productId) {
        window.location.href = "chitietsp.html?id=" + productId;
    }
    