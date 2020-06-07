import { TaskManagerTask } from './TaskManager.types';
declare const _default: {
    readonly name: string;
    readonly EVENT_NAME: string;
    addListener(): void;
    removeListeners(): void;
    isTaskRegisteredAsync(taskName: string): Promise<boolean>;
    getRegisteredTasksAsync(): Promise<TaskManagerTask[]>;
    unregisterTaskAsync: ((taskName: string) => Promise<void>) | null;
    getTaskOptionsAsync: (<T>(taskName: string) => Promise<T>) | null;
    unregisterAllTasksAsync: (() => Promise<void>) | null;
    notifyTaskFinishedAsync: ((taskName: string, options: {
        eventId: string;
        result: any;
    }) => Promise<void>) | null;
};
export default _default;
