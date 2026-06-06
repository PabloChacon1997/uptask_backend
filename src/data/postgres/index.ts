import { PrismaPg } from "@prisma/adapter-pg";

import { envs } from "../../config/envs";
import { PrismaClient } from "@prisma/client/extension";


const adapter = new PrismaPg({
  connectionString: envs.DATABASE_URL
});

export const prisma = new PrismaClient({ adapter })