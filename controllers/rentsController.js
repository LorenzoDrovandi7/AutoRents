const db = require("../database/db");

exports.getAllRents = (req, res) => {
  db.all("SELECT * FROM rents", [], (err, rows) => {
    if (err) return res.status(500).send("Error retrieving rents from database");
    res.render("rents.njk", { rents: rows });
  });
};

exports.getAddRent = (req, res) => {
  db.all("SELECT * FROM cars", [], (err, cars) => {
    if (err) return res.status(500).send("Error fetching cars.");

    db.all("SELECT * FROM clients", [], (err, clients) => {
      if (err) return res.status(500).send("Error fetching clients.");

      res.render("addRent.njk", { cars, clients });
    });
  });
};

exports.getRentById = (req, res) => {
  const rentId = req.params.id;
  db.get("SELECT * FROM rents WHERE id = ?", [rentId], (err, rent) => {
    if (err) return res.status(500).send("Error searching the rent.");
    if (!rent) return res.status(404).send("Rent not found.");
    res.render("rent.njk", { rent });
  });
};

exports.getEditRent = (req, res) => {
  const rentId = req.params.id;
  db.get("SELECT * FROM rents WHERE id = ?", [rentId], (err, rent) => {
    if (err) return res.status(500).send("Error searching the rent.");
    if (!rent) return res.status(404).send("Rent not found.");
    res.render("editRent.njk", { rent });
  });
};

exports.postEditRent = (req, res) => {
  const rentId = req.params.id;
  const { car_id, client_id, price_per_day, start_date, end_date, total_price, payment_method, was_paid } = req.body;

  db.run(
    `UPDATE rents SET car_id = ?, client_id = ?, price_per_day = ?, start_date = ?, end_date = ?, total_price = ?, payment_method = ?, was_paid = ? WHERE id = ?`,
    [car_id, client_id, price_per_day, start_date, end_date, total_price, payment_method, was_paid, rentId],
    (err) => {
      if (err) return res.status(500).send("Error updating the rent.");
      res.redirect(`/rents/${rentId}`);
    }
  );
};

exports.deleteRent = (req, res) => {
  const rentId = req.params.id;
  db.run("DELETE FROM rents WHERE id = ?", [rentId], (err) => {
    if (err) return res.status(500).json({ error: "Error deleting rent" });
    res.status(200).json({ message: "Rent deleted successfully" });
  });
};

exports.postAddRent = (req, res) => {
  const { car_id, client_id, price_per_day, start_date, end_date, total_price, payment_method, was_paid } = req.body;

  db.run(
    `INSERT INTO rents (car_id, client_id, price_per_day, start_date, end_date, total_price, payment_method, was_paid)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [car_id, client_id, price_per_day, start_date, end_date, total_price, payment_method, was_paid],
    function (err) {
      if (err) return res.status(500).send("Error adding rent.");
      res.redirect(`/rents/${this.lastID}`);
    }
  );
};
