import { ImageLinks } from "./image-link.model";

export interface VolumeInfo {
    id:number;
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    imageLinks: ImageLinks;
    language: string;
}