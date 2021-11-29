const express = require("express");
const router = express()
const Jogos = require('../model/jogo');
const port = process.env.PORT || 3000;

let mensagem = ""

router.get("/",  async (req, res) => {
  const jogos = await Jogos.findAll();
    setTimeout(() => { mensagem = "";}, 5000);
  res.render("index", {mensagem,jogos});
});

// Cadastro Novo jogo

router.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

// Cadastro - Render

router.post("/cadastro", async (req, res) => {

  const {nome,genero,imagem,descritivo} = req.body
  await Jogos.create({
    nome,
    genero,
    imagem,
    descritivo,
    })
  mensagem = `O Jogo ${nome} foi adicionado`
res.redirect("/")})
 
// Render - Detalhe

router.get("/detalhes/:id", async(req, res) =>{
  const jogo = await Jogos.findByPk(req.params.id);
  res.render("detalhes",{jogo})

});

// Deletar Jogo do Render

router.get("/deletar/:id", async (req, res) => {
  const jogo = await Jogos.findByPk(req.params.id);

  if (!jogo) {
    res.render("deletar", {
      mensagem: "Jogo não encontrado!",
    });
  }

  res.render("deletar", {
    jogo,
  });
});

// render Deletar

router.post('/deletar/deletar/:id', async (req,res) => {
  const jogo = await Jogos.findByPk(req.params.id);

  if (!jogo) {    
    res.render("deletar",  {mensagem: "Jogo não encontrado!",});};

  await jogo.destroy();
  const jogosList = await Jogos.findAll();
  res.render("index", {mensagem: `Jogo deletado com sucesso!`,  jogos:jogosList});
});

// Editar Jogo do Render

router.get('/editar/:id', async (req,res) => {
  const jogo = await Jogos.findByPk(req.params.id);

  var options = [ 
    "Ação", "FPS", "Card Game", "RPG", "MOBA","Simulador", "Corrida"];
  for ( var i = 0; i < options.length; i++ )
  {
      var selected = (jogo.genero == i ) ? "selected" : "";
  }

  res.render("editar", {jogo:jogo});
});


router.post("/editar/:id", async function (req,res){
    const jogo = await Jogos.findByPk(req.params.id);
    const { nome, genero, imagem, descritivo} = req.body;
    
    jogo.id = req.params.id;
    jogo.nome = nome;
    jogo.genero = genero;
    jogo.imagem = imagem;
    jogo.descritivo = descritivo;
    
      if (!jogo) {
    res.render("deletar", {
      mensagem: "Jogo não encontrado!",
    });
  }
    if (!nome){
res.redirect("/editar" ,{mensagem: "tabela nome esta vazia"})
  }else if  (!genero)
  {
res.redirect("/editar" ,{mensagem: "tabela genero esta vazia"})
  }else if  (!imagem) 
  {
res.redirect("/editar" ,{mensagem: "tabela de imagem esta vazia"})
  }else if  (!descritivo) 
  {
res.redirect("/editar" ,{mensagem: "tabela de descritivo esta vazia"})
  };

    mensagem = `O Jogo ${nome} foi alterado com sucesso!`
  
    await jogo.save();
    res.render("editar",{jogo,mensagem});
});


module.exports = router