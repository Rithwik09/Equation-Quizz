import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { action, email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and Password are required' });
        }

        if (action === 'signup') {
            // Handle Signup
            if (!name) {
                return res.status(400).json({ success: false, message: 'Name is required for signup' });
            }
            try {
                // Check if the user already exists
                const existingUser = await prisma.user.findUnique({
                    where: { email },
                });
                if (existingUser) {
                    return res.status(400).json({ success: false, message: 'User already exists' });
                }

                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Create the new user
                const newUser = await prisma.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        name,
                        role: 'USER', // or assign default role
                    },
                });

                return res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
            } catch (error) {
                console.error('Signup error:', error);
                return res.status(500).json({ success: false, message: 'An error occurred during signup' });
            }
        } else if (action === 'login') {
            // Handle Login
            try {
                const user = await prisma.user.findUnique({
                    where: { email },
                });
                if (user && await bcrypt.compare(password, user.password)) {
                    return res.status(200).json({ success: true, message: 'Login successful' });
                } else {
                    return res.status(401).json({ success: false, message: 'Invalid email or password' });
                }
            } catch (error) {
                console.error('Login error:', error);
                return res.status(500).json({ success: false, message: 'An error occurred during login' });
            }
        } else {
            return res.status(400).json({ success: false, message: 'Invalid action specified' });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
