import { IRefeicoes } from "./IRefeicoes";

export interface IClient{
    cliente_id?: string;
    nome: string;
    matricula: string;
    cpf: string;
    qtd_refeicoes_gratis: number;
    ativo: boolean;
    refeicoes: IRefeicoes[];
}