import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {label: 'username', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            async authorize(credentials) {
                if(!credentials?.username || !credentials?.password) {
                    throw new Error('Usuário e senha obrigatórios!');
                }

                const response = await axios.get(`http://localhost:3001/users/username/${credentials?.username}`);
                const user = response.data;

                if (!user || !user?.hashedPassword) {
                    throw new Error('Usuário não existe!');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error('Credenciais inválidas!');
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);