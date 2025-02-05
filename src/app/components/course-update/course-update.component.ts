import { CourseService } from './../../services/course.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../services/course.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-course-update',
  standalone: true, // ✅ Required for standalone components
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './course-update.component.html',
  styleUrl: './course-update.component.css'
})
export class CourseUpdateComponent {
  courseForm: FormGroup;
  foundCourse: Course | null = null;
  isEditing = false;

  constructor(private fb: FormBuilder, private courseService: CourseService) {
    this.courseForm = this.fb.group({
      courseId: ['', Validators.required],
      courseTitle: ['', Validators.required],
      courseAuthor: ['', Validators.required],
      courseDuration: ['', Validators.required],
      courseLevel: ['', Validators.required]
    });
  }

  // ✅ Fetch Course by Course ID
  searchCourse() {
    const courseId = this.courseForm.value.courseId;
    this.courseService.getCourseById(courseId).subscribe(
      (course) => {
        this.foundCourse = course;
        this.courseForm.patchValue(course);
        this.isEditing = true;
      },
      (error) => {
        console.error('Course not found', error);
        alert('Course not found!');
        this.foundCourse = null;
        this.isEditing = false;
      }
    );
  }

  // ✅ Update Course
  updateCourse() {
    if (this.foundCourse && this.foundCourse.courseId) { // ✅ Fix: Use courseId
      const updatedCourseData = { ...this.courseForm.value, courseId: this.foundCourse.courseId }; // ✅ Ensure courseId is included

      this.courseService.updateCourse(this.foundCourse.courseId, updatedCourseData).subscribe(
        (updatedCourse: Course) => {
          console.log('Course Updated:', updatedCourse);
          alert('Course updated successfully!');
        },
        (error) => {
          console.error('Error updating course:', error);
        }
      );
    }
  }
}
