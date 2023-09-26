const { error } = require('console');
const fs = require('fs');
const path = require('path');

const JSON_FOLDER = 'JSON';
const ProductJSON = 'products.json';

// Fungsi untuk memastikan folder dan file JSON ada
function ensureJsonFolderAndFile() {
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER);
  }

  const jsonFilePath = path.join(JSON_FOLDER, ProductJSON);
  if (!fs.existsSync(jsonFilePath)) {
    fs.writeFileSync(jsonFilePath, '[]', 'utf8');
  }
}

// Fungsi untuk membaca isi file products.json
function ShowProducts() {
    ensureJsonFolderAndFile();

    const jsonFilePath = path.join(JSON_FOLDER, ProductJSON);
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    const products = JSON.parse(jsonData);
    return products
}

// Fungsi untuk menambahkan produk ke file products.json jika tidak ada produk dengan nama yang sama
function AddProduct(product) {
  ensureJsonFolderAndFile();

  const jsonFilePath = path.join(JSON_FOLDER, ProductJSON);
  const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
  const products = JSON.parse(jsonData);

  // Memeriksa apakah ada produk dengan nama yang sama
  const existingProduct = products.find((p) => p.name === product.name);

  if (!existingProduct) {
    // Jika tidak ada produk dengan nama yang sama, tambahkan produk baru
    products.push(product);

    // Menyimpan perubahan ke file
    fs.writeFileSync(jsonFilePath, JSON.stringify(products, null, 2), 'utf8');
  } else {
    throw new error(`Produk dengan nama ${product.name} sudah ada.`);
  }
}

// Contoh penggunaan:
// ShowProducts();

// const newProduct = { name: 'Kamera', price: 500 };
// AddProduct(newProduct);

// ShowProducts();

// Fungsi untuk menghapus produk berdasarkan indeks
function DeleteProduct(index) {
  ensureJsonFolderAndFile();

  const jsonFilePath = path.join(JSON_FOLDER, ProductJSON);
  const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
  const products = JSON.parse(jsonData);

  // Memeriksa apakah indeks yang diberikan valid
  if (index >= 0 && index < products.length) {
    // Menghapus produk berdasarkan indeks
    products.splice(index, 1);

    // Menyimpan perubahan ke file
    fs.writeFileSync(jsonFilePath, JSON.stringify(products, null, 2), 'utf8');
  } else {
    throw new Error(`Indeks ${index} tidak valid.`);
  }
}

function EditProduct(product){
  ensureJsonFolderAndFile();

  const jsonFilePath = path.join(JSON_FOLDER, ProductJSON);
  const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
  const products = JSON.parse(jsonData);

  if (products[product.index] != undefined) {
    // Jika indeks ditemukan, ganti elemen dengan objek
    products.splice(product.index, 1, product);
  } else {
    throw new Error(`Index product tidak ada`);
  }
  fs.writeFileSync(jsonFilePath, JSON.stringify(products, null, 2), 'utf8');
}

module.exports = { ShowProducts, AddProduct, DeleteProduct, EditProduct};