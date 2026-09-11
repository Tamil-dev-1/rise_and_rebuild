import React from "react";

/**
 * Fills its positioned parent with a real photo (object-fit: cover) plus
 * an optional dark lock overlay. Used for the hero banner and each
 * "Continue Your Journey" thumbnail.
 *
 * All default images are free-to-use Unsplash photos (Unsplash License —
 * free for commercial use, no attribution required). Swap `src` for your
 * own photography whenever you have it; nothing else needs to change.
 */
export default function PhotoScene({ src, alt = "", locked = false }) {
  return (
    <div className="photo-scene">
      <img src={src} alt={alt} loading="lazy" />
      {locked && <div className="photo-scene-lock" />}
    </div>
  );
}
