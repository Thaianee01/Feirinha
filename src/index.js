import express from "express";
import { json } from "express";
import cors from "cors";

const app = express(); // criando o servidor
app.use(cors()); // servidor permite requisições vindas de outros domínios
app.use(json()); // body parser

// Dados simulados em memória
let lista = [
  { id: 1, name: "Maçã", quantity: 4, type: "fruta" },
  { id: 2, name: "Laranja", quantity: 2, type: "fruta" },
  { id: 3, name: "Abacaxi", quantity: 1, type: "fruta" },
];

// Rota para listar todas as frutas através do filtro type
app.get("/items", (req, res) => {
  const { type } = req.query;

  if (type) {
    // filtro (case sensitive)
    const filtrados = lista.filter(item => item.type === type);
    return res.send(filtrados);
  }
  res.send(lista);
});

// Rota para buscar uma fruta pelo ID
app.get("/items/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res
      .status(400)
      .send({ error: "ID inválido. Deve ser um número inteiro positivo." });
  }

  const item = lista.find(i => i.id === id);

  if (!item) {
    return res
      .status(404)
      .send({ error: "Item não encontrado." });
  }

  res.send(item);
});

// POST /items - adicionar nova fruta
app.post("/items", (req, res) => {
  const { name, quantity, type } = req.body;

  // validação obrigatória
  if (!name || !quantity || !type) {
    return res
      .status(422)
      .send({ error: "Todos os campos são obrigatórios." });
  }

  // verificar item duplicado (case insensitive)
  const duplicado = lista.find(
    item => item.name.toLowerCase() === name.toLowerCase()
  );

  if (duplicado) {
    return res
      .status(409)
      .send({ error: "Já existe um item com esse nome." });
  }

  // criar novo item
  const novoItem = {
    id: lista.length + 1,
    ...req.body
  };

  lista.push(novoItem);

  res.status(201).send(novoItem);
});

// -------------------------Listen
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
