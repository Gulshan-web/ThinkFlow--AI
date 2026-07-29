const STORAGE_KEY = "thinkflow_ai_mindmap";

/**
 * Save complete mind map
 */

export function saveMindMap(nodes, edges) {
    try {
        const data = {
            nodes,
            edges,
            updatedAt: new Date().toISOString(),
        };

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );

        return true;
    } catch (error) {
        console.error("Error saving mind map:", error);
        return false;
    }
}

/**
 * Load saved mind map
 */

export function loadMindMap() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return null;
        }

        return JSON.parse(data);
    } catch (error) {
        console.error("Error loading mind map:", error);
        return null;
    }
}

/**
 * Remove saved mind map
 */

export function clearMindMap() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error("Error clearing mind map:", error);
        return false;
    }
}

/**
 * Check if saved data exists
 */

export function hasMindMap() {
    return localStorage.getItem(STORAGE_KEY) !== null;
}

/**
 * Get last saved time
 */

export function getLastSaved() {
    const data = loadMindMap();

    if (!data) return null;

    return data.updatedAt;
}