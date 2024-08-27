export function createCustomLayer({ model, layerId, store }) {
  let customLayer3D = {
    id: layerId,
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map, gl) {
      addModel({ model, layerId, store });
    },
    render: function (gl, matrix) {},
  };
  return customLayer3D;
}
export function addMultiModelCustomLayer({ models, layerId, store }) {
  let customLayerMultiModel3D = {
    id: layerId,
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map, gl) {
      addMultiModels({ models, layerId, store });
    },
    render: function (gl, matrix) {},
  };
  return customLayerMultiModel3D;
}
export function addModel({ model, layerId, store }) {
  let options = {
    type: "gltf",
    obj: model.obj,
    units: "meters",
    scale: model.scale,
    rotation: model.rotation,
    anchor: "center",
  };
  window.tb.loadObj(options, function (modelObj) {
    modelObj.setCoords(model.origin);
    window.tb.add(modelObj, layerId);
    store.getState().setModel(modelObj);
  });
}
export function addMultiModels({ models, layerId, store }) {
  models.forEach((model) => {
    let options = {
      type: "gltf",
      obj: model.obj,
      units: "meters",
      scale: model.scale,
      rotation: model.rotation,
      anchor: "center",
    };
    window.tb.loadObj(options, function (modelObj) {
      modelObj.setCoords(model.origin);
      window.tb.add(modelObj, layerId);
      store.getState().addModel(modelObj);
    });
  });
}
