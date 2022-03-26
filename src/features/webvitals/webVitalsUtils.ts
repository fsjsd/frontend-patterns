/* eslint-disable @typescript-eslint/no-explicit-any */
/* istanbul ignore file */

import {
  FirstInputPolyfillEntry,
  getCLS,
  getFCP,
  getFID,
  getLCP,
  getTTFB,
  Metric,
  NavigationTimingPolyfillEntry,
} from 'web-vitals'

// adapted from:
// https://github.com/GoogleChromeLabs/web-vitals-report/blob/main/src/js/analytics.js

type WebVitalPerfEntries = (
  | PerformanceEntry
  | FirstInputPolyfillEntry
  | NavigationTimingPolyfillEntry
)[]

interface RegisterWebVitalsListenersProps {
  onCls: (m: MetricInfo) => void
  onFcp: (m: MetricInfo) => void
  onFid: (m: MetricInfo) => void
  onLcp: (m: MetricInfo) => void
  onTtfb: (m: MetricInfo) => void
}

export interface MetricInfo {
  value: number
  event_category: string
  event_label: string
  metric_value: number
  metric_delta: number
  metric_rating: string
  non_interaction: boolean
  debug_target?: string
  debug_event?: string
  debug_timing?: string
  fetch_start?: number
  domain_lookup_start?: number
  connect_start?: number
  request_start?: number
  response_start?: number
}

const thresholds: Record<string, any> = {
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  FID: [100, 300],
  LCP: [2500, 4000],
  TTFB: [800, 1800],
}

function getRating(value: number, thresholdTuple: number[]) {
  if (value > thresholdTuple[1]) {
    return 'poor'
  }
  if (value > thresholdTuple[0]) {
    return 'ni'
  }
  return 'good'
}

function getSelector(node: Element, maxLen = 100) {
  let sel = ''
  try {
    while (node && node.nodeType !== 9) {
      const part = node.id
        ? '#' + node.id
        : node.nodeName.toLowerCase() +
          (node.className && node.className.length
            ? '.' + Array.from(node.classList.values()).join('.')
            : '')
      if (sel.length + part.length > maxLen - 1) return sel || part
      sel = sel ? part + '>' + sel : part
      if (node.id) break
      node = node.parentNode as any
    }
  } catch (err) {
    // Do nothing...
  }
  return sel
}

function getLargestLayoutShiftEntry(entries: any) {
  return entries.reduce((a: any, b: any) => (a && a.value > b.value ? a : b))
}

function getLargestLayoutShiftSource(sources: any) {
  return sources.reduce((a: any, b: any) => {
    return a.node &&
      a.previousRect.width * a.previousRect.height >
        b.previousRect.width * b.previousRect.height
      ? a
      : b
  })
}

function wasFIDBeforeDCL(fidEntry: FirstInputPolyfillEntry) {
  const navEntry = performance.getEntriesByType('navigation')[0] as any
  return navEntry && fidEntry.startTime < navEntry.domContentLoadedEventStart
}

function getDebugInfo(name: string, entries: WebVitalPerfEntries = []) {
  // In some cases there won't be any entries (e.g. if CLS is 0,
  // or for LCP after a bfcache restore), so we have to check first.
  if (entries.length) {
    if (name === 'LCP') {
      const lastEntry = entries[entries.length - 1] as any
      return {
        debug_target: getSelector(lastEntry.element),
        event_time: lastEntry.startTime,
      }
    } else if (name === 'FID') {
      const firstEntry = entries[0] as FirstInputPolyfillEntry
      return {
        debug_target: firstEntry.target ? getSelector(firstEntry.target) : '',
        debug_event: firstEntry.name,
        debug_timing: wasFIDBeforeDCL(firstEntry) ? 'pre_dcl' : 'post_dcl',
        event_time: firstEntry.startTime,
      }
    } else if (name === 'CLS') {
      const largestEntry = getLargestLayoutShiftEntry(entries)
      if (largestEntry && largestEntry.sources && largestEntry.sources.length) {
        const largestSource = getLargestLayoutShiftSource(largestEntry.sources)
        if (largestSource) {
          return {
            debug_target: getSelector(largestSource.node),
            event_time: largestEntry.startTime,
          }
        }
      }
    }
  }
  // Return default/empty params in case there are no entries.
  return {
    debug_target: '(not set)',
  }
}

const mapMetric = (metric: Metric) => {
  const { name, value, delta, id, entries } = metric
  const params: MetricInfo = {
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    event_category: 'Web Vitals',
    event_label: id,
    metric_value: value,
    metric_delta: delta,
    metric_rating: getRating(value, thresholds[name]),
    non_interaction: true,
    ...getDebugInfo(name, entries),
  }

  if (name === 'TTFB' && entries.length) {
    const navEntry = entries[0] as any
    Object.assign(params, {
      fetch_start: navEntry.fetchStart,
      domain_lookup_start: navEntry.domainLookupStart,
      connect_start: navEntry.connectStart,
      request_start: navEntry.requestStart,
      response_start: navEntry.responseStart,
    })
  }

  console.log(`[${name}]`, params)

  return params
}

export const registerWebVitalsListeners = ({
  onCls,
  onFcp,
  onLcp,
  onTtfb,
  onFid,
}: RegisterWebVitalsListenersProps) => {
  getCLS(m => onCls(mapMetric(m)))
  getFCP(m => onFcp(mapMetric(m)))
  getFID(m => onFid(mapMetric(m)))
  getLCP(m => onLcp(mapMetric(m)))
  getTTFB(m => onTtfb(mapMetric(m)))
}
/*
const getWebVitalAsync = async (getWebVitalFn: (onReport: ReportHandler, reportAllChanges?: boolean | undefined) => void) => {
  return new Promise((resolve, reject) => {
    getWebVitalFn((metric) => {
      resolve(handleMetric(metric));
    })  
  });
};

export async function cls() {
  const result = await getWebVitalAsync(getCLS);
  return result;
}

export async function fcp() {
  const result = await getWebVitalAsync(getFCP);
  return result;
}

export async function fid() {
  const result = await getWebVitalAsync(getFID);
  return result;
}

export async function lcp() {
  const result = await getWebVitalAsync(getLCP);
  return result;
}

export async function ttfb() {
  const result = await getWebVitalAsync(getTTFB);
  return result;
}
*/
