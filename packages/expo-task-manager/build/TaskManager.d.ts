import { TaskManagerError, TaskManagerTaskBody, TaskManagerTask, RegisteredTask, TaskManagerTaskExecutor } from './TaskManager.types';
/**
 * Method that you use to define a task – it saves given task executor under given task name
 * which must be correlated with the task name used when registering the task.
 *
 * @param taskName Name of the task. It must be the same as the name you provided when registering the task.
 * @param taskExecutor A function that handles the task.
 */
export declare function defineTask(taskName: string, taskExecutor: TaskManagerTaskExecutor): void;
/**
 * Checks whether the task is already defined.
 *
 * @param taskName Name of the task.
 */
export declare function isTaskDefined(taskName: string): boolean;
/**
 * Checks whether the task has been registered.
 *
 * @param taskName Name of the task.
 * @returns A promise resolving to boolean value. If `false` then even if the task is defined, it won't be called because it's not registered.
 */
export declare function isTaskRegisteredAsync(taskName: string): Promise<boolean>;
/**
 * Retrieves an `options` object for provided `taskName`.
 *
 * @param taskName Name of the task.
 */
export declare function getTaskOptionsAsync<TaskOptions>(taskName: string): Promise<TaskOptions>;
/**
 * Provides informations about registered tasks.
 *
 * @returns Returns a promise resolving to an array containing all tasks registered by the app.
 */
export declare function getRegisteredTasksAsync(): Promise<TaskManagerTask[]>;
/**
 * Unregisters the task. Tasks are usually registered by other modules (e.g. expo-location).
 *
 * @param taskName Name of the task.
 */
export declare function unregisterTaskAsync(taskName: string): Promise<void>;
/**
 * Unregisters all tasks registered by the app. You may want to call this when the user is
 * signing out and you no longer need to track his location or run any other background tasks.
 */
export declare function unregisterAllTasksAsync(): Promise<void>;
export { TaskManagerError, TaskManagerTaskBody, TaskManagerTask, RegisteredTask, TaskManagerTaskExecutor, };
