export interface Photo {
    id?: string;
    src: string | ArrayBuffer | null;
}

interface Container {
    id: string;
    name: string;
}

interface Tag {}

export interface Item {
    id: string;
    photos: Array<Photo>;
    location: Container;
    name?: string;
    tags?: Array<Tag>;
    values: {};
}
