import type { GeneroEnum } from "../../../models/enums/GeneroEnum";

export interface DetalhesTutorPetDto {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    genero: GeneroEnum;
}