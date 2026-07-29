import html2canvas from "html2canvas";

import jsPDF from "jspdf";

export async function exportPNG(element) {
    const canvas = await html2canvas(element);

    const link = document.createElement("a");

    link.download = "thinkflow.png";

    link.href = canvas.toDataURL();

    link.click();
}

export async function exportPDF(element) {
    const canvas = await html2canvas(element);

    const image = canvas.toDataURL("image/png");

    const pdf = new jsPDF(
        "landscape",
        "px",
        [
            canvas.width,
            canvas.height,
        ]
    );

    pdf.addImage(
        image,
        "PNG",
        0,
        0,
        canvas.width,
        canvas.height
    );

    pdf.save("thinkflow.pdf");
}