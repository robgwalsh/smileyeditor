import React, { useState } from "react";
import { useAppSelector } from "../../hooks";
import { EditorState } from "../../model/EditorState";
import { LayerState, LayerType } from "../../model/map/MapState";
import { Textures } from "../../model/Textures";

export function TilePicker() {

    const state: EditorState = useAppSelector(state => state.editor);
    const [textureIndex, setTextureIndex] = useState<number>(0);

    if (!state.map)
        return (<></>)

    const activeLayer = getActiveLayer(state);
    if (!activeLayer)
        return (<></>)

    const texture = Textures.getTexture(activeLayer.name);

    if (activeLayer.layer === LayerType.Visual) {
        // TODO: special cases for walk/item/enemy vs visual
        // for visual, scroll through all textures??

        // or maybe always scroll through all textures?? but by default synch to most obvious texture for the layer
    }

    // TODO: buttons to cycle through images in the texture, if there is more than 1
    return (
        <div>
            <div>
                {texture
                    ?
                    <img
                        width={500}
                        style={{ objectFit: "contain" }}
                        src={texture.info.tilesetPaths[textureIndex]}
                    />
                    :
                    <div style={{ width: "500px", height: "500px", border: ".5px solid #efefef" }}>
                        {activeLayer.layer} - no texture!
                    </div>
                }
            </div>
        </div>
    )
}

function getActiveLayer(state: EditorState): LayerState {
    switch (state.activeLayerName) {
        case null:
            return null;
        case state.map.idLayer.name:
            return state.map.idLayer;
        case state.map.variableLayer.name:
            return state.map.variableLayer;
        case state.map.enemyLayer.name:
            return state.map.enemyLayer
        case state.map.itemLayer.name:
            return state.map.itemLayer;
        case state.map.walkLayer:
            return state.map.walkLayer;
        default:
            return state.map.visualLayers.find(l => l.name === state.activeLayerName);
    }
}