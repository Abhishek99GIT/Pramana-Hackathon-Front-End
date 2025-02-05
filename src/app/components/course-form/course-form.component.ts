import { Component } from '@angular/core';
import { Course, CourseService } from '../../services/course.service';
import { FormBuilder, FormGroup,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-course-form',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent {
  courseForm: FormGroup;

  constructor(private courseService: CourseService, private fb: FormBuilder) {
    // Initialize the form with FormBuilder
    this.courseForm = this.fb.group({
      courseId: ['', Validators.required],
      courseTitle: ['', Validators.required],
      courseAuthor: ['', Validators.required],
      courseDuration: ['', Validators.required],
      courseLevel: ['', Validators.required],
    });
  }

  addCourse(): void {
    if (this.courseForm.valid) {
      this.courseService.addCourse(this.courseForm.value).subscribe(() => {
        alert('Course added successfully!');
        this.courseForm.reset();  // Reset the form after submission
      });
    }
  }
}
