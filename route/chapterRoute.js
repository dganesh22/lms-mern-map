const chapterRoute = require('express').Router()
const { addChapter, allChapter, singleChapter, updateChapter, deleteChapter } = require('../controller/chapterController')

const auth = require('../middleware/auth')
const trainerAuth = require('../middleware/trainerAuth')

chapterRoute.post(`/add`, auth, trainerAuth, addChapter)
chapterRoute.get(`/all`, allChapter)
chapterRoute.get(`/single/:id`, singleChapter)
chapterRoute.patch(`/update/:id`, auth, trainerAuth, updateChapter)
chapterRoute.delete(`/delete/:id`, auth, trainerAuth, deleteChapter)

module.exports = chapterRoute