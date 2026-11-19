/*
Modèle : "macbook pro M3 16 inch 2024" par jackbaeten
https://sketchfab.com/3d-models/macbook-pro-m3-16-inch-2024-8e34fc2b303144f78490007d91ff57c4
Licence : CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)

Les versions 14" et 16" utilisent le même fichier : seule l'échelle change.
*/
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Color, type Material, type Mesh, type Texture } from "three";
import { noChangeParts } from "@/constants";

export const MACBOOK_MODEL_URL = "/models/macbook.glb";

/** Paires [nœud, matériau] issues de gltfjsx. */
const PARTS = [
  ["Object_10", "PaletteMaterial001"],
  ["Object_16", "zhGRTuGrQoJflBD"],
  ["Object_20", "PaletteMaterial002"],
  ["Object_22", "lmWQsEjxpsebDlK"],
  ["Object_30", "LtEafgAVRolQqRw"],
  ["Object_32", "iyDJFXmHelnMTbD"],
  ["Object_34", "eJObPwhgFzvfaoZ"],
  ["Object_38", "nDsMUuDKliqGFdU"],
  ["Object_42", "CRQixVLpahJzhJc"],
  ["Object_48", "YYwBgwvcyZVOOAA"],
  ["Object_54", "SLGkCohDDelqXBu"],
  ["Object_58", "WnHKXHhScfUbJQi"],
  ["Object_66", "fNHiBfcxHUJCahl"],
  ["Object_74", "LpqXZqhaGCeSzdu"],
  ["Object_82", "gMtYExgrEUqPfln"],
  ["Object_96", "PaletteMaterial003"],
  ["Object_107", "JvMFZolVCdpPqjj"],
  ["Object_127", "ZCDwChwkbBfITSW"],
] as const;

type MaterialName = (typeof PARTS)[number][1];

const SCREEN_NODE = "Object_123";
const ROTATION: [number, number, number] = [Math.PI / 2, 0, 0];

const NO_CHANGE = new Set(noChangeParts);

/** Matériaux teintés par la couleur choisie (au moins un nœud non exclu les utilise). */
const TINTED_MATERIALS = new Set<MaterialName>(
  PARTS.filter(([node]) => !NO_CHANGE.has(node)).map(([, material]) => material),
);

const hasColor = (material: Material): material is Material & { color: Color } =>
  "color" in material && material.color instanceof Color;

type MacbookModelProps = ThreeElements["group"] & {
  color: string;
  screen: Texture;
};

export function MacbookModel({ color, screen, ...props }: MacbookModelProps) {
  const { nodes, materials } = useGLTF(MACBOOK_MODEL_URL);

  // Clone par instance : deux MacBook à l'écran peuvent avoir une opacité différente.
  const instanceMaterials = useMemo(() => {
    const entries = PARTS.map(([, name]) => {
      const source = materials[name];
      if (!source) throw new Error(`Matériau manquant dans le modèle : ${name}`);
      return [name, source.clone()] as const;
    });
    return Object.fromEntries(entries) as Record<MaterialName, Material>;
  }, [materials]);

  useEffect(
    () => () => {
      Object.values(instanceMaterials).forEach((material) => material.dispose());
    },
    [instanceMaterials],
  );

  useEffect(() => {
    TINTED_MATERIALS.forEach((name) => {
      const material = instanceMaterials[name];
      if (hasColor(material)) material.color.set(color);
    });
  }, [color, instanceMaterials]);

  const geometryOf = (node: string) => (nodes[node] as Mesh | undefined)?.geometry;

  return (
    <group {...props} dispose={null}>
      {PARTS.map(([node, material]) => (
        <mesh
          key={node}
          name={node}
          geometry={geometryOf(node)}
          material={instanceMaterials[material]}
          rotation={ROTATION}
        />
      ))}
      <mesh name={SCREEN_NODE} geometry={geometryOf(SCREEN_NODE)} rotation={ROTATION}>
        <meshBasicMaterial map={screen} />
      </mesh>
    </group>
  );
}

useGLTF.preload(MACBOOK_MODEL_URL);
