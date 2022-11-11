import { IClient } from "./IClient";

export interface IRefeicoes{
    cliente_refeicao_id: string;
    cliente_id: string;
    refeicao_id: string;
    createdAt: string;
    updatedAt: string;
}

export interface RefeicaoInfo{
    cliente_refeicao_id: string;
    cliente_id: string;
    refeicao_id: string;
    createdAt: string;
    updatedAt: string;
    clienteInfo: IClient;
    refeicaoInfo: {nome: string};
}