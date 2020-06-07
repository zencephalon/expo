export default {
    get name() {
        return 'ExpoTaskManager';
    },
    get EVENT_NAME() {
        return 'TaskManager.executeTask';
    },
    addListener() { },
    removeListeners() { },
    async isTaskRegisteredAsync(taskName) {
        return false;
    },
    async getRegisteredTasksAsync() {
        return [];
    },
    unregisterTaskAsync: null,
    getTaskOptionsAsync: null,
    unregisterAllTasksAsync: null,
    notifyTaskFinishedAsync: null,
};
//# sourceMappingURL=ExpoTaskManager.js.map