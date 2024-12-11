
exports.up = (pgm) => {
     pgm.createTable("users", {
		id: {
			type: "VARCHAR(50)",
			primaryKey: true,
		},
		username: {
			type: "VARCHAR(50)",
			unique: true,
			notNull: true,
		},
		email: {
			type: "VARCHAR(255)",
               unique: true,
               notNull: true,
		},
          password: {
			type: "TEXT",
			notNull: true,
		},
	});

     pgm.addConstraint("users", "email_format", {
          check: "email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'",
     });
};


exports.down = (pgm) => {
     pgm.dropTable("users");
};
