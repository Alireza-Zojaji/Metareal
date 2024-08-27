import { proxy, useSnapshot } from "valtio";
export const soldierProxy = proxy({
  model: null,
  file: null,
  setModel: (file) => {
    soldierProxy.file = file;
    soldierProxy.model = file.scene;
  },
});
