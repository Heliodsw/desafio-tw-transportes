import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { cliente } from "./clienteDBSchema";

export const produto = sqliteTable("Produto", {
    id: integer("Id").primaryKey({ autoIncrement: true }),
    nome: text("Nome").notNull(),
    preco: real("Preco").notNull(),
    descricao: text("Descricao"),
    clienteId: integer("ClienteId")
        .notNull()
        .references(() => cliente.id, { onDelete: "cascade" }),
    dataCadastro: text("DataCadastro").notNull(),
});
