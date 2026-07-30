import { useState } from "react";
import toast from "react-hot-toast";
import WorkspaceHeader from "../workspace/WorkspaceHeader";
import FlowCanvas from "../workspace/FlowCanvas";
import RightSidebar from "../workspace/RightSidebar";
import FloatingMenu from "../workspace/FloatingMenu";

import AIInput from "../components/AIInput";

import { generateMindMap } from "../services/api";
import { jsonToFlow } from "../utils/jsonToFlow";

import useMindMap from "../hooks/useMindMap";

function Workspace() {

    const [sidebarOpen, setSidebarOpen] =
        useState(true);

    const [loading, setLoading] =
        useState(false);


    /*
    Store se nodes aur loadAIMindMap lo.

    Refresh ke baad localStorage se nodes
    already store me load ho jayenge.
    */

    const {
        nodes,
        loadAIMindMap,
    } = useMindMap();


    /*
    Agar nodes hain:
    → Purana mind map dikhega
    → AIInput nahi dikhega

    Agar nodes empty hain:
    → Generate Mind Map block dikhega
    */

    const generated =
        nodes.length > 0;


    async function handleGenerate(idea) {

        try {

            setLoading(true);


            const data =
                await generateMindMap(
                    idea
                );


        


            const converted =
                jsonToFlow(data);



            /*
            AI mind map store me load hoga.

            Store automatically
            localStorage me save karega.
            */

            loadAIMindMap(

                converted.nodes,

                converted.edges

            );
            toast.success("Mind Map Generated Successfully!");

        }

        catch (err) {

            console.error(err);


            toast.error("Failed to generate mind map.");

        }

        finally {

            setLoading(false);

        }

    }


    return (

        <div
            className="
                flex
                h-screen
                bg-slate-950
                text-white
            "
        >

            <div
                className="
                    flex
                    flex-1
                    flex-col
                "
            >

                <WorkspaceHeader

                    sidebarOpen={
                        sidebarOpen
                    }

                    setSidebarOpen={
                        setSidebarOpen
                    }

                />


                {/*
                Nodes empty:
                Generate Mind Map block

                Nodes available:
                Purana mind map only
                */}

                {!generated && (

                    <AIInput

                        loading={
                            loading
                        }

                        onGenerate={
                            handleGenerate
                        }

                    />

                )}


                <div className="flex-1">

                    <FlowCanvas />

                </div>

            </div>


            {sidebarOpen && (

                <RightSidebar />

            )}


            <FloatingMenu />

        </div>

    );

}

export default Workspace;