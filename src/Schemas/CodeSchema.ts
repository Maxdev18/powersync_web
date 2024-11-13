import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CodeSchema = new Schema({
  code: String
})

const Code = model('VerificationCode', CodeSchema)

export default Code