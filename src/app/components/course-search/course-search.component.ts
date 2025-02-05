import { Component, NgModule } from '@angular/core';
import { Course, CourseService } from '../../services/course.service';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-search',
  imports: [NgIf,NgFor,ReactiveFormsModule],
  templateUrl: './course-search.component.html',
  styleUrl: './course-search.component.css'
})
export class CourseSearchComponent {
  constructor(private courseService: CourseService) {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('', [Validators.required, Validators.minLength(3)]) // Form control with validators
    });
  }
  searchForm: FormGroup;
  courses: Course[] = [];
  loading: boolean = false;
  error: string | null = null;
  
  searchCourses() {
    if (this.searchForm.invalid) {
      return; // Don't proceed if the form is invalid
    }

    this.loading = true;
    this.error = null;

    const searchTerm = this.searchForm.get('searchTerm')?.value;
    
    
    this.courseService.searchCourse(searchTerm).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.error = 'Error searching courses. Please try again later.';
        this.loading = false;
        this.courses = [];
      } 
    })
  }
}
