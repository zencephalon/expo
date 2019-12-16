import invariant from 'invariant';
// @ts-ignore
import { NativeEventEmitter, Platform, TurboModuleRegistry } from 'react-native';

const nativeEmitterSubscriptionKey = '@@nativeEmitterSubscription@@';

type NativeModule = {
  startObserving?: () => void;
  stopObserving?: () => void;
  addListener: (eventName: string) => void;
  removeListeners: (count: number) => void;
};

// @ts-ignore
const TurboEventEmitter = global.__turboModuleProxy('UMReactNativeEventEmitter');

type EventListener = (event: any) => void;

export type Subscription = {
  eventName: string;
  listener: EventListener;
  remove: () => void;
};

const listeners = new Map<string, Set<EventListener>>();

const eventEmitterCallback = (name: string, event: any) => {
  // console.log('eventEmitterCallback called with ', name, event);
  const eventListeners = listeners[name];
  if (eventListeners) {
    for (const listener of [...eventListeners]) {
      listener(event);
    }
  }
}

TurboEventEmitter.setListener(eventEmitterCallback);

export class EventEmitter {
  _listenerCount = 0;
  _nativeModule: NativeModule;

  constructor(nativeModule: NativeModule) {
    this._nativeModule = nativeModule;
  }

  addListener<T>(eventName: string, listener: (event: T) => void): Subscription {
    console.log('EventEmitter.addListener', eventName, this._nativeModule);
    if (!this._listenerCount && Platform.OS !== 'ios' && this._nativeModule.startObserving) {
      this._nativeModule.startObserving();
    }
    this._nativeModule.addListener(eventName);

    this._listenerCount++;
    if (!listeners[eventName]) {
      listeners[eventName] = new Set<EventListener>();
    }
    listeners[eventName].add(listener);
    const subscription = {
      listener,
      eventName,
      remove: () => {
        this.removeSubscription(subscription);
      },
    };
    return subscription;
  }

  removeAllListeners(eventName: string): void {
    console.warn('removeAllListeners');
    // (listeners[eventName] as Set).
    // const removedListenerCount = this._eventEmitter.listeners(eventName).length;
    // this._eventEmitter.removeAllListeners(eventName);
    // this._listenerCount -= removedListenerCount;
    invariant(
      this._listenerCount >= 0,
      `EventEmitter must have a non-negative number of listeners`
    );

    if (!this._listenerCount && Platform.OS !== 'ios' && this._nativeModule.stopObserving) {
      this._nativeModule.stopObserving();
    }
  }

  removeSubscription(subscription: Subscription): void {
    // const nativeEmitterSubscription = subscription[nativeEmitterSubscriptionKey];
    // if (!nativeEmitterSubscription) {
    //   return;
    // }

    listeners[subscription.eventName].delete(subscription.listener);
    // this._eventEmitter.removeSubscription(nativeEmitterSubscription!);
    this._listenerCount--;

    // Ensure that the emitter's internal state remains correct even if `removeSubscription` is
    // called again with the same subscription
    // delete subscription[nativeEmitterSubscriptionKey];

    // Release closed-over references to the emitter
    subscription.remove = () => {};

    if (!this._listenerCount && Platform.OS !== 'ios' && this._nativeModule.stopObserving) {
      this._nativeModule.stopObserving();
    }
  }

  emit(eventName: string, ...params: any[]): void {
    eventEmitterCallback(eventName, params);
  }
}
