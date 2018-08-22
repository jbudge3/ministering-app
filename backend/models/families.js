import mongoose, {Schema} from 'mongoose';

// Families model
const FamiliesSchema = new Schema({
	name: String,
	head: String
});
export const Families = mongoose.model('Families', FamiliesSchema);
