import express from 'express';

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    res.send('home page');
});

export default homeRouter;