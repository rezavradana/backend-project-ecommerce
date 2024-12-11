const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");

const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const AuthenticationError = require("../../exceptions/AuthenticationError");

class UsersService {
     constructor() {
          this._pool = new Pool();
     }

     async addUser({ username, email, password }) {
          await this.verifyNewUser(email);

          const id = `user-${nanoid(16)}`;
          const hashedPassword = await bcrypt.hash(password, 8);
          const query = {
               text: "INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id",
               values: [id, username, email, hashedPassword],
          };

          const result = await this._pool.query(query);
               if (!result.rows.length) {
                    throw new InvariantError("Gagal menambahkan user!!");
               }

          return result.rows[0].id;
     }

     async verifyNewUser(email) {
          const query = {
               text: 'SELECT id FROM users WHERE email = $1',
               values: [email],
          };

          const result = await this._pool.query(query);
               if (result.rows.length > 0) {
                    throw new InvariantError("Gagal menambahkan akun. Email sudah digunakan!!");
               }
     };

     async getUserById(userId) {
          const query = {
               text: "SELECT id, username, email FROM users WHERE id = $1",
               values: [userId],
          };

          const result = await this._pool.query(query);
               if (!result.rows.length) {
                    throw new NotFoundError("Akun tidak ditemukan");
               }
          console.log(result);

          return result.rows[0];
     }

     async verifyUserCredential(email, password) {
          const query = {
               text: "SELECT id, password FROM users WHERE email = $1",
               values: [email],
          };

          const result = await this._pool.query(query);
               if (!result.rows.length) {
                    throw new AuthenticationError("Kredensial yang Anda berikan salah!!");
               }

          const { id, password: hashedPassword } = result.rows[0];
          const match = await bcrypt.compare(password, hashedPassword);
               if (!match) {
                    throw new AuthenticationError("Kredensial password yang Anda berikan salah!!");
               }

          return id;
     }

     async verifyUserExistsById(userId) {
          const query = {
               text: "SELECT id FROM users WHERE id = $1",
               values: [userId],
          };

          const result = await this._pool.query(query);
               if (!result.rows.length) {
                    throw new NotFoundError("Id Akun tidak ditemukan!!");
               }
     }
}

module.exports = UsersService;
