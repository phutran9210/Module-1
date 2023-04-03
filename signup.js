
function login(){     
    var username =  document.getElementById('nameSignup').value;
    var password= document.getElementById('passWordSignup').value;
    const data = JSON.parse(localStorage.getItem('users'));
   
    console.log(data);
    console.log(username);
    if (username === '' || password === ''){
        if(username===''){
            document.getElementById('nameSignup').style.backgroundColor='#ddd';
        }
        if(password===''){
            document.getElementById('passWordSignup').style.backgroundColor='#ddd';
        }
    }
    if (!data) {
        alert('đã xảy ra lỗi trong quá trình đăng nhập');
    }
    const user = data.find(user => user.username===username && user.password===password);
    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        if (user.isAdmin) {
            window.location.href = 'adminPage.html'
        } else {
            alert('đăng nhập thành công')
            window.location.href = 'index.html';    
        }
      
    } else {
        alert('vui lòng nhập đúng thông tin')
    }

}