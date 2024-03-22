/// <reference types="multer" />
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { MessageDto } from '../../../../Contexts/Dazl/message/domain/dto/request/MessageDto';
import { SendPhotoMessageService } from '../../../../Contexts/Dazl/message/application/send-photo/send-photo-message.service';
export declare class SendPhotoMessageController {
    private readonly sendPhotoMessageService;
    constructor(sendPhotoMessageService: SendPhotoMessageService);
    run(file: Express.Multer.File, request: MessageDto): Promise<FormatResponse>;
}
