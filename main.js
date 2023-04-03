// xử lý css
const loginBtn= document.getElementById('login-btn');
const logoutBtn=document.getElementById('logout-btn');
const siginBtn=document.getElementById('signin-btn')
function login(){
  const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedUser) {
    loginBtn.style.display='none';
    logoutBtn.style.display='inline-block';
    siginBtn.style.display='none';
  }
}
function redirectToLogin() {
  window.location.href = 'signup.html';
}
function logout(){
  localStorage.removeItem('loggedInUser');
  loginBtn.style.display = 'inline-block';
  logoutBtn.style.display='none';
  siginBtn.style.display='inline-block';
}
function signin(){
  window.location.href='signin.html';
}

var loggedUser=JSON.parse(localStorage.getItem('loggedInUser'));
if (loggedUser) {
login();
} else {
logout();
}
loginBtn.addEventListener('click', redirectToLogin);
// tìm kiếm css

// Xử lý logic
// loginBtn.addEventListener('click',function(){
//   window.location.href='signup.html';
// });
// let mainProduct = JSON.parse(localStorage.getItem('mainProduct'));
// let listProduct = JSON.parse(localStorage.getItem("listProduct"));

// if (!listProduct) {
//   listProduct = [...mainProduct];
//   localStorage.setItem("listProduct", JSON.stringify(listProduct));
// }

// for (let i = 0; i < mainProduct.length; i++) {
//   let found = false;
//   for (let j = 0; j < listProduct.length; j++) {
//     if (mainProduct[i].id === listProduct[j].id) {
//       found = true;
//       break;
//     }
//   }
//   if (!found) {
//     listProduct.push(mainProduct[i]);
//   }
// }
// localStorage.setItem("listProduct", JSON.stringify(listProduct));
function updateListProduct() {
  let mainProduct = JSON.parse(localStorage.getItem('mainProduct'));
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));

  if (!listProduct) {
    listProduct = [...mainProduct];
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
  }

  for (let i = 0; i < mainProduct.length; i++) {
    let found = false;
    for (let j = 0; j < listProduct.length; j++) {
      if (mainProduct[i].id === listProduct[j].id) {
        found = true;
        break;
      }
    }
    if (!found) {
      listProduct.push(mainProduct[i]);
    }
  }
  localStorage.setItem("listProduct", JSON.stringify(listProduct));
}
updateListProduct();
renderProduct();

function renderProduct() {
  let listProduct=JSON.parse(localStorage.getItem('listProduct')) || [];
  let result = "";
  for (let i = 0; i < listProduct.length; i++) {
    result += `
        <div class="item">
        <div class="item-thumb">
            <img src="${listProduct[i].img}" alt="">
        </div>
        <span class="item-title">${listProduct[i].name}</span>
        <div class="item-price">
            <span>${listProduct[i].cost}</span>
        </div>
        <div class="hiddenId">${listProduct[i].id}</div>

        <button class="btn btn-primary" >Thêm vào giỏ hàng</button>
    </div>
        `;
  }
  document.querySelector(".items").innerHTML = result;
}


// Lấy dữ liệu giỏ hàng

 var loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
console.log(loggedUser);
if (!loggedUser) {
  alert('vui lòng đăng nhập để mua hàng');
  // return;
}
const cartID = `${loggedUser.username}`;
const cart = JSON.parse(localStorage.getItem('cart'))||{};
if (!cart[cartID]){
  cart[cartID]={
    item : []
  };
}

const btnCart = document.querySelectorAll(".items button");
btnCart.forEach(function (button, index) {
  button.addEventListener("click", (event) => {
    const btnItem = event.target;
    const product = btnItem.parentElement;
    const productImg = product.querySelector("img").src;
    const productName = product.querySelector(".item-title").innerText;
    const productPrice = product.querySelector(".item-price").innerText;
    const productId = product.querySelector(".hiddenId").innerText;
    let productQuantity;
     const item = {
      productId: productId,
      productName: productName,
      productImg: productImg,
      productPrice: productPrice,
      productQuantity: 1,
    };
    if (
      cart[cartID].item.some((itemInCart) => itemInCart.productId === item.productId)
    ) {
      alert("Sản phẩm đã tồn tại trong giỏ hàng");
    } else {
      cart[cartID].item.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    updateQuantity();
  });
});


// hiệu ứng thêm vào giỏ hàng
function updateQuantity(){
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser")).username;
  console.log(currentUser);
  const maindataCart = JSON.parse(localStorage.getItem("cart"));    
  let dataCart;
  for (const key in maindataCart) {
    if (maindataCart.hasOwnProperty(key)) {
      if (maindataCart[key].hasOwnProperty("item")) {
        dataCart = maindataCart[key].item;
        break;
      }
    }
  }
  console.log(dataCart);
  const totalQuantity = dataCart.reduce((sum, product) => sum + product.productQuantity, 0);
  let cartElement = document.querySelector('.cart-quantity');
  cartElement.textContent=totalQuantity;
}
document.addEventListener('DOMContentLoaded', () => {
  updateQuantity();
});
