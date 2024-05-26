async function check() {
    var email = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;
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

    let response = await fetch('http://localhost:3000/user');
    let users = await response.json();
    let user = users.find(user => user.email == email, user => user.Role == Role );

    if(user) {
        if(user.password == password){
            if(user.Role == 1) {
                window.location.href = "http://127.0.0.1:5501/admin_product.html?id=" + user.id;
                fetchData();
                console.log(user);
            } else {
                window.location.href = "http://127.0.0.1:5501/admin_product.html?id=" + user.id;
            }
        } else {
            alert("Mật khẩu không đúng!");
        }
    } else {
        alert("Tài khoản không tồn tại!");
    }
    return false;
}


function thoat() {
    if (confirm("Bạn có chắc chắn muốn thoát không?")) {
        window.location.href = "http://127.0.0.1:5500/ASM/index.html";
    } 
}

    function showPass() {
        var x = document.getElementById("Password");
        if(x.type != ""){
            x.type.document = "********";
            if(x.type === "password"){
                x.type = "text";
            }else{
                x.type = "password";
            }
        }else if(parseInt(Password.value)<=0){
            alert("Vui lòng không nhập số âm!");
            Password.focus();
            Password.style.backgroundColor= "#fec9c9";
            return false;
        }else if(Password.value.length <5){
            alert("Vui lòng điền đủ kí tự!");
            Password.focus();
            Password.style.backgroundColor= "#fec9c9";
            return false;
        }
    }
 