//Require PopUp
function AddProduct_PopUp()
{
    PopUp.innerHTML += 
    `
    <form action="/product/add" method="POST" target="_blank">
        <h1>Add Product</h1>
        <label for="name">name:</label>
        <input type="text" id="name" name="name">
        <label for="price">price:</label>
        <input type="number" id="price" name="price">
        <label for="category">category:</label>
        <select name="category" id="category" class="col-12 col-sm-2">
          <option value="Food">Food </option>
          <option value="Beverage">Beverage </option>
        </select>
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
        <h1>Are you sure to delete <u>${ProductData[ProductIndex].name}</u> ?</h1>
        <input type="hidden" value="${ProductIndex}" name="index" readonly>
        <button type="submit">Yes</button>
    </form>
    `
    ShowPopUp();
}
function EditProduct_PopUp(ProductIndex){
    PopUp.innerHTML += 
    `
    <form action="/product/edit" method="POST" target="_blank">
        <h1>Add Product</h1>
        <input type="hidden" value="${ProductIndex}" name="index" readonly>
        <label for="name">name:</label>
        <input type="text" id="name" name="name" value="${ProductData[ProductIndex].name}">
        <label for="price">price:</label>
        <input type="number" id="price" name="price" value="${ProductData[ProductIndex].price}">
        <label for="category">category:</label>
        <select name="category" id="category" class="col-12 col-sm-2">
          <option value="Food">Food </option>
          <option value="Beverage">Beverage </option>
        </select>
        <label for="description">description:</label>
        <textarea id="description" name="description">${ProductData[ProductIndex].description}</textarea>
        <button id="Post-AddProduct" type="submit">Add</button>
    </form>
    `

    // Mengatur default category
    const selectElement = document.querySelector('#category');
    const options = selectElement.querySelectorAll('option');
    options.forEach(option => {
        if (option.value === ProductData[ProductIndex].category) {
            option.setAttribute('selected', 'selected');
        }
    });

    ShowPopUp();
}

//Update Date
let ProductData;
const ProductList = document.getElementById('ProductList');
function RenderData(data) {
    let ShowData = ``;
    data.forEach((e, i) => {
      ShowData +=
        `
        <div class="Product">
          <h4>${e.name}</h4>
          <div class="Action">
            <button onclick="EditProduct_PopUp(${i})">Edit</button>
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
    ProductData = data;
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
  RefreshData();
//End Get Data