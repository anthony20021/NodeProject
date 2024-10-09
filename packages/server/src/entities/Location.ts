import { InferSelectModel, InferInsertModel, getTableColumns } from "drizzle-orm";
import { locations } from "../schemas";
export type Location= InferSelectModel<typeof locations>;
export type newLocation= InferInsertModel<typeof locations>;
export const locationsColumns = getTableColumns(locations);

