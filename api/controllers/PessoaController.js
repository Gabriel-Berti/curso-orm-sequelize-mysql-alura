const database = require("../models");

class PessoaController {
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
  static async pegaUmaPessoa(req, res) {
    try {
      const { id } = req.params;
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      if (pessoa === null) {
        return res.status(404).send("Pessoa não encontrada no banco de dados.");
      } else {
        return res.status(200).json(pessoa);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
  static async criaPessoa(req, res) {
    try {
      const dadosNovaPessoa = req.body;
      const novaPessoa = await database.Pessoas.create(dadosNovaPessoa);
      return res.status(201).json(novaPessoa);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
  static async atualizaPessoa(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
      await database.Pessoas.update(dadosAtualizados, {
        where: { id: Number(id) },
      });
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(201).json(pessoaAtualizada);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
  static async deletaPessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.destroy({
        where: { id: Number(id) },
      });
      return res.status(201).send({
        mensagem: `A pessoa com o id ${id} foi deletada.`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
