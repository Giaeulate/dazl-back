import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../../database/mysql/models/entities/Users";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) { }

    async updateUser(user: Users): Promise<Boolean> {
        const response = await this.userRepository.update(user.id, user);
        return response.affected === 1;
    }

    async updateFirebaseTokenUser(user: Users): Promise<Boolean> {
        if (user.active !== undefined) {
            if (user.active) {
                user.active = user.activeUser();
            } else {
                user.active = user.inactiveUser();
            }
        }
        const response = await this.userRepository.update(user.id, user);
        return response.affected === 1;
    }

    async findUserByEmail(email: string) {
        return await this.userRepository.findOneBy({ email: email });
    }

    async findUserById(id: string) {
        return await this.userRepository.findOneBy({ id: id });
    }
}