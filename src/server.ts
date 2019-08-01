import app from './app';
const PORT = 3003;

app.listen(PORT, '0.0.0.0', () => {
    console.log('Server listening on port ' + PORT);
})