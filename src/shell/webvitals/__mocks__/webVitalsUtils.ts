import { MetricInfo, RegisterWebVitalsListenersProps } from "../webVitalsUtils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { registerWebVitalsListeners: discard, ...originalModule } = jest.requireActual('./webVitalsUtils');

export const registerWebVitalsListeners = ({
  onCls,
  onFcp,
  onLcp,
  onTtfb,
  onFid, }: RegisterWebVitalsListenersProps) => {
  onCls({ value: 1, metric_rating: "good" } as MetricInfo);
  onFcp({ value: 1, metric_rating: "poor" } as MetricInfo);
  onLcp({ value: 1, metric_rating: "poor" } as MetricInfo);
  onTtfb({ value: 1, metric_rating: "ni" } as MetricInfo);
  onFid({ value: 1, metric_rating: "" } as MetricInfo);
}

export default originalModule;