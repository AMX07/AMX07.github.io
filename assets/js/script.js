'use strict';

// Function to toggle element visibility
function toggleElement(element) {
  if (element) {
    element.classList.toggle("active");
  }
}

// Function to add event listener safely
function addSafeEventListener(element, eventType, handler) {
  if (element) {
    element.addEventListener(eventType, handler);
  }
}

// Sidebar functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
addSafeEventListener(sidebarBtn, "click", () => toggleElement(sidebar));

// Testimonials functionality
const modalContainer = document.querySelector("[data-modal-container]");
const overlay = document.querySelector("[data-overlay]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");

function toggleTestimonialsModal() {
  toggleElement(modalContainer);
  toggleElement(overlay);
}

testimonialsItems.forEach(item => {
  addSafeEventListener(item, "click", function () {
    const modalImg = document.querySelector("[data-modal-img]");
    const modalTitle = document.querySelector("[data-modal-title]");
    const modalText = document.querySelector("[data-modal-text]");

    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.textContent = item.querySelector("[data-testimonials-title]").textContent;
    modalText.textContent = item.querySelector("[data-testimonials-text]").textContent;

    toggleTestimonialsModal();
  });
});

addSafeEventListener(modalCloseBtn, "click", toggleTestimonialsModal);
addSafeEventListener(overlay, "click", toggleTestimonialsModal);

// Custom select functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");

addSafeEventListener(select, "click", () => toggleElement(select));

selectItems.forEach(item => {
  addSafeEventListener(item, "click", function () {
    const selectedValue = item.textContent.toLowerCase();
    selectValue.textContent = item.textContent;
    toggleElement(select);
    filterItems(selectedValue);
  });
});

// Filtering functionality
function filterItems(selectedValue) {
  const filterItems = document.querySelectorAll("[data-filter-item]");
  filterItems.forEach(item => {
    if (selectedValue === "all" || item.dataset.category === selectedValue) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Contact form functionality
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  addSafeEventListener(input, "input", function () {
    formBtn.disabled = !form.checkValidity();
  });
});

// Page navigation functionality
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link, index) => {
  addSafeEventListener(link, "click", function () {
    pages.forEach((page, pageIndex) => {
      if (link.textContent.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[pageIndex].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[pageIndex].classList.remove("active");
      }
    });
  });
});