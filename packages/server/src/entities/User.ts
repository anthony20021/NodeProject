import { InferSelectModel, InferInsertModel, getTableColumns } from "drizzle-orm";
import { users } from "../schemas";


export type User = InferSelectModel<typeof users>;


export type NewUser = InferInsertModel<typeof users>;


export const userColumns = getTableColumns(users);