import { Component } from '@angular/core';
import { Course, CourseService } from '../../services/course.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-course-list',
  imports: [NgFor,NgIf],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  courses: Course[] = [];
  displayedCourses: Course[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
      this.calculateTotalPages();
      this.updateDisplayedCourses();
    });
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.courses.length / this.itemsPerPage);
    this.pages = Array.from(Array(this.totalPages), (_, i) => i + 1);
  }

  updateDisplayedCourses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedCourses = this.courses.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedCourses();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedCourses();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedCourses();
    }
  }

  deleteCourse(courseId: string): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseId).subscribe(() => {
        this.loadCourses();
      });
    }
  }
}
