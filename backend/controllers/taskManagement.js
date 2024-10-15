import pool from '../config/db.js';
export async function getTasks(req,res){
    try{
        const result=await pool.query("select * from tasks");
        res.json(result.rows);
    }catch(error){
        console.error("error getting the data",error);
        res.status(500).json({error:"error getting the data"});
    }
}
export async function deleteTask(req,res){
    try{
        const {id}=req.params;
        const result=await pool.query("delete from tasks where id=$1 RETURNING *",[id]);
        if(result.rows.length===0){
            return res.status(500).json({error:'did not found the task'});
        }else{
            res.json({message:'task deleted'});
        }
    }catch(error){
        console.error("error deleting the task",error);
        res.status(500).json({error:'error deleting the task'});
    }
}
export async function addTask(req,res){
    try{
        const {title,description,due_date}=req.body;
        const creationDate=new Date();
        const result=await pool.query("INSERT INTO tasks (title,description,due_date,created_at) values ($1,$2,$3,$4) RETURNING *",[title,description,due_date,creationDate]);
        res.status(201).json(result.rows[0]);
    }catch(error){
        console.error("error adding the data",error);
        res.status(500).json({message:'error adding the task'});
    }
}
export async function updateTask(req,res){
    try{
        const {id}=req.params;
        const {title,description,due_date}=req.body;
        const result=await pool.query("update tasks set title=$1, description=$2, due_date=$3 where id=$4 RETURNING *",[title,description,due_date,id]);
        if(result.rows.length===0){
            res.status(500).json({error:'task not found'});
        }
        res.json(result.rows[0]);
    }catch(error){
        console.error("task not found:",error);
        res.status(500).json({error:'task not found'});
    }
}