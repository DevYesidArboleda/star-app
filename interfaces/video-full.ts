export interface Data {
    doc: products[];
}

export interface products {
    id:         string;
    photoUrls?:  PhotoURL[];
    tags:        string[];
    likes:       string[];
    uploadDate:  Date;
    provider:    Provider;
    externalId:  string;
    usefulId:    string;
    videoUrl:    string;
    name:        string;
    description: string;
    price:       number;
    revenue:     number;
    __v:         number;
    active:      boolean;
    thumbnail:   string;
}

export enum PhotoURL {
    AlgunURL = "algunUrl",
    OtroURL = "otroUrl",
    Unomas = "unomas",
}

export interface Provider {
    id:       string;
    avatarUrl: string;
}