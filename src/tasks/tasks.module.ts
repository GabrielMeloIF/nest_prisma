import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseModule } from '../database/database.module';
 
@Module({
    controllers: [ TasksController],
    providers: [TasksService],
    imports: [DatabaseModule]
})
export class TasksModule {
}
