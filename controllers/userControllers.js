const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const handleError = (res,err) =>{
    console.log(err.message)
    res.json({success: false, response: err.message})
}
const userControllers = {
    registerUser: (req, res) => {
        console.log("Received REGISTER USER Petition:" + Date())
        const {lastName, firstName, password, eMail, photo, google, admin, secretWord} = req.body
        let owner = false
        try{
            if(admin){
                if(secretWord === process.env.SECRETWORDSTAFF || secretWord === process.env.SECRETWORDOWNER){
                    owner = secretWord === process.env.SECRETWORDOWNER
                }else{
                    throw new Error("Can't be admin")
                }
            }
            let hashedPass = bcryptjs.hashSync(password)
            const newUser = new User({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                password : hashedPass,
                eMail,
                photo, // HAY Q REVISAR ESTO Q VA
                google,
                admin,
                owner
            })
            newUser.save()
            .then(user => {
                const token = jwt.sign({...newUser}, process.env.SECRETORKEY)
                req.session.loggedUser = newUser
                res.json({success: true, response: {photo: user.photo, token, firstName: user.firstName}})
            })
            .catch(err => res.json({success: false, response: err.message.includes('duplicate key') ? 'eMail already in use' : err.message}))
        }catch(err){
            res.json({success: false, response: err.message})
        }
    },
    logUser: (req, res) => {
        console.log("Received LOG IN USER Petition:" + Date())
        const errMessage = "Invalid username or pass"
        const {eMail, password, google} = req.body
        User.exists({eMail: eMail}).then(exists => {
            if(exists){
                User.findOne({eMail: eMail})
                .then(userFound => {
                    if(userFound.google === true && google === false){
                        throw new Error('Log in with Google!')
                    }
                    if(!bcryptjs.compareSync(password, userFound.password))throw new Error(errMessage)
                    const token = jwt.sign({...userFound}, process.env.SECRETORKEY)
                    req.session.loggedUser = userFound 
                    res.json({success: true, response: {photoURL: userFound.photoURL, token, firstName: userFound.firstName}})
                })
                .catch(err => handleError(res, err))
            }else{
                throw new Error(errMessage)
            } 
        })
        .catch(err => handleError(res, err))   
    },
    logFromSession: async (req, res) => {
        console.log("Received LOG IN FROM SESSION USER Petition:" + Date())
        try{
            if(!req.session.loggedUser)throw new Error('Bad Session, Log In First')
            const user = req.session.loggedUser
            let userFound = await User.findOne({_id: user._id})
            if(userFound){
                const token = jwt.sign({...userFound}, process.env.SECRETORKEY)
                req.session.loggedUser = userFound
                res.json({success: true, response: {photoURL: userFound.photoURL, token, firstName: userFound.firstName}})
            }else{
                throw new Error('User not found')
            }
        }catch(err){
            req.session.destroy( () =>{
                res.json({success: false, response: err.message}) // hacerlo deslogear en redux
            })
        }
    },
    logOut: async (req, res) => {
        console.log("Received LOG OUT USER Petition:" + Date())
        try{
            req.session.destroy( () =>{
                res.json({success: true})
            })
        }catch(err){
            res.json({success: false, response: err.message})
        }
    },
    manageAdmin: async (req, res) => {
        console.log("Received MANAGE ADMIN Petition:" + Date())
        try{
            if(!req.session.loggedUser)throw new Error('Log In First')
            const user = req.session.loggedUser
            if(!user.owner)throw new Error("You don't have permission to do that")
            const {userToChange, actionToDo} = req.body
            let userFound = await User.findOneAndUpdate({_id: userToChange}, {admin: actionToDo})
            if(!userFound)throw new Error("User not found")
            res.json({success: true})
        }catch(err){
            res.json({success: false, response: err.message})
        }
    },
    manageUser: async (req, res) => {
        console.log("Received MANAGE USER Petition:" + Date())
        try{
            if(!req.session.loggedUser)throw new Error('Log In First')
            const user = req.session.loggedUser
            const {password, zipcode, number, city, street, phone, dni} = req.body
            let info = {
                zipcode,
                address:{
                    number,
                    city,
                    street
                },
                phone,
                dni
            }
            let hashedPass = user.password
            if(password){hashedPass = bcryptjs.hashSync(password)}
            let userFound = await User.findOneAndUpdate({_id: user._id}, {info, password: hashedPass}, {new: true})
            if(!userFound)throw new Error('User not found')
            req.session.loggedUser = userFound
            res.json({success: true, response: userFound})
        }catch(err){
            res.json({success: false, response: err.message})
        }
    },
    getUsers: async (req, res) => {
        console.log("Received GET USERS Petition:" + Date())
        try{
            if(!req.session.loggedUser)throw new Error('Log In First')
            if(!req.session.loggedUser.owner)throw new Error("You don't have permissions to do this")
            let users = await User.find().select({_id: 1, eMail: 1, admin: 1})
            res.json({success: true, response: users})
        }catch(err){
            res.json({success: false, response: err.message})
        }
    },
    removeUser: async (req, res) => {
        console.log("Received REMOVE USER Petition:" + Date())
        try{
            if(!req.session.loggedUser)throw new Error('Log In First')
            if(!req.session.loggedUser.owner)throw new Error("You don't have permissions to do this")
            const userToDelete = req.params.id
            let userDeleted = await User.findOneAndDelete({_id: userToDelete})
            if(!userDeleted)throw new Error('User not found')
            res.json({success: true, response: userDeleted})
        }catch(err){
            res.json({success: false, response: err.message})
        }
    }
    // sendResetPasswordMail: (req, res) =>{
    //     console.log("Received Send Reset Password Mail Petition:" + Date())
    //     const {eMail} = req.body
    //     User.findOne({eMail: eMail})
    //     .then(user => {
    //         if(user){
    //             let message = `
    //                 <header style="text-align:center;color:black;">
    //                     <h1 style="font-size:30px;text-decoration:underline;">MarDelCasas</h1>
    //                     <h2>¡Hola ${user.firstName} ${user.lastName}!</h2>
    //                 </header>
    //                 <main style="text-align:center;margin-bottom:20px;">
    //                     <p style="color:black;font-size:20px;text-align:center;">Por favor cambie su contraseña en este link:</p>
    //                     <a href="https://mardelcasas.herokuapp.com/usuario/restablecer-contraseña/${user._id}" style="font-size:25px;text-align:center;display:block;">CLICK AQUI!</a>
    //                 </main>
    //                 <footer style="text-align:center;">
    //                     <p>MarDeLasCasas SRL</p>
    //                     <p>Dir: Jujuy 995, Mar del Plata, Buenos Aires</p>
    //                     <p>Telefono: +54 2235391098</p>
    //                     <p style="color:red;">+ INFO!: <span style="color:blue;">mardelcasas@gmail.com</span></p>
    //                     <img src="cid:marDelCasasLogo@mardelcasas.com" style="width:150px;heigth:150px;"/>
    //                 </footer>
    //             `//mandarlo a frontend a una pagina con 2 input para la contraseña y que cuando el tipo toque enviar le pegues a ese endpoint, con ese params id y el paquete en el body
    //             let mailOptions = {
    //                 from: "Mar Del Casas <mardelcasas@gmail.com>",
    //                 to: `${user.firstName} <${user.eMail}>`,
    //                 subject: `Cambio de contrasena ${user.firstName}!`,
    //                 text: message,
    //                 html: message,
    //                 attachments: [{   
    //                     filename: "MARDELCASAS-L.png",
    //                     path: __dirname+"/MARDELCASAS-L.png",
    //                     cid: "marDelCasasLogo@mardelcasas.com"
    //                 }],
    //             }
    //             transporter.sendMail(mailOptions, (err, data) => {
    //                 err ? res.json({success: false, response: err}) : res.json({success: true, response: data})
    //             })
    //         }else{
    //             throw new Error("No se encontró ese usuario")
    //         }
    //     })
    //     .catch( err => handleError(res, err))
    // },
    // resetUserPassword: (req, res)=>{ // desde el punto de vista de la inseguridad... es medio inseguro esto, ver como hacer.
    //     console.log("Received Reset Password Petition:" + Date())
    //     const {password} = req.body
    //     let hashedPass = bcryptjs.hashSync(password)
    //     User.findOneAndUpdate({_id: req.params.id}, {password: hashedPass})
    //     .then(user => {
    //         if(user){
    //             let message = `
    //                 <header style="text-align:center;color:black;">
    //                     <h1 style="font-size:30px;text-decoration:underline;">MarDelCasas</h1>
    //                     <h2>¡Hola ${user.firstName} ${user.lastName}!</h2>
    //                 </header>
    //                 <main style="text-align:center;margin-bottom:20px;">
    //                     <p style="color:black;font-size:20px;text-align:center;">Queremos informarte que tu contrasena fue reiniciada!</p>
    //                     <p style="color:black;font-size:20px;text-align:center;">Si no fuiste tu quien cambio tu contrasena, y quieres deshabilitar tu cuenta, por favor sigue al siguiente link:</p>
    //                     <a href="https://mardelcasas.herokuapp.com/usuario/confirmacion-deshabilitar-cuenta/${user._id}" style="font-size:25px;text-align:center;display:block;">No fui yo quien reinicio la contrasena, ayuda!</a>
    //                 </main>
    //                 <footer style="text-align:center;">
    //                     <p>MarDeLasCasas SRL</p>
    //                     <p>Dir: Jujuy 995, Mar del Plata, Buenos Aires</p>
    //                     <p>Telefono: +54 2235391098</p>
    //                     <p style="color:red;">+ INFO!: <span style="color:blue;">mardelcasas@gmail.com</span></p>
    //                     <img src="cid:marDelCasasLogo@mardelcasas.com" style="width:150px;heigth:150px;"/>
    //                 </footer>
    //             `//mandarlo a frontend a una pagina de datos de contacto con una confirmación si quiere desabilitar su cuenta!
    //             let mailOptions = {
    //                 from: "Mar Del Casas <mardelcasas@gmail.com>",
    //                 to: `${user.firstName} <${user.eMail}>`,
    //                 subject: `Tu contrasena cambio ${user.firstName}!`,
    //                 text: message,
    //                 html: message,
    //                 attachments: [{  
    //                     filename: "MARDELCASAS-L.png",
    //                     path: __dirname+"/MARDELCASAS-L.png", 
    //                     cid: "marDelCasasLogo@mardelcasas.com"
    //                 }],
    //             }
    //             transporter.sendMail(mailOptions, (err, data) => {
    //                 err ? res.json({success: true, response: 'contrasena cambiada pero email fallo'}) : res.json({success: true, response: 'contrasena cambiada y email enviado'})
    //             })
    //         }else{
    //             throw new Error('No se encontro el usuario')
    //         }
    //     })
    //     .catch((err) => handleError(res, err))
    // },
    // hacer 2 endpoint 1 para mandar mail de reset password y 1 para cambiarla directamente.
}
module.exports = userControllers