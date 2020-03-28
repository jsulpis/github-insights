import {
  bubbleChartXAxesFilter,
  bubbleChartYAxesFilter
} from "./BubbleChartAxesFilters";

describe("BubbleChartAxesFilters", () => {
  describe("X axes filter", () => {
    it("should keep the last value", () => {
      const values = [10, 100, 200, 300];
      expect(bubbleChartXAxesFilter(300, null, values)).toBe(300);
    });

    it("should keep values that start with a 1 or a 3", () => {
      const values = [1, 10, 20, 30, 40, 100, 200];
      expect(bubbleChartXAxesFilter(1, null, values)).toBe(1);
      expect(bubbleChartXAxesFilter(10, null, values)).toBe(10);
      expect(bubbleChartXAxesFilter(20, null, values)).toBeNull();
      expect(bubbleChartXAxesFilter(30, null, values)).toBe(30);
      expect(bubbleChartXAxesFilter(40, null, values)).toBeNull();
      expect(bubbleChartXAxesFilter(100, null, values)).toBe(100);
      expect(bubbleChartXAxesFilter(200, null, values)).toBe(200);
    });
  });

  describe("Y axes filter", () => {
    it("should keep the last value", () => {
      const values = [200, 100, 40, 30, 20, 10, 1];
      expect(bubbleChartYAxesFilter(200, null, values)).toBe(200);
    });

    it("should keep values that start with a 1 or a 3 if highest value <= 300", () => {
      const values = [200, 100, 40, 30, 20, 10, 1];
      expect(bubbleChartYAxesFilter(1, null, values)).toBe(1);
      expect(bubbleChartYAxesFilter(10, null, values)).toBe(10);
      expect(bubbleChartYAxesFilter(20, null, values)).toBeNull();
      expect(bubbleChartYAxesFilter(30, null, values)).toBe(30);
      expect(bubbleChartYAxesFilter(40, null, values)).toBeNull();
      expect(bubbleChartYAxesFilter(100, null, values)).toBe(100);
      expect(bubbleChartYAxesFilter(200, null, values)).toBe(200);
    });

    it("should keep values that start with a 1 if highest value >= 300", () => {
      const values = [300, 200, 100, 40, 30, 20, 10, 1];
      expect(bubbleChartYAxesFilter(1, null, values)).toBe(1);
      expect(bubbleChartYAxesFilter(10, null, values)).toBe(10);
      expect(bubbleChartYAxesFilter(20, null, values)).toBeNull();
      expect(bubbleChartYAxesFilter(30, null, values)).toBeNull();
      expect(bubbleChartYAxesFilter(40, null, values)).toBeNull();
      expect(bubbleChartYAxesFilter(100, null, values)).toBe(100);
      expect(bubbleChartYAxesFilter(200, null, values)).toBeNull();
      expect(bubbleChartYAxesFilter(300, null, values)).toBe(300);
    });
  });
});
