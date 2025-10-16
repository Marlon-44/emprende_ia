export async function getAllModules() {
  try {
    const res = await fetch('/src/Api/modules.json');

    const text = await res.text();
    

    // Intentamos parsear si el content-type es JSON
    if (res.headers.get('content-type')?.includes('application/json')) {
      return JSON.parse(text);
    }
    throw new Error('No se recibió JSON. Revisa la ruta / el servidor.');
  } catch (error) {
    console.error('Error al obtener los módulos (debug):', error);
    throw error;
  }
}
