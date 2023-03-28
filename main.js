let menTopsProduct = [
  {
    id: 1,
    img: "./img/thump/thump1.jpg",
    name: "Áo trắng",
    cost: 10000,
  },
  {
    id: 2,
    img: "./img/thump/thump2.jpg",
    name: "Áo đen",
    cost: 15000,
  },
  {
    id: 3,
    img: "./img/thump/thump3.jpg",
    name: "Áo đỏ",
    cost: 12000,
  },
  {
    id: 4,
    img: "./img/thump/thump4.jpg",
    name: "Áo hồng",
    cost: 13000,
  },
];
let listProduct = JSON.parse(localStorage.getItem("listProduct"));
if (listProduct === null) {
  listProduct = [];
  for (let i = 0; i < menTopsProduct.length; i++) {
    listProduct.push(menTopsProduct[i]);
  }
  localStorage.setItem("listProduct", JSON.stringify(listProduct));
  renderProduct();
} else {
  localStorage.setItem("listProduct", JSON.stringify(listProduct));
  renderProduct();
}

function renderProduct() {
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
  document.getElementsByClassName("items")[0].innerHTML = result;
}



// Lấy dữ liệu giỏ hàng 

const btnCart = document.querySelectorAll(".items button");
console.log(btnCart);
console.log( document.getElementById('renderCart'));
itemCart=[];
btnCart.forEach(function (button,index) {
  button.addEventListener('click',function(event){
    var btnItem=event.target;
    var product=btnItem.parentElement;
    var productImg=product.querySelector('img').src;
    var productName = product.querySelector('.item-title').innerText;
    var productPrice=product.querySelector('.item-price').innerText;
    var productId = product.querySelector('.hiddenId').innerText;
   
    item= {
    productId: productId,
    productName: productName,
    productImg : productImg,
    productPrice: productPrice
   }
   if (itemCart.some(itemInCart => itemInCart.productId === item.productId)) {
    alert("Sản phẩm đã tồn tại trong giỏ hàng");
  } else {
    itemCart.push(item);
    console.log(itemCart);
    localStorage.setItem('itemCart', JSON.stringify(itemCart));
  }
  })

})

