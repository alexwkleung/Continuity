import express from 'express'

//create express router
const router = express.Router();

//serve styles directory
router.use('/styles/', express.static(process.cwd() + '/src/client/styles/'));

//serve fonts directory
router.use('/fonts/', express.static(process.cwd() + '/src/client/fonts/'));

//send resume.html to front-end via GET
router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/src/client/output-html/resume.html');
});

export default router;

