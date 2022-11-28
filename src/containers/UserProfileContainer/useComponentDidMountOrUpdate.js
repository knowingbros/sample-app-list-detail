import React from "react";

export function useComponentDidMountOrUpdate(effect, deps) {
    const prev = React.useRef(deps)

    React.useEffect(
        () => {
            const unmountHandler = effect(prev.current)
            prev.current = deps
            return unmountHandler
        },
        deps
    )
}