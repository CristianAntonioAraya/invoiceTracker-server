import { Schema, model, connection } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const invoiceModel = new Schema({
    clientName: { type: String, require: true },
    invoiceNumber: { type: String, unique: true, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'user', require: true },
    description: { type: String, require: true },
    date: { type: Date, require: true },
    totalAmount: { type: Number, require: true },
    linkToPay: { type: String, require: true },
});

autoIncrement.initialize(connection);
invoiceModel.plugin(autoIncrement.plugin, {
    model: 'invoice',
    field: 'invoiceNumber',
    startAt: 1,
    incrementBy: 1,
});

export default model('invoice', invoiceModel);
