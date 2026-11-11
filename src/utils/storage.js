import {
  DATA_VERSION,
  SERVICES as defaultServices,
  PROJECTS as defaultProjects,
  TESTIMONIALS as defaultTestimonials,
  PROCESS_STEPS as defaultProcessSteps,
  FAQS as defaultFaqs,
  COMPANY_INFO as defaultCompanyInfo
} from '../data.js';

const STORAGE_KEYS = {
  VERSION: 'codenpixels_data_version',
  SERVICES: 'codenpixels_services_data',
  PROJECTS: 'codenpixels_projects_data',
  TESTIMONIALS: 'codenpixels_testimonials_data',
  CURRENCY: 'codenpixels_currency_pref'
};

// Event name dispatched whenever storage is updated from dashboard
export const STORAGE_UPDATE_EVENT = 'codenpixels_data_updated';

// Auto-sync localStorage when data.js version changes
function autoSyncWithDataVersion() {
  if (typeof window === 'undefined') return;
  try {
    const currentStoredVersion = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (currentStoredVersion !== DATA_VERSION) {
      // data.js has been updated in codebase — refresh localStorage to eliminate inconsistency
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(defaultServices));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(defaultProjects));
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(defaultTestimonials));
      localStorage.setItem(STORAGE_KEYS.VERSION, DATA_VERSION);
    }
  } catch (e) {
    console.warn('Auto-sync version check error:', e);
  }
}
autoSyncWithDataVersion();

function safeGet(key, defaultVal) {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultVal;
    return JSON.parse(item);
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e);
    return defaultVal;
  }
}

function safeSet(key, val) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_EVENT, { detail: { key } }));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

// Services CRUD
export function getStoredServices() {
  return safeGet(STORAGE_KEYS.SERVICES, defaultServices);
}

export function saveStoredServices(services) {
  safeSet(STORAGE_KEYS.SERVICES, services);
}

export function addStoredService(newService) {
  const current = getStoredServices();
  const slug = newService.slug || newService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const item = {
    ...newService,
    id: slug,
    slug: slug,
    features: Array.isArray(newService.features) ? newService.features : (newService.features || '').split('\n').filter(Boolean),
    technologies: Array.isArray(newService.technologies) ? newService.technologies : (newService.technologies || '').split(',').map(s => s.trim()).filter(Boolean),
    benefits: Array.isArray(newService.benefits) ? newService.benefits : (newService.benefits || '').split('\n').filter(Boolean),
    faqs: newService.faqs || []
  };
  const updated = [item, ...current];
  saveStoredServices(updated);
  persistToDataJs().catch(() => {});
  return item;
}

export function updateStoredService(id, updatedService) {
  const current = getStoredServices();
  const index = current.findIndex(s => s.id === id || s.slug === id);
  if (index !== -1) {
    current[index] = { ...current[index], ...updatedService };
    saveStoredServices([...current]);
    persistToDataJs().catch(() => {});
  }
}

export function deleteStoredService(id) {
  const current = getStoredServices();
  const updated = current.filter(s => s.id !== id && s.slug !== id);
  saveStoredServices(updated);
  persistToDataJs().catch(() => {});
}

// Projects CRUD
export function getStoredProjects() {
  return safeGet(STORAGE_KEYS.PROJECTS, defaultProjects);
}

export function saveStoredProjects(projects) {
  safeSet(STORAGE_KEYS.PROJECTS, projects);
}

export function addStoredProject(newProject) {
  const current = getStoredProjects();
  const id = newProject.id || `proj-${Date.now()}`;
  const slug = newProject.slug || newProject.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const item = {
    ...newProject,
    id,
    slug,
    technologies: Array.isArray(newProject.technologies) ? newProject.technologies : (newProject.technologies || '').split(',').map(s => s.trim()).filter(Boolean)
  };
  const updated = [item, ...current];
  saveStoredProjects(updated);
  persistToDataJs().catch(() => {});
  return item;
}

export function updateStoredProject(id, updatedProject) {
  const current = getStoredProjects();
  const index = current.findIndex(p => p.id === id || p.slug === id);
  if (index !== -1) {
    current[index] = { ...current[index], ...updatedProject };
    saveStoredProjects([...current]);
    persistToDataJs().catch(() => {});
  }
}

export function deleteStoredProject(id) {
  const current = getStoredProjects();
  const updated = current.filter(p => p.id !== id && p.slug !== id);
  saveStoredProjects(updated);
  persistToDataJs().catch(() => {});
}

// Testimonials / Client Reviews CRUD
export function getStoredTestimonials() {
  return safeGet(STORAGE_KEYS.TESTIMONIALS, defaultTestimonials);
}

export function saveStoredTestimonials(testimonials) {
  safeSet(STORAGE_KEYS.TESTIMONIALS, testimonials);
}

export function addStoredTestimonial(newTestimonial) {
  const current = getStoredTestimonials();
  const id = newTestimonial.id || `test-${Date.now()}`;
  const item = {
    ...newTestimonial,
    id,
    rating: Number(newTestimonial.rating) || 5,
    verified: true,
    date: newTestimonial.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  };
  const updated = [item, ...current];
  saveStoredTestimonials(updated);
  persistToDataJs().catch(() => {});
  return item;
}

export function updateStoredTestimonial(id, updatedTestimonial) {
  const current = getStoredTestimonials();
  const index = current.findIndex(t => t.id === id);
  if (index !== -1) {
    current[index] = { ...current[index], ...updatedTestimonial };
    saveStoredTestimonials([...current]);
    persistToDataJs().catch(() => {});
  }
}

export function deleteStoredTestimonial(id) {
  const current = getStoredTestimonials();
  const updated = current.filter(t => t.id !== id);
  saveStoredTestimonials(updated);
  persistToDataJs().catch(() => {});
}

// Currency Preference
export function getCurrencyPreference() {
  if (typeof window === 'undefined') return 'USD';
  return localStorage.getItem(STORAGE_KEYS.CURRENCY) || 'USD';
}

export function setCurrencyPreference(curr) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CURRENCY, curr);
  window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_EVENT, { detail: { key: STORAGE_KEYS.CURRENCY } }));
}

export const getStoredCurrency = getCurrencyPreference;
export const setStoredCurrency = setCurrencyPreference;

// Persist directly to src/data.js via Vite serverless dev endpoint
export async function persistToDataJs() {
  const payload = {
    services: getStoredServices(),
    projects: getStoredProjects(),
    testimonials: getStoredTestimonials()
  };

  try {
    const res = await fetch('/api/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const result = await res.json();
      if (result.version && typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.VERSION, result.version);
      }
      return { success: true, message: result.message || 'Saved to src/data.js successfully!' };
    }
    return { success: false, error: `Server responded with status ${res.status}` };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Generate the complete data.js file string
export function generateDataJsContent() {
  const services = getStoredServices();
  const projects = getStoredProjects();
  const testimonials = getStoredTestimonials();
  const version = `v${Date.now()}`;

  return `export const DATA_VERSION = '${version}';

export const SERVICES = ${JSON.stringify(services, null, 2)};

export const PROJECTS = ${JSON.stringify(projects, null, 2)};

export const TESTIMONIALS = ${JSON.stringify(testimonials, null, 2)};

export const PROCESS_STEPS = ${JSON.stringify(defaultProcessSteps, null, 2)};

export const FAQS = ${JSON.stringify(defaultFaqs, null, 2)};

export const COMPANY_INFO = ${JSON.stringify(defaultCompanyInfo, null, 2)};
`;
}

// Download data.js file directly in browser
export function downloadDataJsFile() {
  if (typeof window === 'undefined') return;
  const content = generateDataJsContent();
  const blob = new Blob([content], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Force reload data from default data.js
export function syncFromDataJs() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(defaultServices));
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(defaultProjects));
  localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(defaultTestimonials));
  localStorage.setItem(STORAGE_KEYS.VERSION, DATA_VERSION);
  window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_EVENT, { detail: { action: 'sync_from_codebase' } }));
}

// Export & Import & Reset
export function exportDatabaseJson() {
  const data = {
    services: getStoredServices(),
    projects: getStoredProjects(),
    testimonials: getStoredTestimonials(),
    exportedAt: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
}

export function importDatabaseJson(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.services && Array.isArray(parsed.services)) {
      saveStoredServices(parsed.services);
    }
    if (parsed.projects && Array.isArray(parsed.projects)) {
      saveStoredProjects(parsed.projects);
    }
    if (parsed.testimonials && Array.isArray(parsed.testimonials)) {
      saveStoredTestimonials(parsed.testimonials);
    }
    persistToDataJs().catch(() => {});
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export function resetAllDataToDefaults() {
  syncFromDataJs();
}
