import { InferSelectModel, InferInsertModel, getTableColumns } from "drizzle-orm";
import { messages } from "../schemas";

export type Message = InferSelectModel<typeof messages>;
export type NewMessage = InferInsertModel<typeof messages>;
export const messageColumns = getTableColumns(messages);
