import { LocationType } from './location';
export interface Photo {
    id?: string;
    src: string | ArrayBuffer | null;
    width?: number; // the number of display columns
    title?: string;
    // new?: boolean; // mark the photo for synchronization with backend.
}

interface Tag {
    name: string;
    id?: number;
}

export interface Item {
    id?: number;
    photos?: Array<Photo> | Array<>;
    location?: LocationType;
    name?: string;
    tags?: Array<Tag>;
    updatedAt?: string;
    createdAt?: string;
}
