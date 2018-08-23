import mongoose, {Schema} from 'mongoose';

// Members model
const MembersSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	}
});
export const Members = mongoose.model('Members', MembersSchema);
