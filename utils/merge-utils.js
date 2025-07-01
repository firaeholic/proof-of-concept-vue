// Utility functions for merging attributes and configurations

export function mergeAttrs(base = {}, override = {}) {
  // Runtime error guards - protect against invalid input types
  if (typeof base !== 'object' || base === null || typeof override !== 'object' || override === null) {
    console.warn('mergeAttrs: base and override must be objects', { base, override });
    return {};
  }
  
  const merged = {};
  const keys = new Set([...Object.keys(base), ...Object.keys(override)]);

  for (const key of keys) {
    const baseVal = base[key];
    const overrideVal = override[key];

    if (key === 'class') {
      // Merge class arrays
      merged[key] = [...(baseVal || []), ...(overrideVal || [])];
    } else if (
      key === 'data-mode' &&
      typeof baseVal === 'string' &&
      typeof overrideVal === 'string' &&
      baseVal !== overrideVal
    ) {
      // Special case: merge ONLY data-mode
      merged[key] = `${baseVal} ${overrideVal}`.trim();
    } else {
      // All other attributes: override wins
      merged[key] = overrideVal !== undefined ? overrideVal : baseVal;
    }
  }

  return merged;
}

export function findAttrs(config, wrapperId) {
  const result = config?.wrappers?.find(w => w.attrs['wrapper-id'] === wrapperId)?.attrs;
  if (!result) {
    console.warn(`Wrapper not found: wrapper-id=${wrapperId}`);
  }
  return result || {};
}

// Merge basic + page-specific attrs for wrapper index
export function mergeWrapper(type, wrapperId, pageType, componentConfig) {
  const basicAttrs = findAttrs(componentConfig[type].basic, wrapperId);
  const pageAttrs = findAttrs(componentConfig[type][pageType], wrapperId);

  const merged = mergeAttrs(basicAttrs, pageAttrs);
  const classList = merged.class;
  delete merged.class;
  delete merged['wrapper-id'];

  return { class: classList, ...merged };
}

// Merge basic + page-specific attrs for field
export function mergeField(type, pageType, componentConfig) {
  const basic = componentConfig[type].basic.field.attrs || {};
  const page = componentConfig[type][pageType]?.field?.attrs || {};

  const merged = mergeAttrs(basic, page);
  const classList = merged.class;
  delete merged.class;

  return { class: classList, ...merged };
}