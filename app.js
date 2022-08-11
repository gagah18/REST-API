const express = require("express");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const joueursRoutes = require("./routes/joueursRoutes");


const optionBd = {
  host: "mysql-gaga.alwaysdata.net",
  user: "gaga",
  password: "Lovelinam18",
  port: 3306,
  database: "gaga_ftf",
};

const app = express();
const PORT = process.env.PORT || 3000;
//Extration des données du formulaire
app.use(express.urlencoded({ extended: false }));

//Définition du middleware pur connexion avec la bd
app.use(myConnection(mysql, optionBd, "pool"));

//Définition du moteur d'affichage
app.set("view engine", "ejs");
app.set("views", "IHM");

//Définition des routes pour joueurs
app.use(joueursRoutes);



app.use((req, res) => {
  res.status(404).render("erreur");
});

app.listen(PORT);
