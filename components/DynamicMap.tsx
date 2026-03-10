"use client";

import dynamic from "next/dynamic";
import type { MapProps } from "./Map";

const Map = dynamic(() => import("./Map"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center animate-pulse">
            <span className="material-icons text-mosque">map</span>
        </div>
    ),
});

export default function DynamicMap(props: MapProps) {
    return <Map {...props} />;
}
