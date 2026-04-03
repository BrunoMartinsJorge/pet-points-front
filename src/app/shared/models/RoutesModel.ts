/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RoutesModel {
    path: string;
    title: string;
    component?: any;
    data?: {
        visible: boolean;
        RULES?: string[];
        nome: string;
        icone?: string;
        group?: string;
        title?: string;
        descricao?: string;
        voltar?: boolean;
    };
    canActivate?: any[];
    children?: RoutesModel[];
    redirectTo?: string;
    pathMatch?: string;
}

export interface ListOfRoutes {
    groupName: string;
    routes: RoutesModel[];
}