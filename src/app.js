import express from 'express';
import path from 'path';
// const PORT = 3000
const __dirname = path.resolve();
import { getTitlesAnunciosAI } from './aiLogicModel/AIResponseAnuncios.js'

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.get('/ads', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/anuncios.html'));
});

app.get('/description', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/description.html'));
});

app.get('/ads/posts/:titles/:content', async (req, res) => {
    try {
        const content = req.params.content
        const numberTitles = req.params.titles
        const TitlePostsAI = await getTitlesAnunciosAI(content, numberTitles)
        res.json(TitlePostsAI)
      } catch (error) {
        res.status(500).send('Erro de processamento da api')
      }
});

// app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
// });

export default app;