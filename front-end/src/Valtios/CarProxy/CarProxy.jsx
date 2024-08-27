import { proxy } from "valtio";
export const carProxy = proxy({
  model: null,
  eventListeners: [],
  addEventListener: function (event, callback) {
    this.eventListeners.push({ event, callback });
  },
  init: null,
  
});
