function confirmProduct() {
  // const maxFileSize = 2 * 1024 * 1024;
  // const imageUpload = document.getElementById("imgOffline");
  // console.log(imageUpload);
  // function processImage(imageData) {
    // console.log(imageData);
    let infoProduct = document.querySelectorAll("input");
    let imgProductOn = infoProduct[0].value;
    let imgProductOff = infoProduct[1].value;
    let imgProduct;

    if (imgProductOn) {
      imgProduct = imgProductOn;
    } else {
      imgProduct = imgProductOff;
    }

    let quantityProduct = parseInt(infoProduct[2].value);
    if (isNaN(quantityProduct) || quantityProduct < 1) {
      alert("Số lượng sản phẩm không hợp lệ");
      return;
    }
    let nameProduct = infoProduct[3].value;
    let idProduct = infoProduct[4].value;
    let priceProduct = parseFloat(infoProduct[5].value);
    if (isNaN(priceProduct) || priceProduct < 0) {
      alert("Giá tiền ko hợp lệ");
      return;
    }

    let listProduct = JSON.parse(localStorage.getItem("mainProduct")) || [];
    let found = false;

    for (let i = 0; i < listProduct.length; i++) {
      if (listProduct[i].id == idProduct) {
        found = true;
        if (confirm("đã có sản phẩm trùng ID, bạn có muốn thêm ko ?")) {
          if (imgProduct) {
            imgProduct = listProduct[i].imgProduct;
          }
          listProduct[i].totalQuantity += quantityProduct;
          listProduct[i].name = nameProduct;
          listProduct[i].cost = priceProduct;
          localStorage.setItem("mainProduct", JSON.stringify(listProduct));
          addProduct(
            idProduct,
            imgProduct,
            nameProduct,
            priceProduct,
            quantityProduct
          );
        }
      }
    }

    if (!found) {
      addProduct(
        idProduct,
        imgProduct,
        nameProduct,
        priceProduct,
        quantityProduct
      );
    }
  // }
  // console.log("sao ko chay");
  // imageUpload.addEventListener("change", function (event) {
  //   const input = event.target;
  //   if (input.files && input.files[0]) {
  //     const file = input.files[0];
  //     console.log(file);
  //     const fileSize = file.size;
  //     if (fileSize > maxFileSize) {
  //       alert("Chọn file dưới 2Mb");
  //       input.value = "";
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       const imageData = e.target.result;
  //       console.log(imageData);
  //       processImage(imageData);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     processImage(null);
  //   }
  // });
}

function addProduct(
  idProduct,
  imgProduct,
  nameProduct,
  priceProduct,
  quantityProduct
) {
  let listProduct = JSON.parse(localStorage.getItem("mainProduct")) || [];

  const newProduct = {
    id: idProduct,
    img: imgProduct,
    name: nameProduct,
    cost: priceProduct,
    totalQuantity: quantityProduct,
  };
  listProduct.push(newProduct);
  localStorage.setItem("mainProduct", JSON.stringify(listProduct));
  let updatedListProduct = JSON.parse(localStorage.getItem("mainProduct"));
  if (updatedListProduct.some((product) => product.id === idProduct)) {
    alert("Sản phẩm đã đc thêm");
  } else {
    alert("Xảy ra lỗi khi thêm sản phẩm");
  }
}

//tìm kiếm và sửa
function find() {
  let dataEdit=JSON.parse(localStorage.getItem('mainProduct')) || [];
  let input= document.getElementById('findValue').value;
  console.log(dataEdit);
  console.log(input);
  if (!dataEdit) {
    console.log('Xảy ra lỗi với dữ liệu');
    return;
  }
  const checkProduct=dataEdit.filter(product=> product.id === input );
  let productData=[];
  if (checkProduct) {
    checkProduct.forEach(product =>{
      const data={
        id:product.id,
        img:product.img,
        name:product.name,
        cost:product.cost,
        totalQuantity:product.totalQuantity
      };
      productData.push(data);
    })
  }
  console.log(checkProduct);
  console.log(checkProduct[0].img);
  document.getElementById('edit-imgProduct').value=checkProduct[0].img;
  document.getElementById('edit-slProduct').value=checkProduct[0].totalQuantity;
  document.getElementById('edit-nameProduct').value=checkProduct[0].name;
  document.getElementById('edit-idProduct').value=checkProduct[0].id;
  document.getElementById('edit-costProduct').value=checkProduct[0].cost;
}

// confirm infoEdited
function confirmEdited(){
  let confirmInfo= document.querySelectorAll('.editProduct input');
  console.log(confirmInfo);
  let editImg=confirmInfo[1].value;
  let editName=confirmInfo[4].value;
  let editQuantity=confirmInfo[3].value;
  let editId=confirmInfo[5].value;
  let editCost=confirmInfo[6].value;

  let product=JSON.parse(localStorage.getItem('mainProduct')) ||[];
  let  productIndex = product.findIndex(p => p.id === editId);
 console.log(productIndex);
  if (productIndex) {
     const editedProduct={
        id:editId,
        img:editImg,
        name:editName,
        cost:editCost,
        totalQuantity:editQuantity
      }
      product.splice(productIndex,1,editedProduct);
      localStorage.setItem('mainProduct',JSON.stringify(product));
      localStorage.setItem('listProduct',JSON.stringify(product));
  }
}

//xóa sản phẩm
function deleteEditedProduct(){
  let confirmInfo= document.querySelectorAll('.editProduct input');
  let editId=confirmInfo[5].value;
  let product=JSON.parse(localStorage.getItem('mainProduct')) ||[];
  let  productIndex = product.findIndex(p => p.id === editId);
console.log(productIndex);
product.splice(productIndex,1);
localStorage.setItem('mainProduct',JSON.stringify(product));
localStorage.setItem('listProduct',JSON.stringify(product));
}


function reset() {
  document.querySelector(".addProduct").reset();
}
