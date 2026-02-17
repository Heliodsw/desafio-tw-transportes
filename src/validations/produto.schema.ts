import * as yup from "yup";

export const produtoSchema = yup.object({
  id: yup.number().optional(),
  nome: yup.string().required("O nome do produto é obrigatório"),
  preco: yup.number().typeError("O preço deve ser um número").required("O preço é obrigatório").positive("O preço deve ser maior que zero"),
  descricao: yup.string().optional(),
  clienteId: yup.number().required("Selecione um cliente"),
});

export type ProdutoSchema = yup.InferType<typeof produtoSchema>;
