import { 
    HttpException, 
    Injectable,
    HttpStatus
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { DatabaseService } from '../database/database.service';
import { PaginationDto } from 'src/app/common/dto/pagination.dto';
import { resolvePagination } from 'src/app/common/pagination/resolvePagination';

@Injectable()
export class TasksService {
	constructor(private readonly databaseService: DatabaseService) {}

    async listAllTasks(paginationDto?: PaginationDto) {
		const { limit, offset } = resolvePagination(paginationDto);
		try{
			const allTasks = await this.databaseService.task.findMany({
				take: limit,
				skip: offset,
				orderBy:{
					createdAt: 'desc'
				}
			});
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
}