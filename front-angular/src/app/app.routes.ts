import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HelloComponent } from './hello/hello.component';
import { TestFormComponent } from './test-form/test-form.component';

export const routes: Routes = [
  { path: 'test', component: HelloComponent, title: 'Test Page' },
  { path: 'test/form', component: TestFormComponent, title: 'Form' },
  { path: 'test/home', component: HomeComponent, title: 'Home' },
  { path: 'test/about', component: AboutComponent, title: 'About' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
