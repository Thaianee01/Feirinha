// navegador => servidor
// biblioteca express node

import express from "express";
import cors from "cors";

const app = express(); // criando o servidor
app.use(cors());

//receber informações
app.get("/frutas", (req, res) => {
  const receitas = [
  {
	id: 1, 
	name: "Maçã",
	quantity: 1,
	type: "Fruta",
  },
 
  {
    id: 1,
    name: "Laranja",
    quantity: 2,
    type: "Fruta",
  }
];
  res.send(frutas);
});

app.get("/receitas/:id", (req, res) => {
  const id = req.params.id;
  console.log(`recebi o id ${id}`);
  res.send("Você pediu pelas receitas de id..." + id);
});


app.listen(5000, () => {
  console.log("Servidor tá rodando na porta 5000");
});
