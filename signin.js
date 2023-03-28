function send() {
    var getInfo = document.getElementsByTagName("input");
    var username = getInfo[0].value;
    var password = getInfo[1].value;
    var rePassword=getInfo[2].value;
    var name = getInfo[3].value;
    var email = getInfo[4].value;
    var address = getInfo[5].value;
    var age = getInfo[6].value;
    var gender = '';
    var favoritCheck1 = getInfo[9].checked;
    var favoritCheck2 = getInfo[10].checked;
    var favoritCheck3 = getInfo[11].checked;
    var favorite = '';

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

    var favoriteChecked = getInfo[9].checked || getInfo[10].checked || getInfo[11].checked;
    if (!favoriteChecked) {
        alert('Vui lòng chọn ít nhất một sở thích');
        return;
    }
    for (var i = 9; i <= 11; i++) {
        if (getInfo[i].checked) {

            favorite = favorite + getInfo[i].value + " ";
        }
    }
    var user = {
        username:username,
        email:email,
        password: password
    }
    console.log(user);
    localStorage.setItem('user',JSON.stringify(user));
    var choice = confirm('Xac nhan thong tin \n' + name + '\n' + age + '\n' + address + '\n' + favorite + '\n' + gender)
    if (choice) {
        alert('Hoan tat dang ki');
        return;
    }

}

function reset() {
    document.getElementsByTagName('form')[0].reset();
}