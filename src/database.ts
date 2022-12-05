import mongoose from 'mongoose';
import 'colors';

const { NODE_ENV, DEV_URI, PROD_URI } = process.env;

const URI = NODE_ENV === 'development' ? DEV_URI : PROD_URI;

mongoose.connect(URI || '');

mongoose.connection.once('open', () => {
    console.log(
        'Data Base online in'.magenta,
        `${NODE_ENV}`.yellow,
        'mode'.magenta
    );
    console.log('============================================'.cyan);
});

export default mongoose;
