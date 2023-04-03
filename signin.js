function creatUser(username,password,email,isAdmin=false,isBan=false){
    const users= JSON.parse(localStorage.getItem('users')) || [];
    const newUser={
        username:username,
        password:password,
        email:email,
        isAdmin: isAdmin,
        isBan: isBan
    }
    if (users.some(u=>u.email===email)) {
        alert('Email đã được sử dụng để đăng kí, vui lòng sử dụng email khác');
    }
    if (users.some(u => u.username === username)){
        alert('Tên đăng kí đã tồn tại, vui lòng chọn tên đăng nhập khác');
    }else{
        users.push(newUser);
        localStorage.setItem('users',JSON.stringify(users));
        alert('đăng kí thành công');
        window.location.href = 'index.html';    
    }
    
   
 }
function send() {
  
    let getInfo = document.getElementsByTagName("input");
    let username = getInfo[0].value;
    let password = getInfo[1].value;
    let rePassword=getInfo[2].value;
    let name = getInfo[3].value;
    let email = getInfo[4].value;
    let address = getInfo[5].value;
    let age = getInfo[6].value;
    let gender = '';
    let favoritCheck1 = getInfo[9].checked;
    let favoritCheck2 = getInfo[10].checked;
    let favoritCheck3 = getInfo[11].checked;
    let favorite = '';

    if (password!==rePassword) {
        alert('mk ko dung')
    }
    if (name === '' || email === "" || address === '' || age === '') {
        alert('vui long nhap du thong tin');
        return;
    }
    if (isNaN(age)) {
        alert(' Vui long nhap dung dinh dang tuoi');
        return;
    }
    if (getInfo[7].checked) {
        gender = 'Male';
    } else {
        gender = 'Female';
    }

    let favoriteChecked = getInfo[9].checked || getInfo[10].checked || getInfo[11].checked;
    if (!favoriteChecked) {
        alert('Vui lòng chọn ít nhất một sở thích');
        return;
    }
    for (let i = 9; i <= 11; i++) {
        if (getInfo[i].checked) {

            favorite += getInfo[i].value + " ";
        }
    }

 creatUser(username,password,email,false,false)
}

function reset() {
    document.getElementsByTagName('form')[0].reset();
}
