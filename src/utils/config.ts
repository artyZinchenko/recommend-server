import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

export default { PORT, SECRET };
