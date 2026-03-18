import { Controller,
         Get,
         Param,
         Query,
         Post,
         Put,
         Body
} from '@nestjs/common';
import { TasksService } from './tasks.service'
import { create } from 'domain';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { }

    @Get()
    getTasks() {
        return this.taskService.listAllTasks()
    }

    @Get("/busca") 
    findManyTasks(@Query() queryParam: any) {
        return this.taskService
    }
    
    @Get(":id")
    findSingleTask(@Param('id') id: string) {
        return this.taskService.findOneTask(id)
    }

    @Post()
    createTask(@Body() body: any) {
        return this.taskService.create(body)
    }

    @Put(":id") //Patch
    updateTask(@Param ('id') id: string, @Body() body: any) {
        return this.taskService.update(id, body)
    }
}