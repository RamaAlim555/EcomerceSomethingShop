//Require PopUp
function AddProduct_PopUp()
{
    PopUp.innerHTML += 
    `
    <form action="/product/add" method="POST" target="_blank">
        <h1>Add Product</h1>
        <label for="name">name:</label>
        <input type="text" id="name" name="name">
        <label for="description">description:</label>
        <textarea id="description" name="description"></textarea>
        <button id="Post-AddProduct" type="submit">Add</button>
    </form>
    `
    ShowPopUp();
}
function DeleteProduct_PopUp(ProductIndex){
    PopUp.innerHTML += 
    `
    <form action="/product/delete" method="POST" target="_blank">
        <h1>Are you sure to delete this product ?</h1>
        <input class="d-none" type="number" value="${ProductIndex}" name="index" readonly>
        <button type="submit">Yes</button>
    </form>
    `
    ShowPopUp();
}
function EditProduct_PopUp(ProductIndex){
    PopUp.innerHTML += 
    `
    <form action="/product/add" method="POST" target="_blank">
        <h1>Add Product</h1>
        <label for="name">name:</label>
        <input type="text" id="name" name="name">
        <label for="description">description:</label>
        <textarea id="description" name="description"></textarea>
        <button id="Post-AddProduct" type="submit">Add</button>
    </form>
    `
    ShowPopUp();
}

//Update Date
const ProductList = document.getElementById('ProductList');
function RenderData(data) {
    let ShowData = ``;
    data.forEach((e, i) => {
      ShowData +=
        `
        <div class="Product">
          <h4>${e.name}</h4>
          <div class="Action">
            <button onclick="EditProduct_PopUp(${i})" disabled>Edit</button>
            <button onclick="DeleteProduct_PopUp(${i})">Delete</button>
          </div>
        </div>
      `;
    });
    ProductList.innerHTML = ShowData;
}
function RefreshData() {
SourceData()
    .then((data) => {
    RenderData(data);
    })
    .catch((error) => {
    // Tangani kesalahan jika terjadi
    console.error('Kesalahan:', error);
    });
}
  
//Get Data
const ProductDataURL= '/admin/productdata'
const requestOptions = {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json', // Atur tipe konten sebagai JSON
    },
  };
  const SourceData = () => {
    return fetch(ProductDataURL, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal meminta data');
        }
        return response.json(); // Menguraikan respons JSON dari server
      })
      .catch((error) => {
        // Tangani kesalahan jika terjadi
        console.error('Kesalahan:', error);
      });
  };
//End Get Data