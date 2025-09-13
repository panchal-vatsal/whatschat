import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const dataFilePath = path.resolve(process.cwd(), 'src/data/data.json');

const readData = () => {
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(jsonData);
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const data = readData();
        const user = data.users.find((user: any) => user.email === credentials.email);

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id, email: user.email };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
