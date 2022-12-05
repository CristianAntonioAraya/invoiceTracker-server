import 'dotenv/config';
import app from './src/app';
import './src/database';
import 'colors';

const port = app.get('port');
app.listen(port, () => {
    console.log('============================================'.cyan);
    console.log('Server on port'.bgMagenta.black, `${port}`.magenta);
});
