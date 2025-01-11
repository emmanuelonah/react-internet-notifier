export class InternetNotifierModel {
  public static offlineListener(
    listener: (_ev: Event) => unknown,
    options?: boolean | AddEventListenerOptions
  ) {
    window.addEventListener('offline', listener, options);
  }

  public static onlineListener(
    listener: (_ev: Event) => unknown,
    options?: boolean | AddEventListenerOptions
  ) {
    window.addEventListener('online', listener, options);
  }

  public static unsubscribeOnline(listener: (_ev: Event) => unknown) {
    window.removeEventListener('online', listener);
  }

  public static unsubscribeOffline(listener: (_ev: Event) => unknown) {
    window.removeEventListener('offline', listener);
  }
}
