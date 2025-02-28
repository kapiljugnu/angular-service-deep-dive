import { Component, signal, inject, computed } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, TaskStatusOptionsProvider, TaskStatusOptionsType } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [TaskStatusOptionsProvider]
})
export class TasksListComponent {
  private taskService = inject(TasksService);
  private selectedFilter = signal<string>('all');
  taskStatusOptions = inject<TaskStatusOptionsType[]>(TASK_STATUS_OPTIONS);

  tasks = computed(() => {
    switch(this.selectedFilter()) {
      case 'open': 
        return this.taskService.allTasks().filter(task => task.status === 'OPEN');
      case 'in-progress': 
        return this.taskService.allTasks().filter(task => task.status === 'IN_PROGRESS');
      case 'done': 
        return this.taskService.allTasks().filter(task => task.status === 'DONE');
      default:
        return this.taskService.allTasks();
    }
  })

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
