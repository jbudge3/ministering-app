import mongoose, {Schema} from 'mongoose';

// Members model
const MembersSchema = new Schema({
	name: String
});
export const Members = mongoose.model('Members', MembersSchema);
