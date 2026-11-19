import { lazy } from "react";
import clsx from "clsx";
import { MACBOOK_COLORS, MACBOOK_SIZES } from "@/constants";
import useMacbookStore from "@/store/macbookStore";
import { SceneFrame } from "./three/SceneFrame";

const ProductScene = lazy(() => import("./three/ProductScene"));

const ProductViewer = () => {
  const color = useMacbookStore((s) => s.color);
  const size = useMacbookStore((s) => s.size);
  const setColor = useMacbookStore((s) => s.setColor);
  const setSize = useMacbookStore((s) => s.setSize);

  const colorLabel = MACBOOK_COLORS.find((c) => c.value === color)?.label ?? "";

  return (
    <section id="product-viewer" aria-labelledby="product-viewer-title">
      <h2 id="product-viewer-title" className="flex-center mt-8">
        Explore the MacBook Pro
      </h2>

      <div className="controls">
        <p className="info">MacBook Pro available in two sizes, 14-inch and 16-inch.</p>

        <div className="flex-center gap-5 mt-5">
          <div className="color-control" role="group" aria-label="Color">
            {MACBOOK_COLORS.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-label={option.label}
                aria-pressed={color === option.value}
                onClick={() => setColor(option.value)}
                className={clsx(option.swatch, color === option.value && "active")}
              />
            ))}
          </div>

          <div className="size-control" role="group" aria-label="Size">
            {MACBOOK_SIZES.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-label={`${option.value}-inch`}
                aria-pressed={size === option.value}
                onClick={() => setSize(option.value)}
                className={clsx(
                  size === option.value ? "bg-white text-black" : "bg-transparent text-white",
                )}
              >
                <span aria-hidden="true">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <SceneFrame
        id="canvas"
        label={`3D model of the ${size}-inch MacBook Pro in ${colorLabel}. Drag to rotate.`}
      >
        {(active) => <ProductScene active={active} />}
      </SceneFrame>
    </section>
  );
};

export default ProductViewer;
