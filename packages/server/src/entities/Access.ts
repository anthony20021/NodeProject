import { InferSelectModel, InferInsertModel, getTableColumns } from "drizzle-orm";
import { accesses } from "../schemas";
export type Access = InferSelectModel<typeof accesses>;
export type newAccess = InferInsertModel<typeof accesses>;
export const accessesColumns = getTableColumns(accesses);

