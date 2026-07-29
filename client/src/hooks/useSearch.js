import { useMemo, useState } from "react";

function useSearch(nodes) {
    const [query, setQuery] = useState("");

    const filteredNodes = useMemo(() => {
        if (!query.trim()) {
            return nodes;
        }

        return nodes.filter((node) => {
            const label = node.data?.label || "";

            return label
                .toLowerCase()
                .includes(query.toLowerCase());
        });
    }, [nodes, query]);

    function clearSearch() {
        setQuery("");
    }

    return {
        query,
        setQuery,
        filteredNodes,
        clearSearch,
    };
}

export default useSearch;