import { Color } from "three";

const changeMaterialColor = (
  object: any,
  color: string,
  showHighlights: boolean
) => {
  if (object && object.isMesh) {
    const newMaterial = object.material.clone();
    if (color === "transparent") {
      newMaterial.opacity = 0;
      newMaterial.transparent = true;
    } else {
      newMaterial.color = new Color(color);
      newMaterial.opacity = showHighlights ? 0.2 : 0.2;
      if (!showHighlights) {
        newMaterial.color = new Color("transparent");
      }
    }

    object.material = newMaterial;
    object.material.needsUpdate = true;
  }
};

export default changeMaterialColor;
