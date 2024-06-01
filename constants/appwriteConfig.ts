import { Client, Databases } from "react-native-appwrite";

const client = new Client()
    .setEndpoint(process.env.ENPOINT as string)
    .setProject(process.env.PROJECT_ID as string)
    .setPlatform(process.env.PLATEFORM as string);
const database = new Databases(client);
export { database };
