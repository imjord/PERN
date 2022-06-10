const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const { reset } = require('nodemon');

// middelware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes 

// create a todo

app.post('/todos', async (req,res) => {
    try {
        
        const {description} = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', 
        [description]);
        res.json(newTodo.rows[0]);


    } catch (error) {
        console.log(error);
    }
})

// get all tood 
app.get('/todos', async (req,res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error);
    }
})
// get a todo 
app.get('/todos/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query(`SELECT description FROM todo WHERE todo_id = $1`, 
        [id]);
        res.json(todo.rows[0]);
        console.log(req.params)
    } catch (error) {
        console.log(error);
    }
})

// update a todo 

app.put('/todos/:id', async (req,res) => {
    try {
    const {id} = req.params;
    const {description} = req.body;
    const updateTodo = await pool.query(`UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *`, 
    [description, id]);
      res.json('todo was updated! ' + updateTodo.rows[0]);  
    } catch (error) {
        console.log(error);
    }
});
// delete a todo 
app.delete('/todos/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(`DELETE FROM todo WHERE todo_id = $1`, [id]);
        res.json('todo was deleted! ');
        
    } catch (error) {
        console.log(error);
    }
})

app.get('/', (req,res) => {
    res.send('hello world');
})

app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
})