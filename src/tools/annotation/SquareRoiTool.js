import RectangleRoiTool from './RectangleRoiTool.js';

export default class SquareRoiTool extends RectangleRoiTool {
  constructor(props = {}) {
    super(props);

    this.name = 'SquareRoi';
  }
  handleSelectedCallback(evt, toolData, handle, interactionType = 'mouse') {
    const { element } = evt.detail;
    const toolState = getToolState(element, this.name);
    if (handle.hasBoundingBox) {
      // Use default move handler.
      moveHandleNearImagePoint(evt, this, toolData, handle, interactionType);
      return;
    }
    const config = this.configuration;
    config.dragOrigin = {
      x: handle.x,
      y: handle.y,
    };
    // Iterating over handles of all toolData instances to find the indices of the selected handle
    for (let toolIndex = 0; toolIndex < toolState.data.length; toolIndex++) {
      const points = toolState.data[toolIndex].handles.points;
      for (let p = 0; p < points.length; p++) {
        if (points[p] === handle) {
          config.currentHandle = p;
          config.currentTool = toolIndex;
        }
      }
    }
    this._modifying = true;
    this._activateModify(element);
    // Interupt eventDispatchers
    preventPropagation(evt);
  }

  createNewMeasurement(eventData) {
    const measurementData = super.createNewMeasurement(eventData);

    // Ensure that the width and height are always equal
    const width = Math.abs(measurementData.handles.start.x - measurementData.handles.end.x);
    const height = Math.abs(measurementData.handles.start.y - measurementData.handles.end.y);
    const size = Math.max(width, height);

    measurementData.handles.end.x = measurementData.handles.start.x + size;
    measurementData.handles.end.y = measurementData.handles.start.y + size;

    return measurementData;
  }
}