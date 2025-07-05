import { Routes } from '@angular/router';
import { ConsultComponent } from './consult/consult.component';

export const routes: Routes = [
    { path: '', component: ConsultComponent },
    { path: '**', redirectTo: '' }
];
