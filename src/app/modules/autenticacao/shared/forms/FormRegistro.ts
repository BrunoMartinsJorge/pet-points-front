import type { GeneroEnum } from "../../../../shared/models/enums/GeneroEnum";

export interface FormRegistro {
    nome: string;
    genero: GeneroEnum;
    cpf: string;
    email: string;
    telefone: string;
    senha: string;
    dataNascimento: Date;
}