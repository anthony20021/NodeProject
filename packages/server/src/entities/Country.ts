import { InferSelectModel, InferInsertModel, getTableColumns } from "drizzle-orm";
import { countries } from "../schemas";
export type Country = InferSelectModel<typeof countries>;
export type newCountry = InferInsertModel<typeof countries>;
export const countriesColumns = getTableColumns(countries);

