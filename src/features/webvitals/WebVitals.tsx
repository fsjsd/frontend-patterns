import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ToolTip from '../../ux/ToolTip'
import { MetricInfo, registerWebVitalsListeners } from './webVitalsUtils'

const ClsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  > div {
    margin-right: 10px;
    display: flex;
    align-items: center;
    line-height:normal;
  }
`

const MetricRating = styled.div<{ rating?: string }>`
  display: ${props => (props.rating ? 'inline-block' : 'none')};
  color: white;
  border-radius: 10px;
  padding: 7px;
  margin: 0 3px;
  background-color: ${props => {
    switch (props.rating) {
      case 'good':
        return '#2daf2d'
      case 'poor':
        return '#972020'
      case 'ni':
        return '#a86323'
      default:
        return '#aaaaaa'
    }
  }};
`

const mapMetricRating = (rating: string) => {
  switch (rating) {
    case 'good':
      return 'Good'
    case 'poor':
      return 'Poor'
    case 'ni':
      return 'Needs improvement'
    default:
      return 'unknown'
  }
}

// https://web.dev/fid/
// https://web.dev/ttfb/
// https://web.dev/fcp/
// https://web.dev/cls/

const WebVitals = () => {
  const [wvCls, setWvCls] = useState<MetricInfo>()
  const [wvFcp, setWvFcp] = useState<MetricInfo>()
  const [wvFid, setWvFid] = useState<MetricInfo>()
  const [wvLcp, setWvLcp] = useState<MetricInfo>()
  const [wvTtfb, setWvTtfb] = useState<MetricInfo>()

  const [clsTooltipVisible, setClsTooltipVisible] = useState<boolean>(false)
  const [fcpTooltipVisible, setFcpTooltipVisible] = useState<boolean>(false)
  const [fidTooltipVisible, setFidTooltipVisible] = useState<boolean>(false)
  const [lcpTooltipVisible, setLcpTooltipVisible] = useState<boolean>(false)
  const [ttfbTooltipVisible, setTtfbTooltipVisible] = useState<boolean>(false)


  useEffect(() => {
    registerWebVitalsListeners({
      onCls: setWvCls,
      onFcp: setWvFcp,
      onFid: setWvFid,
      onLcp: setWvLcp,
      onTtfb: setWvTtfb,
    })
  }, [])

  return (
    <ClsWrapper>
      {wvLcp && (
        <div
          aria-label='LCP'
          title="Largest Contentful Paint"
          onMouseEnter={() => setLcpTooltipVisible(true)}
          onMouseLeave={() => setLcpTooltipVisible(false)}
        >
          <ToolTip isVisible={lcpTooltipVisible}>
            <b>Largest Contentful Paint.</b>
            <br />
            {mapMetricRating(wvLcp.metric_rating)}. {wvLcp.value / 1000}s
          </ToolTip>
          LCP: <MetricRating rating={wvLcp.metric_rating} />
        </div>
      )}
      {wvFid && (
        <div
          title="First Input Delay"
          aria-label='FID'
          onMouseEnter={() => setFidTooltipVisible(true)}
          onMouseLeave={() => setFidTooltipVisible(false)}>
          <ToolTip isVisible={fidTooltipVisible}>
            <b>First Input Delay.</b>
            <br />
            Not reported if the user never interacts with the page
            <br />
            {mapMetricRating(wvFid.metric_rating)}. {wvFid.value}ms
          </ToolTip>
          FID: <MetricRating rating={wvFid.metric_rating} />
        </div>
      )}
      {wvCls && (
        <div title="Cumulative Layout Shift"
          aria-label='CLS'
          onMouseEnter={() => setClsTooltipVisible(true)}
          onMouseLeave={() => setClsTooltipVisible(false)}>
          <ToolTip isVisible={clsTooltipVisible}>
            <b>Cumulative Layout Shift.</b>
            <br />
            {mapMetricRating(wvCls.metric_rating)}. {wvCls.metric_value?.toFixed(4)} ({wvCls.metric_delta?.toFixed(4)}). time: {wvCls.event_time?.toFixed(4)}
          </ToolTip>
          CLS: <MetricRating rating={wvCls.metric_rating} />
        </div>
      )}
      {wvTtfb && (
        <div title="Time to first byte"
          aria-label='TTFB'
          onMouseEnter={() => setTtfbTooltipVisible(true)}
          onMouseLeave={() => setTtfbTooltipVisible(false)}>
          <ToolTip isVisible={ttfbTooltipVisible}>
            <b>Time to first byte.</b>
            <br />
            {mapMetricRating(wvTtfb.metric_rating)}. {wvTtfb.value}ms
            <br />
            fetch: {wvTtfb.fetch_start?.toFixed(4)}<br />
            domain_lookup: {wvTtfb.domain_lookup_start?.toFixed(2)}<br />
            connect: {wvTtfb.connect_start?.toFixed(2)}<br />
            request:{wvTtfb.request_start?.toFixed(2)}<br />
            response: {wvTtfb.response_start?.toFixed(2)}<br />
            DOM Content loaded: {wvTtfb.domcontent_loaded_start?.toFixed(2)}<br />
            DOM complete:{wvTtfb.dom_complete?.toFixed(2)}<br />
            load start: {wvTtfb.load_start?.toFixed(2)}
          </ToolTip>
          TTFB: <MetricRating rating={wvTtfb.metric_rating} />
        </div>
      )}
      {wvFcp && (
        <div title="First Contentful Paint"
          aria-label='FCP'
          onMouseEnter={() => setFcpTooltipVisible(true)}
          onMouseLeave={() => setFcpTooltipVisible(false)}>
          <ToolTip isVisible={fcpTooltipVisible}>
            <b>First Contentful Paint</b>
            <br />
            {mapMetricRating(wvFcp.metric_rating)}. {wvFcp.value / 1000}s
          </ToolTip>
          FCP: <MetricRating rating={wvFcp.metric_rating} />
        </div>
      )}
    </ClsWrapper>
  )
}

export default WebVitals
