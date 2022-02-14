const mongoose = require("mongoose");



class MongooseService {

    static connectToDatabase() {
        mongoose.connect(process.env.DATABASE_ACCESS,
            { useNewUrlParser: true,
            useUnifiedTopology: true })
            .then(() => console.log('Connexion à MongoDB réussie !'))
            .catch(() => console.log('Connexion à MongoDB échouée !'));
    };
}

module.exports={
    MongooseService
}