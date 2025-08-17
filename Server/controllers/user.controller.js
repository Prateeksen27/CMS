import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res)=>{
    // console.log("Registering...");
    const { username, password,role } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: `${role} having username ${username} already exists` });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ username, password: hashedPassword, role: role });
        await newUser.save();
        res.status(201).json({ message: `${role} registered successfully` });
    } catch (error) {
        
        console.error("Error during registration:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const login = async (req,res)=>{
    console.log("Logging in...");
    const { username, password,role } = req.body;
    try{
        const user = await User.find({ username, role });
        if (!user || user.length === 0) {
            return res.status(404).json({ message: `${role} with username ${username} not found` });
        }
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }   
        const token = jwt.sign({ id: user[0]._id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user[0]._id, username: user[0].username, role: user[0].role } });
    }catch (error) {
        console.error(`Error during ${role} login:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
