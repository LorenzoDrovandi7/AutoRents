const db = require("../database/db");

function hasDateOverlap(start1, end1, start2, end2) {
  return !(end1 < start2 || start1 > end2);
}

function validateRentAvailability(car_id, start_date, end_date, callback) {
  const query = `
    SELECT * FROM rents 
    WHERE car_id = ? 
      AND (
        (start_date <= ? AND end_date >= ?) OR 
        (start_date <= ? AND end_date >= ?) OR
        (start_date >= ? AND end_date <= ?)
      )
  `;

  db.all(query, [car_id, end_date, end_date, start_date, start_date, start_date, end_date], (err, rows) => {
    if (err) return callback(err);
    if (rows.length > 0) return callback(null, false);
    callback(null, true);
  });
}

module.exports = { validateRentAvailability };
