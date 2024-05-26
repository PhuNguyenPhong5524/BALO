id=0;
async function fetchData() {
   try {
       const response = await fetch('http://localhost:3000/user');
       const data = await response.json();
       console.log(data);
       id = data[data.length - 1].id;
       console.log('Đã nhận được dữ liệu');
       addUser();
       render_Admin_User(data);
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
   fetch('http://localhost:3000/user', options) 
       .then((response) => response.json())
       .then(callback)
}

function render_Admin_User(User){
    var list_Admin_User = document.querySelector('#user');
    var htmls = User.map(function(e){
        document.getElementById("soUS").innerHTML  = User.length;
        var role = e.Role == 1 ? "Admin" : "Khách hàng";
        return `
        <tr>
            <td>${e.name}</td>
            <td>${e.email}</td>
            <td>${e.phone}</td>
            <td >${role}</td>
            <td class="box_btn"">
                <button class="btn1" onclick="show2(${e.id})" type="button">Sửa</button>
                <button class="btn2" onclick="Xoaus(${e.id})" type="button">Xóa</button>
            </td>
        </tr>
        `
    });
    
    list_Admin_User.innerHTML = htmls.join('');
}
function Xoaus(id) {
    var confirmed = confirm('Bạn có chắc chắn muốn xóa tài khoản này không?');
    if (!confirmed) {
        return;
    }
    var options = {
        method: 'DELETE',
    }
    fetch(`http://localhost:3000/user/${id}`, options)
        .then((response) => response.json())
        .then(() => {
            console.log('Sản phẩm đã được xóa thành công');
            fetchData(); 
        })
}
async function addUser() {
    var btn = document.querySelector('#submit');
    btn.onclick = async function() {
        var name = document.querySelector('input[name="name"]').value; 
        var email = document.querySelector('input[name="email"]').value;
        var phone = document.querySelector('input[name="phone"]').value;
        var Role = document.querySelector('.Role').value;
        var form = {
            id: String(++id),
            name: name,
            email: email,
            phone: phone,
            Role: Role,
        }
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }
        try {
            const response = await fetch('http://localhost:3000/user', options);
            const data = await response.json();
            console.log('Sản phẩm đã được thêm thành công:', data);
            fetchData(); 
        } catch (error) {
            console.log('Lỗi khi thêm sản phẩm:', error);
        }
    }
}

async function suaTaiKhoan(id) {
    try {
        const response = await fetch(`http://localhost:3000/user/${id}`);
        const user = await response.json();
        console.log(user);
        document.querySelector('input[name="name2"]').value = user.name;
        document.querySelector('input[name="email2"]').value = user.email;
        document.querySelector('input[name="phone2"]').value = user.phone;
        document.querySelector('.Role2').value = user.Role;
        var btn = document.querySelector('#submit2');
        btn.onclick = function() {
            capNhatUser(id);
        }
    } catch (error) {
        console.log('Lỗi khi tìm sản phẩm:', error);
    }
}


async function capNhatUser(id) {
    var name2 = document.querySelector('input[name="name2"]').value; 
    var email2 = document.querySelector('input[name="email2"]').value;
    var phone2 = document.querySelector('input[name="phone2"]').value;
    var Role2 = document.querySelector('.Role2').value;
    const Response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name2,
            email: email2,
            phone: phone2,
            Role: Role2,
        }),
    });

    if (Response.ok) {
        fetchData(); 
    } else {
        console.error('Chưa sửa được');
    }
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

function show2(id) {
    var modal = document.getElementById("myModal2");
    modal.style.display = "block";
    suaTaiKhoan(id);
}
window.onclick = function(event) {
    var modal = document.getElementById("myModal2");
    if (event.target == modal) {
      modal.style.display = "none";
    }
}