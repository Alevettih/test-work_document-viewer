import { Routes } from '@angular/router';
import { NotFoundComponent } from '@features/shell/containers/not-found';
import { RootLayoutComponent } from '@features/shell/containers/shell-layout';

export const routes: Routes = [
  {
    path: '',
    component: RootLayoutComponent,
    children: [
      {
        path: 'documents',
        loadChildren: () => import('@features/documents/common/configs').then((m) => m.routes),
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
      {
        path: '**',
        redirectTo: '/not-found',
      },
    ],
  },
];
