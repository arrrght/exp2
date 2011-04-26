var Schema = Mongoose.Schema,
		ObjectId = Schema.ObjectId;

var Tyres = new Schema({
	brand: String, // Bridgestone
	name: String,  // VKT
	posD: Number,  // 25
	hS: String,    // 25/65, 26.5
	tType: String, // Tubeless
	lay: String,   // 1*, 2*
	tra: String,   // E2/L2
	d: Number,     // 1486
	s: Number,     // 635
});

Mongoose.model('Tyres', Tyres);
