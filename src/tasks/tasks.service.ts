import { 
    HttpException, 
    Injectable,
    HttpStatus
} from '@nestjs/common';

import { Task } from './entities/task.entitie'; 
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TasksService {
	constructor(private readonly databaseService: DatabaseService) {}

    async	listAllTasks() {
		try{
			const allTasks: Task[] = this.databaseService.task.findMany();
			return allTasks;
		} catch (error) {
			throw new HttpException('Erro ao listar as tarefas', HttpStatus.INTERNAL_SERVER_ERROR);
		}
    }

    async findOneTask(id: number) {
		try{
			const task = await this.databaseService.task.findUnique({
				where: { id }
			});
            return task;
			} catch (error) {
				throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
        	}
    }

    async create(createTaskDto: CreateTaskDto) {
        try {
			const newTask = await this.databaseService.task.create({
				data: {
					name: createTaskDto.name,
					description: createTaskDto.description,
				}
			});
			return newTask;
		} catch (error) {
			throw new HttpException(
				'Erro ao criar a tarefa',
				HttpStatus.INTERNAL_SERVER_ERROR);
		}
    }

    async update(id: Number, updateTaskDto: UpdateTaskDto){
		try {
			const findtask = await this.databaseService.task.findUnique({
				where: { id }
			});
			if (!findtask) {
				throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
			}
			const updatedTask = await this.databaseService.task.update({
				where: { id },
				data: updateTaskDto
		});
		return updatedTask;
		} catch (error) {
			throw new HttpException(
				'Erro ao atualizar a tarefa',
				HttpStatus.INTERNAL_SERVER_ERROR);
		}
    }

    async delete(id: number) {
        try {
			const findtask = await this.databaseService.task.findUnique({
				where: { id }
			});
			if (!findtask) {
				throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
			}
			await this.databaseService.task.delete({
				where: { id }
			});
			return { message: 'Tarefa deletada com sucesso' };
		} catch (error) {
			throw new HttpException(
				'Erro ao deletar a tarefa',
				HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}
