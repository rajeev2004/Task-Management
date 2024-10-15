
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js'; 
import {
    getTasks,deleteTask,addTask,updateTask
} from './controllers/taskManagement.js'; 
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 


connectDB();


app.get('/api/tasks', getTasks); 
app.post('/api/tasks', addTask); 
app.put('/api/tasks/:id', updateTask); 
app.delete('/api/tasks/:id', deleteTask);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
