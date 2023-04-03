function renderCart() {
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
  let result = "";
  for (let i = 0; i < dataCart.length; i++) {
    result += `
      <tr>
        <td>${dataCart[i].productName}</td>
        <td><img src="${dataCart[i].productImg}" alt=""></td>
        <td><span>${dataCart[i].productPrice}</span></td>
        <td><input data-index="${i}" value="${dataCart[i].productQuantity}" type="number"></td>
        <td><button class="cartDelete"  data-index="${i}">Xóa</button></td>
      </tr>
    `;
  }
  document.getElementById("renderCart").innerHTML = result;
  totalCart();
  
}
renderCart();

// Thay đổi số lượng
function handleQuantityChange() {
const changeInput = document.querySelectorAll('input[type="number"]');
console.log(changeInput);
for (let i = 0; i < changeInput.length; i++) {
  changeInput[i].addEventListener("change", function (event) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(loggedInUser);
    if (!loggedInUser) {
      return;
    }
    const cardID = loggedInUser.username;
    console.log(cardID);
    let index = event.target.getAttribute("data-index");
    let quantity = parseInt(event.target.value);
    if (quantity < 1 || isNaN(quantity)) {
      quantity = 1;
      event.target.value = 1;
    }
    var maindataCart = JSON.parse(localStorage.getItem("cart"));
    let dataCart;
    for (const key in maindataCart) {
      if (maindataCart.hasOwnProperty(key)) {
        if (maindataCart[key].hasOwnProperty("item")) {
          dataCart = maindataCart[key].item;
          break;
        }
      }
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const cartItems = cart[cardID].item;
    console.log(cartItems);
    const itemIndex = cartItems.findIndex(
      (item) => item.productId === dataCart[index].productId
    );
    if (itemIndex != -1) {
      console.log(dataCart[index].productQuantity);
      dataCart[index].productQuantity = quantity;
      localStorage.setItem("cart", JSON.stringify(maindataCart));
      totalCart();
    }
  });
}
}
// Xóa sản phẩm
function deleteProduct() {
  const maindataCart = JSON.parse(localStorage.getItem("cart"));
  let dataCart;
  let currentUser;
  for (const key in maindataCart) {
    if (maindataCart.hasOwnProperty(key)) {
      if (maindataCart[key].hasOwnProperty("item")) {
        currentUser=key;
        dataCart = maindataCart[key].item;
        break;
      }
    }
  }
  console.log(dataCart);
  const deleteButtons = document.querySelectorAll(".cartDelete");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        const index = event.target.getAttribute("data-index");
        dataCart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(maindataCart));
        event.target.parentElement.parentElement.remove();
        totalCart();
        if (dataCart.length === 0) {
          localStorage.setItem("cart", JSON.stringify({}));
          dataCart = [];
        }
      }
    });
  });
}

// Tính tiền

function totalCart() {
  var carItem = document.querySelectorAll("tbody tr");

  let total = 0;
  for (var i = 0; i < carItem.length; i++) {
    var inputValue = parseInt(carItem[i].querySelector("input").value);
    var priceValue = parseFloat(carItem[i].querySelector("span").innerText);

    let totalPriceItem = inputValue * priceValue;
    total = total + totalPriceItem;
  }
  document.getElementById("totalPrice").innerHTML = total;
}

// thanh toán
function payment() {
  const personalCart = JSON.parse(localStorage.getItem("cart"));
  console.log(personalCart);
  let dataCart;
  for (const key in personalCart) {
    if (personalCart.hasOwnProperty(key)) {
      if (personalCart[key].hasOwnProperty("item")) {
        dataCart = personalCart[key].item;
        break;
      }
    }
  }
  console.log(dataCart);
  let personalUser = Object.keys(personalCart)[0];
  console.log(personalUser);
  const userCart = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!userCart) {
    console.log("Vui lòng đăng nhập để mua hàng");
    return;
  }
  let nameLogin = userCart.username;
  if (personalUser == nameLogin) {
    $('#buy-button').on('click', function() {
      $('#checkoutModal').modal('show');
    });
    
  } else {
    console.log("Xảy ra lỗi trong quá trình thanh toán");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  renderCart();
  deleteProduct();
  handleQuantityChange()
});
