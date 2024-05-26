 id=0;
 async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/user');
        const data = await response.json();
        console.log(data);
        id = data[data.length - 1].id;
        console.log('Đã nhận được dữ liệu');
        addUser();
    } catch (error) {
        console.log('lỗi: ', error);
    }
}
fetchData();
function postUser(form) {
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
async function addUser() {
    var btn = document.querySelector('#submit');
    btn.onclick = async function() {
        var name = document.querySelector('input[name="name"]').value; 
        var email = document.querySelector('input[name="email"]').value;
        var phone = document.querySelector('input[name="phone"]').value;
        var password = document.querySelector('input[name="password"]').value;
        var Role = document.querySelector('.Role').value;
        var form = {
            id: String(++id),
            name: name,
            email: email,
            phone: phone,
            password: password,
            Role: Role,
        }
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }
        if(email == ""){
            alert("Vui lòng điền email!");
            return false;
        } else if(parseInt(email)<=0){
            alert("Vui lòng không nhập số âm!");
            return false;
        } else if(email.length <7){
            alert("Vui lòng điền đủ kí tự!");
            return false;
        } else if(!email.endsWith("@gmail.com")){
            alert("Email bắt buộc nhập đuôi @gmail.com!");
            return false;
        }
        if(password == ""){
            alert("Vui lòng điền Password!");
            return false;
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

function showPass() {
    var x = document.getElementById("password");
    if(x.type != ""){
        x.type.document = "********";
        if(x.type === "password"){
            x.type = "text";
        }else{
            x.type = "password";
        }
    }else if(parseInt(password.value)<=0){
        alert("Vui lòng không nhập số âm!");
        password.focus();
        password.style.backgroundColor= "#fec9c9";
        return false;
    }else if(password.value.length <5){
        alert("Vui lòng điền đủ kí tự!");
        password.focus();
        password.style.backgroundColor= "#fec9c9";
        return false;
    }
}
