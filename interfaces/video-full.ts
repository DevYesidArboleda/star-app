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

export interface SimpleCatalog {
    id: string;
    name: string;
    description:  string;
    quantity: number;
    price:        number;    
    thumbnail:    string;    
    variations:   Variation[];
}

export interface Catalog {
    ok:   boolean;
    data: Data;
}

export interface Data {
    _id:         string;
    name:        string;
    description: string;
    products:    Product[];
}

export interface Product {
    _id:          string;
    externalId:   string;
    videoUrl:     string;
    name:         string;
    description:  string;
    price:        number;
    revenue:      number;
    tags:         string[];
    likes:        string[];
    active:       boolean;
    points:       number;
    thumbnail:    string;
    isPercentage: boolean;
    uploadDate:   Date;
    __v:          number;
    attributes:   Attribute[];
    variations:   Variation[];
}

export interface Attribute {
    description: string;
    isVariation: boolean;
    values:      AttributeValue[];
    id:          number;
}

export interface AttributeValue {
    value:          string;
    attribute_name: string;
}

export interface Variation {
    suggested_price: string;
    stock:           string;
    values:          VariationValue[];
    id:              number;
}

export interface VariationValue {
    id:             string;
    value:          string;
    attribute_name: string;
}
