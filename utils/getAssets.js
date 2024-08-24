export default async function (p) {

  // Get the base URL from runtime configuration
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;

  // Construct the full URL
  const url = `${baseURL}/api/images?folder=${p}`;

  const response = await fetch(url);
  const data = await response.json();
  
  return data.files;
}
