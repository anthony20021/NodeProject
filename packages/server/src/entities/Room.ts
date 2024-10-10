import { InferSelectModel, InferInsertModel, getTableColumns } from "drizzle-orm";
import { rooms } from "../schemas";

export type Room = InferSelectModel<typeof rooms>;
export type NewRoom = InferInsertModel<typeof rooms>;
export const roomColumns = getTableColumns(rooms);
