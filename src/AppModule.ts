import { Module } from "@nestjs/common";
import { DazlModule } from "./apps/dazl/dazl.module";

@Module({
    imports: [
        DazlModule
    ],
})
export class AppModule { }