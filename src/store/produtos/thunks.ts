import { db, schemas } from "@/src/database";
import { ProdutoSchema } from "@/src/validations/produto.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { eq } from "drizzle-orm";
import { Alert } from "react-native";

export const listProductsThunk = createAsyncThunk(
    "produtos/list",
    async (_, { rejectWithValue }) => {
        try {
            return await db.query.produto.findMany();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao listar produtos";
            Alert.alert("Erro", message);
            throw rejectWithValue(message);
        }
    }
)

export const createProductThunk = createAsyncThunk(
    "produtos/create",
    async (data: ProdutoSchema, { rejectWithValue }) => {
        try {
            await db.insert(schemas.produto).values({
                nome: data.nome,
                preco: data.preco,
                descricao: data.descricao || "",
                clienteId: data.clienteId,
                dataCadastro: new Date().toISOString(),
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao criar produto";
            Alert.alert("Erro", message);
            throw rejectWithValue(message);
        }
    }
)

export const deleteProductThunk = createAsyncThunk(
    "produtos/delete",
    async (id: number, { rejectWithValue, dispatch }) => {
        try {
            await db.delete(schemas.produto).where(eq(schemas.produto.id, id));
            await dispatch(listProductsThunk());
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao excluir produto";
            Alert.alert("Erro", message);
            throw rejectWithValue(message);
        }
    }
)
