export interface Photo {
    id?: string;
    src: string | ArrayBuffer | null;
    width?: number; // the number of display columns
    title?: string;
}

interface Container {
    id: string;
    name: string;
}

interface Tag {}

export interface Item {
    id?: number;
    photos?: Array<Photo> | Array<>;
    location?: Container;
    name?: string;
    tags?: Array<Tag>;
    updatedAt?: string;
    createdAt?: string;
}
