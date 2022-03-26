import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { InfiniteScrollButton, InfiniteScrollWrapper, Item, Sentinel } from './InfiniteScrollUx'

interface InfiniteScrollProps<T> {
  data: T[]
  renderData: (data: T) => JSX.Element
  onLoadMore: () => Promise<{ data: T[], hasMore: boolean }>
}

const InfiniteScroll = <T,>({ data, renderData, onLoadMore }: InfiniteScrollProps<T>) => {
  const [sentinelObserver, setSentinelObserver] = useState<IntersectionObserver>();
  const [displayedItems, setDisplayedItems] = useState<T[]>(data);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [requestPending, setRequestPending] = useState(false);
  const loadingButtonEl = useRef(null);
  const containerEl = useRef(null);
  const sentinelEl = useRef<HTMLDivElement>(null);

  // setup IntersectionObservers on first run, once ref's are available
  useLayoutEffect(() => {
    if (sentinelEl.current === null || loadingButtonEl.current === null) {
      return;
    }

    // trigger requests for more data when sentinel nears bounds
    const sentinelObserverInstance = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          sentinelEl.current && observer.unobserve(sentinelEl.current);
          console.log('InfiniteScroll.Sentinel.loadMore()');
          handleLoadMore();
        }
      });
    });

    setSentinelObserver(sentinelObserverInstance);

    // append buffered items only when loading button nears bounds
    const listObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0 && entry.intersectionRatio < 1) {
          console.log('InfiniteScroll.LoadingButton.appendBuffer()', { displayedItems });
          // append buffer to UI stack
          //setDisplayedItems([...displayedItems, ...responseBuffer]);
          // clear buffer
          //setResponseBuffer([]);
        }
      });
    }, {
      rootMargin: "0px 0px 200px 0px"
    });

    sentinelObserverInstance.observe(sentinelEl.current);
    listObserver.observe(loadingButtonEl.current);

  }, [sentinelEl, loadingButtonEl]);

  // re=observe sentinel when DOM changed (indicated by displayed item increase)
  useLayoutEffect(() => {
    if (sentinelObserver && sentinelEl.current) {
      console.log('InfiniteScroll.Sentinel.observe()');
      sentinelObserver.observe(sentinelEl.current);
    }
  }, [sentinelObserver, sentinelEl, displayedItems.length]);

  const handleLoadMore = useCallback(async () => {
    if (!hasMoreData) {
      return;
    }
    console.log('InfiniteScroll.handleLoadMore() START', { hasMoreData, requestPending });
    setRequestPending(true);
    const { data, hasMore } = await onLoadMore();
    console.log('InfiniteScroll.handleLoadMore() END', { hasMore, hasMoreData, requestPending, data });

    // Now add to list
    setRequestPending(false);
    setHasMoreData(hasMore);
    // add to buffer but don't change DOM yet
    setDisplayedItems(prev => prev.concat(data));

  }, [onLoadMore, hasMoreData]);

  return (
    <InfiniteScrollWrapper ref={containerEl} role={'list'}>
      <Sentinel ref={sentinelEl} />
      {displayedItems.map((item, index) => <Item key={index}>
        {renderData(item)}
      </Item>)}
      {hasMoreData && <InfiniteScrollButton
        aria-label={'Load more'}
        id="infinite-scroll-button"
        disabled={requestPending}
        ref={loadingButtonEl}
        onClick={() => handleLoadMore()}
      >
        <span className="disabled-text">Loading more items...</span>
        <span className="active-text">Show more</span>
      </InfiniteScrollButton>}
    </InfiniteScrollWrapper>
  )
}

export default InfiniteScroll