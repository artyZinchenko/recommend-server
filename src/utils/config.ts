import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT;

export default { PORT };
