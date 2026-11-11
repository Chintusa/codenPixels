import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { services, projects, testimonials } = data;

    const dataFilePath = path.resolve(process.cwd(), 'src/data.js');

    // Dynamically import current data.js to preserve PROCESS_STEPS, FAQS, COMPANY_INFO
    const currentDataModule = await import(/* @vite-ignore */ `file://${dataFilePath}?t=${Date.now()}`);

    const finalServices = services || currentDataModule.SERVICES || [];
    const finalProjects = projects || currentDataModule.PROJECTS || [];
    const finalTestimonials = testimonials || currentDataModule.TESTIMONIALS || [];
    const finalProcessSteps = currentDataModule.PROCESS_STEPS || [];
    const finalFaqs = currentDataModule.FAQS || [];
    const finalCompanyInfo = currentDataModule.COMPANY_INFO || {};

    const newVersion = `v${Date.now()}`;

    const fileContent = `export const DATA_VERSION = '${newVersion}';

export const SERVICES = ${JSON.stringify(finalServices, null, 2)};

export const PROJECTS = ${JSON.stringify(finalProjects, null, 2)};

export const TESTIMONIALS = ${JSON.stringify(finalTestimonials, null, 2)};

export const PROCESS_STEPS = ${JSON.stringify(finalProcessSteps, null, 2)};

export const FAQS = ${JSON.stringify(finalFaqs, null, 2)};

export const COMPANY_INFO = ${JSON.stringify(finalCompanyInfo, null, 2)};
`;

    await fs.promises.writeFile(dataFilePath, fileContent, 'utf-8');

    return res.status(200).json({
      success: true,
      version: newVersion,
      message: 'src/data.js successfully updated on disk!'
    });
  } catch (error) {
    console.error('Error saving data.js:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to update src/data.js'
    });
  }
}
