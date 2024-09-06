import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  // Get the folder name from the query parameters
  const query = getQuery(event);
  const folderName = query.folder || '';

  // Define the path to the specified folder within the public directory
  const folderPath = path.join(process.cwd(), 'public', folderName);

  try {
    // Read all files in the specified directory
    const files = await fs.readdir(folderPath);

    // Return the array of filenames (without any filtering)
    return { files };
  } catch (error) {
    console.error(`Failed to read files from folder: ${folderName}`, error);
    return { files: [], error: 'Failed to read files' };
  }
});