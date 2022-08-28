const uuid = require('uuid')
const {hashPassword} = require('../utils/crypt')

const userDB = [{
      "id": "db062b4a-daac-4b72-9752-ab3da0f275f3",
      "first_name": "Alejo",
      "last_name": "Betancur",
      "email": "alejo@example.com",
      "password": "$2b$10$EK8Ei3vpa7SEROBqQfSRmunyW940kfnYOh/3XzUoSQpgGm8wl.Cem",
      "phone": "+573456789034",
      "birthday_date": "02/06/1991",
      "rol": "normal",
      "profile_image": "example.com/img/example.png",
      "country": "Colombia",
      "is_active": true,
      "verified": false
    },
  ]

const getAllUsers = () => {
    return userDB
    //? select * from users;
}

const getUserById = (id) => {
    const data = userDB.filter(item => item.id === id)
    return data.length ? data[0] : false
    //? select * from users where id = ${id};
}

const createUser = (data) => {
    const newUser = {
        id: uuid.v4(),                                          // Obligatorio y unico.
        first_name: data.first_name,                            // Obligatorio.
        last_name: data.last_name,                              // Obligatorio.
        email: data.email,                                      // Obligatorio y unico.
        password: hashPassword(data.password),                  // Obligatorio.
        phone: data.phone ? data.phone : '',                    // Unico.
        birthday_date: data.birthday_date,                      // Obligatorio.
        rol: 'normal',                                          // Obligatorio y por defecto "normal".
        profile_image: data.profile_image ? data.profile_image : '', 
        country: data.country,                                  // Obligatorio
        is_active: true,                                        // Obligatorio y por defecto true.
        verified: false                                         // Obligatorio y por defecto false.
    }
    userDB.push(newUser)
    return newUser
}

const editUser = (id, data) => {
    const index = userDB.findIndex(user => user.id === id)
    if(index !== -1){
        userDB[index] = {
            id: id,
            first_name: data.first_name,                            
            last_name: data.last_name,                              
            email: data.email,                                      
            password: userDB[index].password,                  
            phone: data.phone,                    
            birthday_date: data.birthday_date,                      
            rol: data.rol,                                          
            profile_image: data.profile_image, 
            country: data.country,                                  
            is_active: data.is_active,
            verified: false                                                 
        }
        return userDB[index]
    } else {
        return createUser(data)
    }
}

const deleteUser = (id) => {
    const index = userDB.findIndex(user => user.id === id)
    if(index !== -1){
        userDB.splice(index, 1)
        return true
    } else {
        return false
    }
}

const getUserByEmail = (email) => {
    const data = userDB.filter((item) => item.email === email);
    return data.length ? data[0] : false
    //? select * from users where email = ${email};
  }

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,
    getUserByEmail
}
