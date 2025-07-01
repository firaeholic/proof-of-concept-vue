// Dependency loading utilities

// Cache for loaded dependencies to avoid duplicate checks
const loadedDeps = new Set();

export function loadDependency(type, url, scope = 'template', id = '') {
  // Quick cache check first
  const cacheKey = `${type}:${url}:${scope}:${id}`;
  if (loadedDeps.has(cacheKey)) {
    return Promise.resolve();
  }

  // Fallback DOM check for dependencies loaded before cache initialization
  const selector = type === 'css' ? 'link[href]' : 'script[src]';
  const already = [...document.head.querySelectorAll(selector)].some(
    el =>
      ((type === 'css' && el.href === url) ||
        (type === 'js' && el.src === url)) &&
      el.dataset.dependencyType === scope &&
      el.dataset.dependencyId === id
  );
  if (already) {
    loadedDeps.add(cacheKey);
    return Promise.resolve();
  }

  // Add to cache immediately to prevent duplicate requests
  loadedDeps.add(cacheKey);

  return new Promise((resolve, reject) => {
    let el = document.createElement(type === 'css' ? 'link' : 'script');
    if (type === 'css') {
      el.rel = 'stylesheet';
      el.href = url;
    } else {
      el.src = url;
      el.async = true;
    }
    el.dataset.dependencyType = scope;
    el.dataset.dependencyId = id;
    el.onload = resolve;
    el.onerror = err => {
      // Remove from cache on error so it can be retried
      loadedDeps.delete(cacheKey);
      reject(err);
    };
    document.head.appendChild(el);
  });
}

// Batch load multiple dependencies using document fragment for performance
export function loadDependencies(dependencies, scope = 'template', id = '') {
  const fragment = document.createDocumentFragment();
  const promises = [];
  const elementsToAdd = [];
  
  for (const { type, url } of dependencies) {
    const cacheKey = `${type}:${url}:${scope}:${id}`;
    if (loadedDeps.has(cacheKey)) {
      promises.push(Promise.resolve());
      continue;
    }
    
    // Fallback DOM check for dependencies loaded before cache initialization
    const selector = type === 'css' ? 'link[href]' : 'script[src]';
    const already = [...document.head.querySelectorAll(selector)].some(
      el =>
        ((type === 'css' && el.href === url) ||
          (type === 'js' && el.src === url)) &&
        el.dataset.dependencyType === scope &&
        el.dataset.dependencyId === id
    );
    if (already) {
      loadedDeps.add(cacheKey);
      promises.push(Promise.resolve());
      continue;
    }
    
    // Add to cache immediately to prevent duplicate requests
    loadedDeps.add(cacheKey);
    
    const promise = new Promise((resolve, reject) => {
      let el = document.createElement(type === 'css' ? 'link' : 'script');
      if (type === 'css') {
        el.rel = 'stylesheet';
        el.href = url;
      } else {
        el.src = url;
        el.async = true;
      }
      el.dataset.dependencyType = scope;
      el.dataset.dependencyId = id;
      el.onload = resolve;
      el.onerror = err => {
        // Remove from cache on error so it can be retried
        loadedDeps.delete(cacheKey);
        reject(err);
      };
      elementsToAdd.push(el);
      fragment.appendChild(el);
    });
    
    promises.push(promise);
  }
  
  // Append all elements at once using the fragment
  if (elementsToAdd.length > 0) {
    document.head.appendChild(fragment);
  }
  
  return Promise.all(promises);
}

// Preload dependencies for future use
export function preloadDependency(type, url) {
  const cacheKey = `preload:${type}:${url}`;
  if (loadedDeps.has(cacheKey)) {
    return;
  }

  loadedDeps.add(cacheKey);

  const el = document.createElement('link');
  if (type === 'css') {
    el.rel = 'preload';
    el.as = 'style';
  } else {
    el.rel = 'preload';
    el.as = 'script';
  }
  el.href = url;
  el.dataset.dependencyType = 'preload';
  document.head.appendChild(el);
}

// Batch preload multiple dependencies using document fragment for performance
export function preloadDependencies(dependencies) {
  const fragment = document.createDocumentFragment();
  const elementsToAdd = [];
  
  for (const { type, url } of dependencies) {
    const cacheKey = `preload:${type}:${url}`;
    if (loadedDeps.has(cacheKey)) {
      continue;
    }
    
    loadedDeps.add(cacheKey);
    
    const el = document.createElement('link');
    if (type === 'css') {
      el.rel = 'preload';
      el.as = 'style';
    } else {
      el.rel = 'preload';
      el.as = 'script';
    }
    el.href = url;
    el.dataset.dependencyType = 'preload';
    elementsToAdd.push(el);
    fragment.appendChild(el);
  }
  
  if (elementsToAdd.length > 0) {
    document.head.appendChild(fragment);
  }
}

// Prefetch dependencies for likely future use
export function prefetchDependency(type, url) {
  const cacheKey = `prefetch:${type}:${url}`;
  if (loadedDeps.has(cacheKey)) {
    return;
  }

  loadedDeps.add(cacheKey);

  const el = document.createElement('link');
  el.rel = 'prefetch';
  el.href = url;
  el.dataset.dependencyType = 'prefetch';
  document.head.appendChild(el);
}

// Batch prefetch multiple dependencies using document fragment for performance
export function prefetchDependencies(dependencies) {
  const fragment = document.createDocumentFragment();
  const elementsToAdd = [];
  
  for (const { type, url } of dependencies) {
    const cacheKey = `prefetch:${type}:${url}`;
    if (loadedDeps.has(cacheKey)) {
      continue;
    }
    
    loadedDeps.add(cacheKey);
    
    const el = document.createElement('link');
    el.rel = 'prefetch';
    el.href = url;
    el.dataset.dependencyType = 'prefetch';
    elementsToAdd.push(el);
    fragment.appendChild(el);
  }
  
  if (elementsToAdd.length > 0) {
    document.head.appendChild(fragment);
  }
}

export function unloadDependencies(scope = 'template', id = '') {
  document
    .querySelectorAll(
      `[data-dependency-type="${scope}"][data-dependency-id="${id}"]`
    )
    .forEach(el => {
      const type = el.tagName.toLowerCase() === 'link' ? 'css' : 'js';
      const url = el.href || el.src;

      // Remove from cache when unloading
      const cacheKey = `${type}:${url}:${scope}:${id}`;
      loadedDeps.delete(cacheKey);

      // Dispatch unload event so external scripts can clean up
      window.dispatchEvent(
        new CustomEvent(`${id}:${type}:unload`, {
          detail: { type, url, scope, id },
        })
      );

      el.remove();
    });
}

// Clear all cached dependencies (useful for development/testing)
export function clearDependencyCache() {
  loadedDeps.clear();
}

// Get cache status for debugging
export function getDependencyCacheStatus() {
  return {
    size: loadedDeps.size,
    entries: Array.from(loadedDeps),
  };
}
