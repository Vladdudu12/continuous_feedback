const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {handleErrorResponse} = require("../utils/utils");
const StudentDB = require('../models').Student
const ProfesorDB = require('../models').Profesor

const saltRounds = 12;

const controller = {
    login: async (req, res) => {
        try {
            const isProfessor = req.params.isProfessor;

            const {email, parola} = req.body.authPerson;
            if(isProfessor == 'true') {
                const profesor = await ProfesorDB.findOne({
                    where: 
                    {
                        email: email 
                    }
                })

                if (!profesor) {
                    return res.status(404).json({success: false, message: "Profesor not found", data: {}})
                }
        
                const validPassword = bcrypt.compareSync(parola, profesor.dataValues.parola);
        
                if (!validPassword) {
                    return res.status(401).json({success: false, message: "Invalid password", data: {}})
                }
        
                const token = jwt.sign({id: profesor.dataValues.id}, process.env.SECRET_TOKEN, {
                    expiresIn: '1h'
                })
        
                res.status(200).json({success: true, message: "Profesor found", data: {token, isProfessor: true, userId: profesor.id}})
            } 
            else if(isProfessor == 'false'){
                const student = await StudentDB.findOne({
                    where: 
                    {
                        email: email 
                    }
                })

                if (!student) {
                    return res.status(404).json({success: false, message: "Student not found", data: {}})
                }
        
                const validPassword = bcrypt.compareSync(parola, student.dataValues.parola);
        
                if (!validPassword) {
                    return res.status(401).json({success: false, message: "Invalid password", data: {}})
                }
        
                const token = jwt.sign({id: student.dataValues.id}, process.env.SECRET_TOKEN, {
                    expiresIn: '1h'
                })
        
                res.status(200).json({success: true, message: "Student found", data: {token, isProfessor: false, userId: student.id}})
            }
        }
        catch (error) {
            handleErrorResponse(res, error, 'Error login user');
        }
    },

    register: async (req, res) => {
        try {
            const isProfessor = req.params.isProfessor;
            if(isProfessor == 'true') {
                const profesor = req.body.persoana;
        
                await ProfesorDB.create(
                    {
                        nume: profesor.nume,
                        email: profesor.email,
                        parola: await bcrypt.hash(profesor.parola, saltRounds),
                        materie: profesor.materie,
                    }
                );
        
                res.status(200).send({message: "Profesor adaugat cu succes!"});
            } 
            else if (isProfessor == 'false') {
                const student = req.body.persoana;      
               
                await StudentDB.create(
                    {
                        nume: student.nume,
                        email: student.email,
                        parola: await bcrypt.hash(student.parola, saltRounds),
                        legitimatie: student.legitimatie
                    }
                );
                
                res.status(200).send({message: "Student adaugat cu succes!"});
            }
        } 
        catch (error) {
            handleErrorResponse(res, error, 'Error register user');
        }
    },
}

module.exports = controller;