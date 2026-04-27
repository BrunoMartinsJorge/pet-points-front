import type { GeneroEnum } from "../../../../../shared/models/enums/GeneroEnum";

export interface DetalhesTutorPetDto {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    genero: GeneroEnum;
}