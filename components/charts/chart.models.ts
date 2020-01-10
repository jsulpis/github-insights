export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

export interface ChartProps {
  data: ChartData[];
  unit: string;
}
