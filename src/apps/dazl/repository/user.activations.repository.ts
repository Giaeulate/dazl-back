import { InjectRepository } from "@nestjs/typeorm";
import { UserActivations } from "../../../database/mysql/models/entities/UserActivations";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserActivationsRepository {
    constructor(
        @InjectRepository(UserActivations)
        private readonly userRepository: Repository<UserActivations>,
    ) { }

    private getUserActivationWithTheLatestStartTime = (
        usersActive: Array<UserActivations>,
    ): UserActivations =>
        usersActive.reduce((previous, current) => {
            const now = new Date().getTime();
            const previousStartTime = Number(previous.expirationDate);
            const currentStartTime = Number(current.expirationDate);
            const diffPrevious = previousStartTime - now;
            const diffCurrent = currentStartTime - now;
            if (diffPrevious < diffCurrent) return previous;
            return current;
        }, usersActive[0] as UserActivations);



    async findUserActivationsByUserId(id: string): Promise<UserActivations[]> {
        return await this.userRepository.find({ where: { userId: id } });
    }

    async getLastUserActiveByUserId(id: string): Promise<UserActivations> {
        const userActivations = await this.findUserActivationsByUserId(id);
        const usersActive = userActivations.filter((userActivation) =>
            userActivation.isStillActive(),
        );

        if (usersActive.length == 0) return null;

        return this.getUserActivationWithTheLatestStartTime(usersActive);
    }
}