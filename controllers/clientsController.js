const db = require("../database/db");

exports.getAllClients = (req, res) => {
  db.all("SELECT * FROM clients", [], (err, rows) => {
    if (err) return res.status(500).send("Error retrieving clients from database");
    res.render("clients.njk", { clients: rows });
  });
};

exports.getAddClient = (req, res) => {
  res.render("addClient.njk");
};

exports.getClientById = (req, res) => {
  const clientId = req.params.id;
  db.get("SELECT * FROM clients WHERE id = ?", [clientId], (err, client) => {
    if (err) return res.status(500).send("Error al buscar el cliente.");
    if (!client) return res.status(404).send("Cliente no encontrado.");
    res.render("client.njk", { client });
  });
};

exports.deleteClient = (req, res) => {
  const clientId = req.params.id;
  db.run("DELETE FROM clients WHERE id = ?", [clientId], (err) => {
    if (err) return res.status(500).json({ error: "Error deleting client" });
    res.status(200).json({ message: "Client deleted successfully" });
  });
};

exports.postAddClient = (req, res) => {
  const { name, surname, type_of_document, document, nationality, address, phone, email, birthday } = req.body;

  db.run(
    `INSERT INTO clients (name, surname, type_of_document, document, nationality, address, phone, email, birthday)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, surname, type_of_document, document, nationality, address, phone, email, birthday],
    function (err) {
      if (err) return res.status(500).send("Error adding client to database");
      res.redirect(`/clients/${this.lastID}`);
    }
  );
};
