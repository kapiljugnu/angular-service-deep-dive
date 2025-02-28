import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { InjectionToken } from '@angular/core';

// bootstrapApplication(AppComponent, {
//     providers: [TasksService]
// }).catch((err) => console.error(err));

// bootstrapApplication(AppComponent).catch((err) => console.error(err));

export const TaskServiceToken = new InjectionToken('task-service-token');

bootstrapApplication(AppComponent, {
    providers: [{ provide: TaskServiceToken, useClass: TasksService }]
}).catch((err) => console.error(err));
