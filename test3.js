function confirmProduct() {
  let imgProduct;
      const maxFileSize = 2 * 1024 * 1024;
      const input = document.getElementById('imgOffline');
      
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const fileSize = file.size;
        if (fileSize > maxFileSize) {
          alert('Chọn file dưới 2Mb');
          input.value = '';
          return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
          imgProduct = e.target.result;
          processData();
        };
        reader.readAsDataURL(file);
      } else {
        imgProduct = document.getElementById('imgProduct').value;
        processData();
      }
      function processData() {    
  let infoProduct = document.querySelectorAll("input");
  let imgProductOn = infoProduct[0].value;
  let imgProductOff = infoProduct[1].value;
  let imgProduct;

  if (infoProduct[0].value) {
    imgProduct = imgProductOn;
  } else {
    imgProduct = imgProductOff;
  }
  let quantityProduct = parseInt(infoProduct[2].value);
  if(isNaN(quantityProduct)||quantityProduct<1){
    alert('Số lượng sản phẩm không hợp lệ');
    return;
  }
  let nameProduct = infoProduct[3].value;
  let idProduct = infoProduct[4].value;
  let priceProduct = parseFloat(infoProduct[5].value);
  if (isNaN(priceProduct)||priceProduct<0){
    alert('Giá tiền ko hợp lệ');
    return;
  }
}}
