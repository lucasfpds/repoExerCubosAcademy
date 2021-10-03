
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const segredo = require('../segredo');
const functions = require('./usuarios');



const userLogin = async (req, res) => {
    const {executionResponse,showError,findUser} = functions
    const { email, senha } = req.body;


    try {        
        if(!email || !senha){
            return executionResponse(400, "Todos os campos devem estar preenchidos", res)
        }

        const userFound = await findUser(email);

        if(userFound.rowCount === 0){
            return executionResponse(404, "Nenhum Usuario foi encontrado", res)
        }
        
        const verifiedPassword = await bcrypt.compare(senha, userFound.rows[0].senha);
        
        
        if (
            userFound.rows[0].email !== email ||
            !verifiedPassword
            ) {
                return executionResponse(404,'Email ou senha incorretos',res);
            }
            
        
        const token = jwt.sign({id: userFound.rows[0].id}, segredo, {expiresIn: '59m'});

        const { senha: senhaUsuario, ...dadosUsuarios } = userFound.rows[0];
        return res.status(200).json({
            "token ": token
        });

    } catch (error) {
       showError(error, res);        
    }
}

module.exports = {userLogin}