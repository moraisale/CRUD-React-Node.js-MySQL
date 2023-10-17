import { db } from "../db.js";

export const getUsers = (_, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const query =
    "INSERT INTO users(`name`, `email`, `phone`, `birthday`) VALUES(?)";

  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.birthday,
  ];

  db.query(query, [values], (error) => {
    if (error) return res.json(error);
    return res.status(200).json("User created with success");
  });
};

export const updateUser = (req, res) => {
  const query =
    "UPDATE users SET `name` = ?, `email` = ?, `phone` = ?, `birthday` = ? WHERE `id` = ?";

  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.birthday,
  ];

  db.query(query, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("User updated with success");
  });
};

export const deleteUser = (req, res) => {
  const query = "DELETE FROM users WHERE `id` = ?";

  db.query(query, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("User deleted with success");
  });
};

export default { getUsers, addUser, updateUser, deleteUser };
