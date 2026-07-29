import toast from "react-hot-toast";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

import {
    getNodesBounds,
    getViewportForBounds,
} from "reactflow";


/* ================================================= */
/* EXPORT SETTINGS                                   */
/* ================================================= */

const IMAGE_PADDING = 120;

/*
1 = sharp aur lightweight export

Agar image bahut large ho aur quality chahiye,
to isko 2 kar sakte ho.
*/
const IMAGE_QUALITY = 3;


const wait = (ms) =>
    new Promise((resolve) =>
        setTimeout(resolve, ms)
    );


/* ================================================= */
/* GET REACT FLOW INSTANCE                           */
/* ================================================= */

function getReactFlow() {

    if (!window.reactFlowInstance) {

        console.error(
            "ReactFlow Instance:",
            window.reactFlowInstance
        );

        throw new Error(
            "ReactFlow instance not found."
        );

    }

    return window.reactFlowInstance;

}


/* ================================================= */
/* GET LAYOUTED NODES                                */
/* ================================================= */

function getExportNodes() {

    const nodes =
        window.layoutedNodes || [];

    if (!nodes.length) {

        throw new Error(
            "No nodes available for export."
        );

    }

    return nodes;

}


/* ================================================= */
/* CALCULATE NODE BOUNDS                             */
/* ================================================= */

function calculateBounds() {

    const nodes =
        getExportNodes();

    return getNodesBounds(
        nodes
    );

}


/* ================================================= */
/* CREATE EXPORT VIEWPORT                            */
/* ================================================= */

function createViewport(
    bounds
) {

    const width =

        bounds.width +

        IMAGE_PADDING * 2;


    const height =

        bounds.height +

        IMAGE_PADDING * 2;


    const viewport =

       getViewportForBounds(
        bounds,
        width,
        height,
        0.1,
        2
    );


    return {

        width,

        height,

        x:
            viewport.x,

        y:
            viewport.y,

        zoom:
            viewport.zoom,

    };

}


/* ================================================= */
/* PREPARE CANVAS                                    */
/* ================================================= */

async function prepareCanvas() {

    const rf =
        getReactFlow();


    const wrapper =

        document.querySelector(
            ".react-flow"
        );


    if (!wrapper) {

        throw new Error(
            "ReactFlow wrapper not found."
        );

    }


    const previousViewport =

        rf.getViewport();


    const bounds =

        calculateBounds();


    const exportView =

        createViewport(
            bounds
        );


    /*
    Temporarily fit all nodes
    inside the export area.
    */

    rf.setViewport(

        {

            x:
                exportView.x,

            y:
                exportView.y,

            zoom:
                exportView.zoom,

        },

        {

            duration:
                0,

        }

    );


    /*
    Browser ko React Flow SVG
    render karne ka time do.
    */

    await wait(
        250
    );


    return {

        rf,

        wrapper,

        previousViewport,

        exportView,

    };

}


/* ================================================= */
/* RESTORE ORIGINAL VIEWPORT                         */
/* ================================================= */

function restoreCanvas(

    rf,

    previousViewport

) {

    rf.setViewport(

        previousViewport,

        {

            duration:
                0,

        }

    );

}


/* ================================================= */
/* SAVE ORIGINAL EDGE STYLES                         */
/* ================================================= */

function saveEdgeStyles(
    edgePaths
) {

    return Array.from(
        edgePaths
    ).map((path) => ({

        stroke:
            path.style.stroke,

        strokeWidth:
            path.style.strokeWidth,

        opacity:
            path.style.opacity,

        filter:
            path.style.filter,

        animation:
            path.style.animation,

        transition:
            path.style.transition,

        strokeDasharray:
            path.style.strokeDasharray,

        strokeDashoffset:
            path.style.strokeDashoffset,

        shapeRendering:
            path.style.shapeRendering,

    }));

}


/* ================================================= */
/* MAKE EDGES CLEAN FOR EXPORT                       */
/* ================================================= */

function prepareEdgesForExport(
    edgePaths
) {

    edgePaths.forEach(
        (path) => {

            /*
            Clean cyan edge
            */

            path.style.stroke =
                "#38bdf8";


            path.style.strokeWidth =
                "3";


            path.style.opacity =
                "1";


            /*
            Remove blur
            */

            path.style.filter =
                "none";


            /*
            Stop animation
            */

            path.style.animation =
                "none";


            /*
            Remove transitions
            */

            path.style.transition =
                "none";


            /*
            Convert animated dashed
            edge into a solid line
            */

            path.style.strokeDasharray =
                "none";


            path.style.strokeDashoffset =
                "0";


            /*
            Better SVG rendering
            */

            path.style.shapeRendering =
                "geometricPrecision";

        }
    );

}


/* ================================================= */
/* RESTORE ORIGINAL EDGE STYLES                      */
/* ================================================= */

function restoreEdgeStyles(

    edgePaths,

    edgeStyles

) {

    edgePaths.forEach(

        (path, index) => {

            const oldStyle =

                edgeStyles[
                    index
                ];


            if (!oldStyle) {

                return;

            }


            path.style.stroke =

                oldStyle.stroke;


            path.style.strokeWidth =

                oldStyle.strokeWidth;


            path.style.opacity =

                oldStyle.opacity;


            path.style.filter =

                oldStyle.filter;


            path.style.animation =

                oldStyle.animation;


            path.style.transition =

                oldStyle.transition;


            path.style.strokeDasharray =

                oldStyle.strokeDasharray;


            path.style.strokeDashoffset =

                oldStyle.strokeDashoffset;


            path.style.shapeRendering =

                oldStyle.shapeRendering;

        }

    );

}


/* ================================================= */
/* FILTER EXPORT UI                                  */
/* ================================================= */

function exportFilter(
    node
) {

    /*
    Hide zoom controls
    */

    if (

        node.classList?.contains(

            "react-flow__controls"

        )

    ) {

        return false;

    }


    /*
    Hide minimap
    */

    if (

        node.classList?.contains(

            "react-flow__minimap"

        )

    ) {

        return false;

    }


    /*
    Hide toolbar and panels
    */

    if (

        node.classList?.contains(

            "react-flow__panel"

        )

    ) {

        return false;

    }


    /*
    Hide React Flow attribution
    */

    if (

        node.classList?.contains(

            "react-flow__attribution"

        )

    ) {

        return false;

    }


    return true;

}


/* ================================================= */
/* CAPTURE MIND MAP                                  */
/* ================================================= */

async function captureImage() {

    const {

        rf,

        wrapper,

        previousViewport,

        exportView,

    } = await prepareCanvas();


    /*
    Get all visible edge SVG paths.
    */

    const edgePaths =

        wrapper.querySelectorAll(

            ".react-flow__edge-path"

        );


    /*
    Save current edge styles.
    */

    const edgeStyles =

        saveEdgeStyles(

            edgePaths

        );


    try {

        wrapper.classList.add(
            "thinkflow-exporting"
        );

        /*
        Remove blur and animation
        only while exporting.
        */

        prepareEdgesForExport(

            edgePaths

        );


        /*
        Wait until clean edge styles
        are applied.
        */

        await wait(
            150
        );


        /*
        Capture complete React Flow.
        */

    const dataUrl =
    await htmlToImage.toPng(
        wrapper,
        {
            cacheBust: true,

            /*
            High-quality PNG.
            pixelRatio hi output resolution
            increase karega.
            */

            pixelRatio:
                IMAGE_QUALITY,

            backgroundColor:
                "#020617",

            /*
            Export ke calculated dimensions.
            Isse saare nodes export area
            ke andar rahenge.
            */

            width:
                exportView.width,

            height:
                exportView.height,

            /*
            canvasWidth aur canvasHeight
            intentionally remove kiye hain.

            pixelRatio: 3 already high-resolution
            canvas generate karta hai.
            */

            /*
            Controls, toolbar aur minimap
            export se hide honge.
            */

            filter:
                exportFilter,
        }
    );


        /*
        Return image information.
        */

        return {

            dataUrl,

            width:
                exportView.width,

            height:
                exportView.height,

        };

    }

    finally {

        wrapper.classList.remove(
            "thinkflow-exporting"
        );

        /*
        Restore original edge design.
        */

        restoreEdgeStyles(

            edgePaths,

            edgeStyles

        );


        /*
        Restore user's original
        React Flow position.
        */

        restoreCanvas(

            rf,

            previousViewport

        );

    }

}


/* ================================================= */
/* DOWNLOAD PNG                                      */
/* ================================================= */

export async function exportPNG() {

    try {

        const {

            dataUrl,

        } = await captureImage();


        const link =

            document.createElement(
                "a"
            );


        link.download =

            "ThinkFlowAI.png";


        link.href =

            dataUrl;


        document.body.appendChild(

            link

        );


        link.click();


        document.body.removeChild(link);

        toast.success("PNG Exported");

    }

    catch (err) {

    console.error("PNG Export Error:", err);

    toast.error("Failed to export PNG.");

}

}


/* ================================================= */
/* DOWNLOAD PDF                                      */
/* ================================================= */

export async function exportPDF() {

    try {

        const {

            dataUrl,

            width,

            height,

        } = await captureImage();


        const pdf =

            new jsPDF({

                orientation:

                    width > height

                        ? "landscape"

                        : "portrait",


                unit:
                    "px",


                format:

                    [

                        width,

                        height,

                    ],


                compress:
                    true,

            });


        pdf.addImage(

            dataUrl,

            "PNG",

            0,

            0,

            width,

            height,

            undefined,

            "FAST"

        );


        pdf.save(

            "ThinkFlowAI.pdf"

        );
        toast.success("PDF Exported");

    }

    catch (err) {

    console.error("PDF Export Error:", err);

    toast.error("Failed to export PDF.");

}

}