The current preloading system in assets/js/global-events.js uses a flat structure defined in config/page-dependencies.js. All pages are preloaded regardless of context, resulting in inefficient resource use.

This plan outlines the implementation of category-aware preloading, enabling targeted resource loading based on user flow (e.g., dashboard, auth, profile).

Implementation Plan
1. Page Dependencies Restructure
Update config/page-dependencies.js to organize dependencies by category:

export const PAGE_DEPENDENCIES = {
  dashboard: {
    analytics: { css: [...], js: [...] },
    reports: { css: [...], js: [...] }
  },
  auth: {
    login: { css: [...], js: [...] },
    signup: { css: [...], js: [...] }
  },
  profile: {
    settings: { css: [...], js: [...] },
    account: { css: [...], js: [...] }
  }
};
Add optional metadata like priority or roles if needed later.

2. Preloading Logic
Update preloadLikelyNextPages() in global-events.js:

Use a category-aware map like:

const categoryPreloadMap = {
  dashboard: ['analytics', 'reports'],
  auth: ['login', 'signup'],
  profile: ['settings', 'account']
};

Implement category detection (based on current route or metadata).
Restrict preloading to same-category or logical transitions (e.g., dashboard → profile allowed, dashboard → auth not).

3. File Structure Cleanup

Organize components and templates into category folders:
components/dashboard/, auth/, profile/
templates/dashboard/, auth/, profile/
Update all related import paths accordingly.

4. Preloading Initialization

Improve initializePreloading():
Detect startup context/category
Enable optional role-based preloading
Configure default behavior for uncategorized routes

5. Optimization & Testing

Add simple logging or analytics to track preloading behavior
Create unit tests for category logic
Monitor performance improvements and bandwidth reduction
Add fallback for uncategorized or misconfigured routes