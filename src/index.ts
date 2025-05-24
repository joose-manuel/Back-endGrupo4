import express from 'express';
import rutas from './routes/user';
import { AppDataSource } from './Db-conection';
import dotenv from 'dotenv';
import mainRouter from './routes/user';
import { User } from './Entity/Usuario/Usuario/EntidadUser';
dotenv.config();
const app = express();
app.use(express.json());

const PORT = 3000;

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
    



app.get('/', (_req, res) => {
    console.log("Sone pinged here!!nn!")
    res.send("ponbbg")
});

app.use('/api', mainRouter); 

app.use('/api/user', rutas);