import { Controller,
         Get,
         Param,
         Query,
         Post,
         Put,
         Body,
         Delete,
         ParseIntPipe
} from '@nestjs/common';
import { TasksService } from './tasks.service'
import { create } from 'domain';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { }

    @Get()
    getTasks(@Query() params: any) {
        console.log(params);
        return this.taskService.listAllTasks()
    }

    @Get("/busca") 
    findManyTasks(@Query() queryParam: any) {
        return this.taskService
    }
    
    @Get(":id")
    findSingleTask(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.findOneTask(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto)
    }

    @Put(":id") //Patch
    updateTask(@Param ('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto)
    }

    @Delete(":id")
    deleteTask(@Param ('id', ParseIntPipe) id: number) {
        return this.taskService.delete(id)
    }
}