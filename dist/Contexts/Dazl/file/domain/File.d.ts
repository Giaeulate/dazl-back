import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { FileId } from './FileId';
import { FileName } from './FileName';
import { FileContentType } from './FileContentType';
import { FileLocation } from './FileLocation';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { FileDto } from './dto/FileDto';
export declare class File extends AggregateRoot {
    id?: FileId;
    name?: FileName;
    contentType?: FileContentType;
    location?: FileLocation;
    createdAt?: CreatedAt;
    updatedAt?: UpdatedAt;
    constructor(id?: FileId, name?: FileName, contentType?: FileContentType, location?: FileLocation);
    static create(plainData: {
        id: string;
        name: string;
        contentType: string;
        location: string;
    }): File;
    static fromPrimitives(plainData: {
        id: string;
        name: string;
        contentType: string;
        location: string;
    }): File;
    toPrimitives(): FileDto;
}
