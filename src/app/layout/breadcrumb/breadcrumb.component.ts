import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

export interface BreadcrumbInterface {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements  OnInit {
  breadcrumbs!: BreadcrumbInterface[]
  constructor(
    private readonly router: Router, 
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.create(this.activatedRoute.root);
    })
  }

  create(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbInterface[] = []): BreadcrumbInterface[] {
    
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
  
    const lastRoutePart = path?.split('/').pop() || '';
    const isDynamicRoute = lastRoutePart?.startsWith(':');
    if(isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart?.split(':')[1] || '';
      path = path?.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }
  
    const nextUrl = path ? `${url}/${path}` : url;
  
    const breadcrumb: BreadcrumbInterface = {
        label,
        url: nextUrl,
    };

    const newBreadcrumbs = breadcrumb.label ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs];
    if (route.firstChild) {
        return this.create(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

}
