import mongoose from 'mongoose';

const connectToDB = async () => {
	//mongodb+srv://youngdelta:BXKxghraBqoZ3jdc@cluster0.3lchio7.mongodb.net/sample_mflix?retryWrites=true&w=majority
	const connectionUrl = 'mongodb+srv://youngdelta:BXKxghraBqoZ3jdc@cluster0.3lchio7.mongodb.net/test?retryWrites=true&w=majority';
	mongoose
		.connect(connectionUrl)
		.then(() => console.log('blog connection si successfulll'))
		.catch(console.log);
};

export default connectToDB;
