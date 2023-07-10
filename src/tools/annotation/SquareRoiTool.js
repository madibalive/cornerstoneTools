import RectangleRoiTool from './RectangleRoiTool.js';

export default class SquareRoiTool extends RectangleRoiTool {
  constructor(props = {}) {
    super(props);

    this.name = 'SquareRoi';
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