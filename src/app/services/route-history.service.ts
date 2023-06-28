import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteHistoryService {
  private static historyRoutes: string[] = [];
  private static previousUrl?: string;
  private static currentUrl?: string;

  constructor(private router: Router) {
    if (this.getHistory().length !== 0)
      return;

    RouteHistoryService.currentUrl = this.router.url;
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const rootRouteUrl = event.url.split('/')[1];
        const isBothSameRootRoute = RouteHistoryService.currentUrl?.includes(rootRouteUrl) === true;
        if (event.url != RouteHistoryService.previousUrl && !(isBothSameRootRoute)) {
          RouteHistoryService.previousUrl = event.url;
          RouteHistoryService.historyRoutes.push(event.url);
        }
        RouteHistoryService.currentUrl = event.url;
      };
    });
  }

  clearHistory() {
    RouteHistoryService.historyRoutes = [];
  }

  getHistory() {
    return RouteHistoryService.historyRoutes;
  }

  getPreviousUrl() {
    return RouteHistoryService.previousUrl;
  }

  getLastHistoryUrl() {
    const history = RouteHistoryService.historyRoutes;
    if (history.length > 2)
      return history[history.length - 2];

    return '/';
  }

  navigateBack() {
    this.router.navigateByUrl(this.getLastHistoryUrl());
    RouteHistoryService.historyRoutes.pop();
  }

  pop() {
    return RouteHistoryService.historyRoutes.pop();
  }

}
