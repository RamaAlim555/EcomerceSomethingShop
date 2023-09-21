// Web Setup
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const path = require('path');
const rootPath = __dirname;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({
    secret: 'rahasia', // Gantilah dengan string rahasia yang lebih aman
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Pastikan ini true jika Anda menggunakan HTTPS
        httpOnly: true, // Ini mencegah akses langsung ke cookie dari JavaScript di klien
        maxAge: 3600000, // Waktu maksimum (dalam milidetik) sebelum cookie kedaluwarsa, disetel ke 1 jam
    }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//JSON
const JSONmanager = require('./utilities/JSONmanager.js');

//Admin
function isAdmin(req, res, next) {
    if (req.session.username === "admin") {
        next(); // Lanjutkan ke middleware berikutnya atau rute
    } else {
        res.redirect('/admin'); // Redirect jika tidak memiliki hak akses admin
    }
}
//Admin Only
app.get('/admin/dashboard', isAdmin, (req, res) => {
    const ProductData = JSONmanager.ShowProducts();
    res.render('dashboard',{ProductData:ProductData});
});
app.get('/admin/productdata',isAdmin,(req,res)=>{
    const ProductData = JSONmanager.ShowProducts();
    res.send(ProductData);
});

//Login
app.get('/admin', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Verifikasi kredensial pengguna di sini (misalnya, dari database)
    if (username === 'admin' && password === 'password') {
        console.log("success login")
        req.session.username = 'admin'; // Set data session
        res.redirect('/admin/dashboard'); // Redirect ke halaman dashboard setelah login berhasil
    } else {
        res.send(username +" "+password); // Redirect kembali ke halaman login jika login gagal
    }
});

// Halaman Logout
app.get('/logout', (req, res) => {
    req.session.destroy(); // Hapus sesi saat logout
    res.redirect('/'); // Redirect kembali ke halaman login setelah logout
});

// Product URL
app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    const products = JSONmanager.ProductRead();
    
    // Menggunakan metode find dengan fungsi yang sesuai
    const product = products.find(item => item.id === productId);
    
    if (!product) {
      return res.status(404).send('Produk tidak ditemukan'); // Produk tidak ditemukan
    }
  
    res.render('main', { title: 'Product Details', product });
  });

app.post('/product/add', isAdmin,(req, res) => {
    try { JSONmanager.AddProduct(req.body);
    
        // Menyusun pesan sukses
        const successMessage = `<html><head><script>setTimeout(() => {window.close();}, 1); // Sesuaikan waktu sesuai kebutuhan Anda</script></head><body></body></html>`;
        // Mengirim pesan sukses sebagai respons
        res.send(successMessage);
      } catch (error) {
        // Mengirim pesan kesalahan sebagai respons jika terjadi kesalahan
        res.status(500).send(`Terjadi kesalahan: ${error.message}`);
      }
});
app.post('/product/delete', isAdmin,(req, res) => {
    try { JSONmanager.DeleteProduct(req.body.index);
    
        // Menyusun pesan sukses
        const successMessage = `
            <html>
            <head>
                <script>
                    setTimeout(() => {
                        window.close();
                    }, 1); // Sesuaikan waktu sesuai kebutuhan Anda
                </script>
            </head>
            <body>
            </body>
            </html>
        `;
    
        // Mengirim pesan sukses sebagai respons
        res.send(successMessage);
      } catch (error) {
        // Mengirim pesan kesalahan sebagai respons jika terjadi kesalahan
        res.status(500).send(`Terjadi kesalahan: ${error.message}`);
      }
});
























// Web Url
app.get('/', (req, res) => {
    res.render('main', {title:"Main"});
});

//404//
app.get('*', (req, res) => {
    res.status(404).send('Halaman tidak ditemukan');
});
//LocalHost//
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}/`);
});
