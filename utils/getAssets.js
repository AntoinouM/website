export default async function (p) {

  const response = await fetch(`/api/images?folder=${p}`);
  const data = await response.json();
  
  return data.files;
}
