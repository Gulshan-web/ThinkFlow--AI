/**
 * Generate Unique ID
 */
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Clamp Number
 */
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Random Position
 */
export function randomPosition() {
    return {
        x: Math.floor(Math.random() * 800),
        y: Math.floor(Math.random() * 600),
    };
}

/**
 * Capitalize Text
 */
export function capitalize(text) {
    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Format Date
 */
export function formatDate(date) {
    return new Date(date).toLocaleString();
}