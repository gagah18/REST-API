const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query("SELECT * FROM joueurs", [], (erreur, resultat) => {
        if (erreur) {
          console.log(erreur);
          res.status(500).render("erreur", { erreur });
        } else {
          res.status(200).render("index", { resultat });
        }
      });
    }
  });
});

router.post("/joueurs", (req, res) => {
  let id = req.body.id === "" ? null : req.body.id;
  let nom = req.body.nom;
  let wins = req.body.wins;
  let losses = req.body.losses;
  let scores = req.body.scores;


  let reqSql =
    id === null
      ? "INSERT INTO joueurs(id, Nom, wins ,losses ,scores) VALUES(?, ?,?,?,?)"
      : "UPDATE joueurs SET nom = ?, wins = ?, losses = ?, scores = ? WHERE id = ?";

  let donnees =
    id === null ? [null, nom, wins,losses,scores] : [nom, wins,losses,scores, id];

  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query(reqSql, donnees, (erreur, resultat) => {
        if (erreur) {
          console.log(erreur);
          res.status(500).render("erreur", { erreur });
        } else {
          res.status(300).redirect("/");
        }
      });
    }
  });
});

router.delete("/joueurs/:id", (req, res) => {
  let id = req.params.id;
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query(
        "DELETE FROM joueurs WHERE id = ?",
        [id],
        (erreur, resultat) => {
          if (erreur) {
            console.log(erreur);
            res.status(500).render("erreur", { erreur });
          } else {
            res.status(200).json({ routeRacine: "/" });
            
          }
        }
      );
    }
  });
});

module.exports = router;
