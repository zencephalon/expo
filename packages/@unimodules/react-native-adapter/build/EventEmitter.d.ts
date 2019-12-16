declare type NativeModule = {
    startObserving?: () => void;
    stopObserving?: () => void;
    addListener: (eventName: string) => void;
    removeListeners: (count: number) => void;
};
declare type EventListener = (event: any) => void;
export declare type Subscription = {
    eventName: string;
    listener: EventListener;
    remove: () => void;
};
export declare class EventEmitter {
    _listenerCount: number;
    _nativeModule: NativeModule;
    constructor(nativeModule: NativeModule);
    addListener<T>(eventName: string, listener: (event: T) => void): Subscription;
    removeAllListeners(eventName: string): void;
    removeSubscription(subscription: Subscription): void;
    emit(eventName: string, ...params: any[]): void;
}
export {};
