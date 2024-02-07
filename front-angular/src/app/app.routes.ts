import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HelloComponent } from './hello/hello.component';
import { TestFormComponent } from './test-form/test-form.component';

export const routes: Routes = [
  { path: '', component: HelloComponent, title:"Root" },
  { path: 'form', component: TestFormComponent, title:"Form" },
  { path: 'home', component: HomeComponent, title:"Home" },
  { path: 'about', component: AboutComponent, title:"About" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
