import { createConnection } from 'typeorm';

createConnection().catch(e => console.log(e));
