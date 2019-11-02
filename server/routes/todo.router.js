const express = require('express');
const toDoRouter = express.Router();
const pool = require('../modules/pool')

// -------- GET -------- //

toDoRouter.get('/', (req,res)=>{
    let queryText = `SELECT * FROM "toDoList";`;
    pool.query(queryText)
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('Error in router GET', error);
        res.sendStatus(500);
    });
}); // end GET

// -------- POST -------- //

toDoRouter.post('/', (req, res) => {
    // console.log("POST router", req.body);
    const newToDo = req.body;
    // Sanitize POST //
    const queryText = `INSERT INTO "toDoList" ("task") VALUES ($1);`
    //update VALUES to utilize object in req.body (above)
    pool.query(queryText, [newToDo.task])
    .then((result) => {
        res.send(result);
    }).catch((error) => { 
    console.log(`Error making query.router ${queryText}`, error);
    res.sendStatus(500)
    });
}); // end POST

// -------- PUT -------- //

toDoRouter.put('/:id',  (req, res) => {
    let task = req.body; // Task with updated content
    let id = req.params.id; // id of the book to update
    // console.log(`Updating task ${id} with `, task);
    queryText = `UPDATE "toDoList" SET "completed" = true WHERE "id" = $1;`
    // sanatize 
    pool.query(queryText, [id])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in the PUT.router', error);
        res.sendStatus(500)
    })
}); // end PUT

// -------- DELETE -------- //

toDoRouter.delete('/:id', (req, res) => {
    let id = req.params.id; // id of the thing to delete
    // console.log('Delete route called with id of', id);
    let queryText = `DELETE FROM "toDoList" WHERE "id" = $1;`;
    // sanitize
    pool.query(queryText, [id]).then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in the DELETE.router', error);
        res.sendStatus(500);
    })
}); // end DELETE

module.exports = toDoRouter;