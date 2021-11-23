const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password
    let roomId
    let isRoom = true

    while (isRoom) {
      //gerar codigo

      for (var i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString())
      }

      //verificar id
      //se usa db.all no lugar de run pq vai retornar informação, não somente rodar
      const roomExistIds = await db.all(`SELECT id FROM rooms`)

      isRoom = roomExistIds.some(roomExistIds => roomExistIds === roomId)

      if (!isRoom) {
        //inserir informações
        await db.run(`INSERT INTO rooms(
      id,pass
    ) VALUES (
      ${parseInt(roomId)}, ${pass}
    )`)
      }
    }

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const db = await Database()
    const roomId = req.params.room

    const questions = await db.all(
      ` SELECT * FROM questions WHERE room = ${roomId} AND read = 0`
    )

    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} AND read = 1`
    )

    let isNoQuestions

    if (questions.length == 0) {
      if (questionsRead.length == 0) {
        isNoQuestions = true
      }
    }

    res.render('room', {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNoQuestions: isNoQuestions
    })
  },

  enter(req, res) {
    const roomId = req.body.roomId

    res.redirect(`room/${roomId}`)
  }
}
