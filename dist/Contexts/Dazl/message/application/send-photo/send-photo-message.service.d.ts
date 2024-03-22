/// <reference types="multer" />
import { MessageDto } from '../../domain/dto/request/MessageDto';
import { UploadUserImageService } from '../../../file/application/creator/upload-user-image.service';
import { CreatorMessageService } from '../create/creator-message.service';
import { MessageFileRepository } from '../../../message-file/domain/MessageFileRepository';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { FileDto } from '../../../file/domain/dto/FileDto';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { ConvertMessageResponse, MessageResponseDto } from '../ConvertResponse/ConvertMessageResponse';
export type MessageFileDto = {
    id: string;
    text: string;
    isSent: number;
    type: string;
    active: number;
    channelId: string;
    userFromId: string;
    userToId: string;
    reported: boolean;
    file?: FileDto | {} | undefined;
    response?: MessageResponseDto | null | undefined | string;
};
export declare class SendPhotoMessageService {
    private readonly messageFileRepository;
    private readonly uploadUserImageService;
    private readonly creatorMessageService;
    private readonly fileFinderService;
    private readonly finderUserActivationService;
    private readonly moduleGateway;
    private readonly convertMessageResponse;
    constructor(messageFileRepository: MessageFileRepository, uploadUserImageService: UploadUserImageService, creatorMessageService: CreatorMessageService, fileFinderService: FileFinderService, finderUserActivationService: UserActivationFinder, moduleGateway: ModuleGateway, convertMessageResponse: ConvertMessageResponse);
    run(file: Express.Multer.File, request: MessageDto): Promise<MessageFileDto>;
}
