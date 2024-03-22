import { CreatorComplaint } from '../../../../Contexts/Dazl/complaint/application/Creator/CreatorComplaint';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
declare class PostBody {
    messageId: string;
    complainantId: string;
}
export declare class PostComplaintController {
    private readonly creatorComplaint;
    constructor(creatorComplaint: CreatorComplaint);
    run(postBody: PostBody): Promise<SuccessfulFormatResponse<void>>;
}
export {};
