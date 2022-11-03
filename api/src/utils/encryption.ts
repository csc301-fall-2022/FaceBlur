import bcrypt from 'bcrypt';

const hash = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
};

const compare = async (hash: string, pass: string) => {
    return bcrypt.compare(hash, pass);
};

// const genToken = (id: number) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET as string, {
//         expiresIn: process.env.JWT_EXPIRE
//     });
// };

export { hash, compare };