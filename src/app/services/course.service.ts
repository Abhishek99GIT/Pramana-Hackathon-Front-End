import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


export interface Course {
  id?: string;
  courseId: string;
  courseTitle: string;
  courseAuthor: string;
  courseDuration: string;
  courseLevel: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/api'; // Update if needed

  constructor(private http: HttpClient) {}
  
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/GetCourses`);
  }

  getCourseById(courseId: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/GetCourseByCourseId/${courseId}`);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/PostCourse`, course);
  }

  updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/UpdateCourse/${id}`, course);
  }

  deleteCourse(courseId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteCourse/${courseId}`);
  }

  searchCourse(searchTerm: string):Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/SearchCourses/${searchTerm}`);
  }

}
