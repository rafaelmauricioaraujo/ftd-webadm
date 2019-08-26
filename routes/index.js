var express = require('express');
require('dotenv').config();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  global.db.findAll(function(err, docs) {

    if(err) { 
      return console.log(err) 
    }
    res.render('index', { title: 'Lista de serviços ', docs: docs });
  });
});

router.get('/new', function(req, res, next){
  res.render('new', { title: 'Novo serviço' , action: '/new' });
});

router.post('/new', function(req, res){
  
  /** Para collection no banco de dados: */
  let secretaria = req.body.secretaria || null;
  let servico = req.body.servico || null;
  let descricao = req.body.descricao || null;
  let etapas = req.body.etapas || null;
  let palavras_chave = req.body.palavras_chave || null;
  let requisitos = req.body.requisitos || null;
  let link = req.body.link || null;
  let horario = req.body.horario || null;
  let area_responsavel = req.body.area_responsavel || null;
  let enderecos = req.body.enderecos || null;
  
  /** Para entidades no Watson: */
  let sinonimos = req.body.sinonimos || null;
  if(sinonimos !== null){
    listaEntidades = sinonimos.split(',');
  }
  // for (i=0; i<listaEntidades.length; i++){
  //   let entidade = listaEntidades[i];

  //   global.wdb.insertOne({entidade:entidade}, function(err, result, next) {
  //     if(err) {
  //       throw new Error('Erro ao inserir entidade');
  //     }
  //     console.log('Entidade inserida');
  //     //next()
  //   })
  // }

  global.db.insert({
    secretaria:secretaria, 
    servico:servico, 
    descricao:descricao, 
    etapas:etapas, 
    palavras_chave:palavras_chave, 
    requisitos:requisitos, 
    link:link, 
    horario:horario,
    area_responsavel:area_responsavel,
    enderecos:enderecos}), function(err, result){
      if(err) {
        throw new Error('Erro ao inserir serviço');
      }else{
        console.log('servico inserido');
        res.redirect('/');
      }
    }
})

router.get('/edit/:id', function(req, res, next){
  let id = req.params.id;

  global.db.findOne(id, function(err, docs) {
    if (err) {
      throw new Error('Erro ao buscar servico');
    }else {
      res.render('new', { title: 'Edição de serviço', doc: docs[0], action: '/edit/' + docs[0]._id });
    }
  });
});

router.post('/edit/:id', function(req, res, next){
  let id = req.params.id;
  
  let secretaria = req.body.secretaria || null;
  let servico = req.body.servico || null;
  let descricao = req.body.descricao || null;
  let etapas = req.body.etapas || null;
  let palavras_chave = req.body.palavras_chave || null;
  let requisitos = req.body.requisitos || null;
  let link = req.body.link || null;
  let horario = req.body.horario || null;
  let area_responsavel = req.body.area_responsavel || null;
  let enderecos = req.body.enderecos || null;

  global.db.update(id, {
    secretaria: secretaria,
    servico: servico,
    descricao: descricao,
    etapas: etapas,
    palavras_chave: palavras_chave,
    requisitos: requisitos,
    link: link,
    horario: horario,
    area_responsavel: area_responsavel,
    enderecos: enderecos
  }, function(err, result){
    if(err) {
      console.log(err);
      throw new Error('Erro ao executar o update');
    }else{
      res.redirect('/');
    }
  });
});

router.get('/delete/:id', function(req, res){
  let id = req.params.id;
  global.db.deleteOne(id, function(err, result) {
    if(err) {
      console.log(err);
      throw new Error('Erro ao executar o deleteOne');
    }else{
      res.redirect('/');
    }
  });
});

module.exports = router;
