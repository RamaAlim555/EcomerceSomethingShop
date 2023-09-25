function ProductPopUp(Index) {
    PopUp.innerHTML =
    `
    <div id="PopUpBody">
    <img src="..." class="img-fluid" alt="...">
    <h1>${ProductData[Index].name}</h1>
    <h2>Rp.${ProductData[Index].price.toString()}</h2>
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
        })
        .catch((error) => {
        // Tangani kesalahan jika terjadi
        console.error('Kesalahan:', error);
        });
    }
UpdateData();