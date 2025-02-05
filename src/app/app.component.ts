import { Component } from '@angular/core';

import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseListComponent } from './components/course-list/course-list.component';

import { CourseUpdateComponent } from './components/course-update/course-update.component';
import { CourseSearchComponent } from './components/course-search/course-search.component';
import {  RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, CourseSearchComponent, CourseListComponent, CourseFormComponent, CourseUpdateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'courses-frontend';
}
