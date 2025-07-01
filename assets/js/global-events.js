// Global event handling and shared functionality
// Global loading state and page switching
import { PAGE_DEPENDENCIES } from '../../config/page-dependencies.js';
import {
  loadDependency,
  unloadDependencies,
  preloadDependency,
  prefetchDependency,
} from '../../utils/dependency-loader.js';
import { ref } from 'vue';

export const loading = ref(false);

export async function setPage(t, pageType) {
  if (t === pageType.value) return;

  const prev = pageType.value;
  pageType.value = t;

  unloadDependencies('template', prev);
  window.dispatchEvent(new CustomEvent(`${prev}:unloaded`));

  const deps = PAGE_DEPENDENCIES[t];
  if (deps) {
    loading.value = true;
    try {
      await Promise.all([
        ...(deps.css || []).map(url =>
          loadDependency('css', url, 'template', t)
        ),
        ...(deps.js || []).map(url => loadDependency('js', url, 'template', t)),
      ]);
      window.dispatchEvent(new CustomEvent(`${t}:loaded`));

      // Preload likely next pages for better performance
      preloadLikelyNextPages(t);
    } finally {
      loading.value = false;
    }
  }
}

// Intelligent preloading based on common navigation patterns
function preloadLikelyNextPages(currentPage) {
  const preloadMap = {
    basic: ['dashboard', 'profile'], // From basic, users often go to dashboard or profile
    dashboard: ['profile', 'basic'], // From dashboard, users often check profile or go back
    profile: ['dashboard', 'basic'], // From profile, users often return to dashboard
  };

  const likelyPages = preloadMap[currentPage] || [];

  likelyPages.forEach(page => {
    const deps = PAGE_DEPENDENCIES[page];
    if (deps) {
      // Use preload for high-priority resources (CSS for immediate rendering)
      (deps.css || []).forEach(url => preloadDependency('css', url));
      // Use prefetch for lower-priority resources (JS for functionality)
      (deps.js || []).forEach(url => prefetchDependency('js', url));
    }
  });
}

// Initialize preloading for common pages on app start
export function initializePreloading() {
  // Preload the most commonly accessed pages
  const commonPages = ['dashboard', 'profile'];

  commonPages.forEach(page => {
    const deps = PAGE_DEPENDENCIES[page];
    if (deps) {
      // Prefetch common pages with lower priority
      (deps.css || []).forEach(url => prefetchDependency('css', url));
      (deps.js || []).forEach(url => prefetchDependency('js', url));
    }
  });
}
