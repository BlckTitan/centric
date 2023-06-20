import bcrypt from "bcryptjs"

const userData = {
    users: [
        {
            name: 'John',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Jane',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        }
    ]
}

export default userData