function ProductPopUp(Index) {
    PopUp.innerHTML =
    `
    <div id="PopUpBody">
    <img src="..." class="img-fluid" alt="...">
    <h1>${ProductData[Index].name}</h1>
    <h2>Rp.${(ProductData[Index].price)}</h2>
    <p>${ProductData[Index].description}</p>
    <a href="https://api.whatsapp.com/send?phone=6285772930332&text=Ya%20hallo"><button>Buy</button></a>
    </div>
    `
    ShowPopUp()
}

//Get Data
let ProductData;
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
          throw new Error('Fail to load data');
        }
        return response.json(); // Menguraikan respons JSON dari server
      })
      .catch((error) => {
        // Tangani kesalahan jika terjadi
        console.error('Kesalahan:', error);
      });
  };
//End Get Data
function UpdateData() {
    SourceData()
        .then((data) => {
        ProductData = data;
        RefreshList();
        })
        .catch((error) => {
        // Tangani kesalahan jika terjadi
        console.error('Kesalahan:', error);
        });
    }

// URL //
function ReqQueryObject() {
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const parsedObject = {};

  queryParams.forEach((value, key) => {
    parsedObject[key] = value;
  });

  return parsedObject;
}

//Product List//
const ProductList = document.getElementById('ProductList');
function RefreshList() {

  ProductList.innerHTML = "";

  const queryParameters = ReqQueryObject();

  fillteredData(ProductData,queryParameters).forEach((e,i) =>
  ProductList.innerHTML +=
  `
    <div class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
      <div class="card ScaleUp" style="width: 18rem;" onclick="ProductPopUp(${ i })">
        <img src="${ e.img }" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-text"> ${ e.name } </h4>
          <h5 class="card-text"> Rp.${ FormatStringNumber(e.price) } </h5>
          <p class="card-text"> ${ e.description }</p>
        </div>
      </div>
    </div>
  `); 
}

function fillteredData(ProductData, queryParameters) {
  const filteredData = ProductData.filter((product) => {
    // Filter berdasarkan parameter "search"
    if (queryParameters.search && !product.name.toLowerCase().includes(queryParameters.search.toLowerCase())) {
      return false;
    }

    // Filter berdasarkan parameter "minprice" jika ada
    if (queryParameters.MinPrice && product.price < parseFloat(queryParameters.MinPrice)) {
      return false;
    }

    // Filter berdasarkan parameter "maxprice" jika ada
    if (queryParameters.MaxPrice && product.price > parseFloat(queryParameters.MaxPrice)) {
      return false;
    }

    // Filter berdasarkan parameter "category" jika ada
    if (queryParameters.category && product.category !== queryParameters.category) {
      return false;
    }

    return true;
  });

  return filteredData;
}

function FormatStringNumber(numberString) {
  // Ubah string menjadi tipe data angka (number)
  const number = parseFloat(numberString.replace(',', '.'));

  // Cek apakah angka valid
  if (isNaN(number)) {
    return "Format tidak valid";
  }

  // Format angka dengan titik sebagai pemisah ribuan
  const formattedNumber = number.toLocaleString('id-ID'); // Menggunakan 'id-ID' untuk format angka Indonesia

  return formattedNumber;
}
