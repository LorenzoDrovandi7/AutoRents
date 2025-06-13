const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/autorents.db");

db.run(
  `
  CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    km INTEGER NOT NULL,
    color TEXT NOT NULL,
    air_conditioning BOOLEAN NOT NULL DEFAULT 0,
    transmission TEXT NOT NULL CHECK(transmission IN ('manual', 'automatic')),
    passengers INTEGER NOT NULL CHECK(passengers > 0),
    image TEXT NOT NULL
  )
`,
  (err) => {
    if (err) {
      return console.error(err.message);
    }

    db.get("SELECT COUNT(*) AS count FROM cars", (err, row) => {
      if (err) {
        return console.error(err.message);
      }

      if (row.count === 0) {
        const seedCars = [
          {
            brand: "Toyota",
            model: "Corolla",
            year: 2020,
            km: 15000,
            color: "Blue",
            air_conditioning: true,
            transmission: "automatic",
            passengers: 5,
            image: "toyota_corolla.jpg",
          },
          {
            brand: "Honda",
            model: "Civic",
            year: 2019,
            km: 20000,
            color: "Blue",
            air_conditioning: true,
            transmission: "manual",
            passengers: 5,
            image: "honda_civic.jpg",
          },
          {
            brand: "Ford",
            model: "Focus",
            year: 2021,
            km: 5000,
            color: "Blue",
            air_conditioning: true,
            transmission: "automatic",
            passengers: 5,
            image: "ford_focus.jpg",
          },
          {
            brand: "Chevrolet",
            model: "Cruze",
            year: 2018,
            km: 30000,
            color: "Black",
            air_conditioning: true,
            transmission: "manual",
            passengers: 5,
            image: "chevrolet_cruze.jpg",
          },
          {
            brand: "Nissan",
            model: "Sentra",
            year: 2022,
            km: 1000,
            color: "Red",
            air_conditioning: true,
            transmission: "automatic",
            passengers: 5,
            image: "nissan_sentra.jpeg",
          },
        ];

        const insertQuery = `
          INSERT INTO cars (brand, model, year, km, color, air_conditioning, transmission, passengers, image)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        seedCars.forEach((car) => {
          db.run(
            insertQuery,
            [
              car.brand,
              car.model,
              car.year,
              car.km,
              car.color,
              car.air_conditioning ? 1 : 0,
              car.transmission,
              car.passengers,
              car.image,
            ],
            (err) => {
              if (err) {
                console.error("Error inserting seed car:", err.message);
              }
            }
          );
        });

        console.log("Datos semilla insertados en la tabla cars.");
      }
    });
  }
);

db.run(
  `
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    type_of_document TEXT NOT NULL,
    document TEXT NOT NULL,
    nationality TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    birthday TEXT NOT NULL
  )
`,
  (err) => {
    if (err) {
      return console.error(err.message);
    }

    db.get("SELECT COUNT(*) AS count FROM clients", (err, row) => {
      if (err) {
        return console.error(err.message);
      }

      if (row.count === 0) {
        const seedClients = [
          {
            name: "Lorenzo",
            surname: "Drovandi",
            type_of_document: "DNI",
            document: "12345678",
            nationality: "Argentinian",
            address: "Calle Falsa 123",
            phone: "1122334455",
            email: "lorenzodrovandi17@gmail.com",
            birthday: "2003-07-17",
          },
        ];

        const insertQuery = `
          INSERT INTO clients (name, surname, type_of_document, document, nationality, address, phone, email, birthday)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        seedClients.forEach((client) => {
          db.run(
            insertQuery,
            [
              client.name,
              client.surname,
              client.type_of_document,
              client.document,
              client.nationality,
              client.address,
              client.phone,
              client.email,
              client.birthday,
            ],
            (err) => {
              if (err) {
                console.error("Error inserting seed client:", err.message);
              }
            }
          );
        });

        console.log("Datos semilla insertados en la tabla clients.");
      }
    });
  }
);

module.exports = db;
