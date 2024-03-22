import { File } from '../File';
export declare class FileDto {
    id: string;
    name: string;
    contentType: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    constructor(file: File);
}
