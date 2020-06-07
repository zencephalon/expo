import { TaskManagerTask } from './TaskManager.types';

export default {
  get name(): string {
    return 'ExpoTaskManager';
  },
  get EVENT_NAME(): string {
    return 'TaskManager.executeTask';
  },
  addListener() {},
  removeListeners() {},
  async isTaskRegisteredAsync(taskName: string): Promise<boolean> {
    return false;
  },
  async getRegisteredTasksAsync(): Promise<TaskManagerTask[]> {
    return [];
  },
  unregisterTaskAsync: null as null | ((taskName: string) => Promise<void>),
  getTaskOptionsAsync: null as null | (<T>(taskName: string) => Promise<T>),
  unregisterAllTasksAsync: null as null | (() => Promise<void>),
  notifyTaskFinishedAsync: null as
    | null
    | ((taskName: string, options: { eventId: string; result: any }) => Promise<void>),
};
