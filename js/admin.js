let id=0;
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/sanPham');
        const data = await response.json();
         id = data[data.length - 1].id; 
        console.log(data);
        console.log('Đã nhận được dữ liệu');
        render_Admin_Product(data);
        addProduct();
    } catch (error) {
        console.log('lỗi: ', error);
    }
}
fetchData();
function postProduct(form) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    }
    fetch('http://localhost:3000/sanPham', options) 
        .then((response) => response.json())
        .then(callback)
}

function render_Admin_Product(product){
    var list_Admin_Product = document.querySelector('#sp');
    var htmls = product.map(function(e){
        document.getElementById("soSP").innerHTML  = product.length;
        return `
        <tr>
            <td><img src="${e.hinh}" alt="" width="80" height="80px"></td>
            <td>${e.id}</td>
            <td>${e.tenSP}</td>
            <td>${e.Gia}.000 vnđ</td>
            <td>${e.iddm}</td>
            <td class="box_btn"">
                <button class="btn1" onclick="show2(${e.id})" type="button">Sửa</button>
                <button class="btn2" onclick="Xoasp(${e.id})" type="button">Xóa</button>
            </td>
        </tr>
        `
    });
    
    list_Admin_Product.innerHTML = htmls.join('');
}

async function addProduct() {
    var btn = document.querySelector('#submit');
    btn.onclick = async function() {
        var tenSP = document.querySelector('input[name="tenSP"]').value;
        var hinh = document.querySelector('input[name="hinh"]').value.split('\\').pop();
        var Gia = document.querySelector('input[name="Gia"]').value;
        var iddm = document.querySelector('.danhmuc').value;
        hinh = `img/${hinh}`;
        var form = {
            id: String(++id),
            tenSP: tenSP,
            hinh: hinh,
            Gia: Gia,
            iddm: iddm,
        }
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }
        try {
            const response = await fetch('http://localhost:3000/sanPham', options);
            const data = await response.json();
            console.log('Sản phẩm đã được thêm thành công:', data);
            fetchData(); 
        } catch (error) {
            console.log('Lỗi khi thêm sản phẩm:', error);
        }
    }
}
async function suaSanPham(id) {
    try {
        const response = await fetch(`http://localhost:3000/sanPham/${id}`);
        const sanPham = await response.json();
        console.log(sanPham);
        document.querySelector('input[name="tenSP2"]').value = sanPham.tenSP;
        document.querySelector('input[name="Gia2"]').value = sanPham.Gia;
        document.querySelector('.danhmuc2').value = sanPham.iddm;
        var btn = document.querySelector('#submit2');
        btn.onclick = function() {
            capNhatSanPham(id);
        }
    } catch (error) {
        console.log('Lỗi khi tìm sản phẩm:', error);
    }
}


async function capNhatSanPham(id) {
    var tenSP2 = document.querySelector('input[name="tenSP2"]').value;
    var hinh2 = document.querySelector('input[name="hinh2"]').value.split('\\').pop();
    var Gia2 = document.querySelector('input[name="Gia2"]').value;
    var iddm2 = document.querySelector('.danhmuc2').value;
    hinh2 = `img/${hinh2}`; 
    const Response = await fetch(`http://localhost:3000/sanPham/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tenSP: tenSP2,
            hinh: hinh2, // Thêm lại dòng này
            Gia: Gia2,
            iddm: iddm2,
        }),
    });

    if (Response.ok) {
        fetchData(); 
    } else {
        console.error('Chưa sửa được');
    }
}

function show2(id) {
    var modal = document.getElementById("myModal2");
    modal.style.display = "block";
    suaSanPham(id);
}


function Xoasp(id) {
    var confirmed = confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
    if (!confirmed) {
        return;
    }
    var options = {
        method: 'DELETE',
    }
    fetch(`http://localhost:3000/sanPham/${id}`, options)
        .then((response) => response.json())
        .then(() => {
            console.log('Sản phẩm đã được xóa thành công');
            fetchData(); 
        })
}



function show() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
}




window.onclick = function(event) {
    var modal = document.getElementById("myModal2");
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

