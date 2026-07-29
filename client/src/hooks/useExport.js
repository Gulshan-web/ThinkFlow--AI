import { exportPNG, exportPDF } from "../services/export";

function useExport() {
    function downloadPNG(element) {
        if (!element) return;

        exportPNG(element);
    }

    function downloadPDF(element) {
        if (!element) return;

        exportPDF(element);
    }

    return {
        downloadPNG,
        downloadPDF,
    };
}

export default useExport;