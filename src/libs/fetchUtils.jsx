async function fetchUtils(request) {
  try {
    const responce = await fetch(request);
    return await responce.json();
  } catch (error) {
    return error;
  }
}
export default fetchUtils;
