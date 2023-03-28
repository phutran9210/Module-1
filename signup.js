function login(){  
    var username =  document.getElementById('nameSignup').value;
    var password= document.getElementById('passWordSignup').value;
    var data = JSON.parse(localStorage.getItem('user'));
    console.log(data);
    console.log(username);
    if (username === '' || password === ''){
        if(username===''){
            document.getElementById('nameSignup').style.backgroundColor='yellow';
        }
        if(password===''){
            document.getElementById('passWordSignup').style.backgroundColor='yellow';
        }
    } else if (data !== null && username === data.username && password === data.password){
        alert('Đăng nhập thành công');
    } else {
        alert('Tên tài khoản hoặc mật khẩu không chính xác');
    }
}