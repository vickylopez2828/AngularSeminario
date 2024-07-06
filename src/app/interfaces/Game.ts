export interface Game {
    id?: number,
    title: string;
    price_normal: number;
    price_off: number;
    description: string;
    gameImage: string;
    type: string;
    qualification?: number;
    bought?: boolean;
}