/**
 * Error object that can be received through TaskManagerTaskBody when the task fails.
 */
export interface TaskManagerError {
    code: string | number;
    message: string;
}
/**
 * Represents the object that is passed to the task executor.
 */
export interface TaskManagerTaskBody {
    /**
     * An object of data passed to the task executor. Its properties depends on the type of the task.
     */
    data: object;
    /**
     * Error object if the task failed or `null` otherwise.
     */
    error: TaskManagerError | null;
    /**
     * Additional details containing unique ID of task event and name of the task.
     */
    executionInfo: {
        eventId: string;
        taskName: string;
    };
}
/**
 * Represents an already registered task.
 */
export interface TaskManagerTask {
    /**
     * Name that the task is registered with.
     */
    taskName: string;
    /**
     * Type of the task which depends on how the task was registered.
     */
    taskType: string;
    /**
     * Provides `options` that the task was registered with.
     */
    options: any;
}
/**
 * @deprecated in favor of TaskManagerTask.
 */
export interface RegisteredTask extends TaskManagerTask {
}
/**
 * Type of task executor – a function that handles the task.
 */
export declare type TaskManagerTaskExecutor = (body: TaskManagerTaskBody) => void;
