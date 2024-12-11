const Joi = require('joi');

const ProductPayloadSchema = Joi.object({
    name: Joi.string().required(), // Nama produk wajib diisi
    description: Joi.string().required(), // Deskripsi produk wajib diisi
    price: Joi.number().positive().precision(2).required(), // Harga produk, harus positif dengan 2 angka desimal
    stock: Joi.number().integer().min(0).required(), // Jumlah stok, harus bilangan bulat >= 0
    imageUrl: Joi.string().uri().required(), // URL gambar produk, harus berupa URI yang valid
  });
  

module.exports = { ProductPayloadSchema };
