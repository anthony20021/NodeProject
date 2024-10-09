import { Pool } from "pg"; // Pool nous prmet de créer un pool de connexions à la db pgsql
import { migrate } from "drizzle-orm/node-postgres/migrator"; // migrate est une fonction de drizzle qui permet de migrer la db
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres/driver"; 

import { env } from "./env"
const { DATABASE_URL } = env;

async function main(){
    const pool = new Pool({
        connectionString: DATABASE_URL,
    });
    const db: NodePgDatabase = drizzle(pool);

    console.info("Starting migration");

    await migrate(db, {migrationsFolder: "src/migrations"});
    
    console.info("Migration completed successfully");

    await pool.end();

}

main();
