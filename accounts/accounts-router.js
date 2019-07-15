const express = require("express");

const db = require("../data/dbConfig.js");

// const db = knex({
//   client: "sqlite3", // install this npm package as well
//   connection: {
//     filename: "./data/budget.db3"
//   },
//   useNullAsDefault: true
// });

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: "not found" });
      }
    });
});

router.post("/", (req, res) => {
  const account = req.body;

  db("accounts")
    .insert(account, "id")
    .then(accounts => {
      const lastAccount = accounts[0];

      res.status(201).json(lastAccount);
    })
    .catch(error => res.status(500).json(error));
});

router.put("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Account was updated" });
      } else {
        res.status(500).json({ message: "Account not found" });
      }
    })
    .catch(error => res.status(500).json(error));
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The account was deleted" });
      } else {
        res.status(500).json({ message: "The account could not be found" });
      }
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
