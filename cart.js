let dataCart=JSON.parse(localStorage.getItem('itemCart'));
console.log(dataCart);
let result ='';
for (let i= 0;i<dataCart.length;i++){
  result+=`
  <tr>
  <td>${dataCart[i].productName}</td>
  <td><img src="${dataCart[i].productImg}" alt=""></td>
  <td><span>${dataCart[i].productPrice}</span></td>
  <td><input value="1" type="number"></td>
  <td><button class="cartDelete"  data-index="${i}">Xóa</button></td>
</tr>
  `
};
document.getElementById('renderCart').innerHTML=result;

var deleteButtons = document.querySelectorAll('.cartDelete');
console.log(deleteButtons);
for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener('click', function(event) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      var index = event.target.getAttribute('data-index');
      dataCart.splice(index, 1);
      localStorage.setItem('itemCart', JSON.stringify(dataCart));
      console.log(event.target.parentElement.parentElement);
      event.target.parentElement.parentElement.remove();
    }
  });
}
