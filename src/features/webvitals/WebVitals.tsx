import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Metric } from 'web-vitals';
import { MetricInfo, registerWebVitalsListeners } from './webVitalsUtils';

const ClsWrapper = styled.div`
  display:flex;
  flex-direction:row;
  > div {
    margin-right:10px;
  }
`

const MetricRating = styled.div<{ rating?: string }>`
  display:${props => props.rating ? 'inline-block' : 'none'};
  color:white;
  border-radius:3px;
  padding:2px 4px;
  margin:0 3px;
  background-color:${props => {
    switch (props.rating) {
      case 'good':
        return '#2daf2d';
      case 'poor':
        return '#972020';
      default:
        return '#aaaaaa';
    }
  }};
`;

const WebVitals = () => {
  const [wvCls, setWvCls] = useState<MetricInfo>();
  const [wvFcp, setWvFcp] = useState<MetricInfo>();
  const [wvFid, setWvFid] = useState<MetricInfo>();
  const [wvLcp, setWvLcp] = useState<MetricInfo>();
  const [wvTtfb, setWvTtfb] = useState<MetricInfo>();

  useEffect(() => {
    registerWebVitalsListeners({
      onCls: setWvCls,
      onFcp: setWvFcp,
      onFid: setWvFid,
      onLcp: setWvLcp,
      onTtfb: setWvTtfb,
    })
  }, []);

  return (
    <ClsWrapper>
      {wvLcp && <div title="Largest Contentful Paint">
        LCP:
        <MetricRating rating={wvLcp.metric_rating}>{wvLcp.metric_rating}</MetricRating>
        ({wvLcp.value})
      </div>}
      {wvFid && <div title="First Input Delay. Not reported if the user never interacts with the page">
        FID:
        <MetricRating rating={wvFid.metric_rating}>{wvFid.metric_rating}</MetricRating>
      </div>}
      {wvCls && <div title="Cumulative Layout Shift">CLS:
        <MetricRating rating={wvCls.metric_rating}>{wvCls.metric_rating}</MetricRating>  ({wvCls.value})</div>}
      {wvTtfb && <div title="Time to first byte">TTFB:
        <MetricRating rating={wvTtfb.metric_rating}>{wvTtfb.metric_rating}</MetricRating> </div>}
      {wvFcp && <div title="First Contentful Paint">FCP:
        <MetricRating rating={wvFcp.metric_rating}>{wvFcp.metric_rating}</MetricRating> </div>}
    </ClsWrapper>
  )
}

export default WebVitals