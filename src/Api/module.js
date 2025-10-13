export async function getAllModules() {
    try {
        const res = await fetch('src/Api/modules.json');
        if (!res.ok) throw new Error('Error al obtener los módulos');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los módulos:', error);
        throw error;
    }
}
