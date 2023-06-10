import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { APPWRITE } from '../helpers/appwrite';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  template: `
    <header class="bg-white dark:bg-gray-900">
      <nav
        class="container mx-auto p-6 lg:flex lg:items-center lg:justify-between"
      >
        <div class="flex items-center justify-between">
          <div>
            <a
              class="text-2xl font-bold text-gray-800 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-3xl"
              href="#"
              >AudioSum</a
            >
          </div>

          <!-- Mobile menu button -->
          <div class="flex lg:hidden">
            <button
              (click)="isOpen = !isOpen"
              type="button"
              class="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg
                *ngIf="!isOpen"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 8h16M4 16h16"
                />
              </svg>

              <svg
                *ngIf="isOpen"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <div
          [class]="
            isOpen
              ? 'translate-x-0 opacity-100 '
              : 'opacity-0 -translate-x-full'
          "
          class="absolute inset-x-0 z-20 w-full bg-white px-6 py-4 shadow-md transition-all duration-300 ease-in-out dark:bg-gray-900 lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:dark:bg-transparent"
        >
          <div class="flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:space-y-0">
            <a
              class="text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 lg:mx-6"
              href="#"
              >Transcribe</a
            >
            <div
              class="text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 lg:mx-6"
            >
              Logout
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  router = inject(Router);
  toastr = inject(ToastrService);

  isOpen = false;
  logout() {
    APPWRITE.account
      .deleteSession('current')
      .then(() => this.router.navigate(['/login']))
      .catch(() => {
        this.toastr.error('An error occured while loggong out');
      });
  }
}
