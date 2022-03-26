import React, { Suspense, useCallback } from 'react'
import ContentHeader, { ContentHeaderLabel } from '../../ux/ContentHeader'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'

const InfiniteScroll = React.lazy(() => import('./InfiniteScroll'))
// const ReactMarkdown = React.lazy(() => import('react-markdown'))

interface ScrollItemData {
  id: number
}

let idSeed = 1;

const generateTestData = () => new Array(5).fill(null).map(() => ({ id: idSeed++ }));

const firstPageData = generateTestData();

const mapItemComponent = (data: unknown) => <div role="listitem">{(data as ScrollItemData).id}</div>;

const InfiniteScrollContainer = () => {

  const initialData: ScrollItemData[] = firstPageData;

  const getMore = useCallback(() => {
    return new Promise<{ data: ScrollItemData[], hasMore: boolean }>((resolve) => {
      const data: ScrollItemData[] = generateTestData();
      setTimeout(() => {
        console.log('InfiniteScrollContainer.loadMore END', data);
        resolve({
          data,
          hasMore: data[0].id < 10 // simple hack to stop data loading after ~50 entries
        });
      }, 500);
    });
  }, []);

  return (
    <>
      <ContentHeader>
        <ContentHeaderLabel>Infinite Scroll</ContentHeaderLabel>
      </ContentHeader>
      <ContentWrapper>
        <Suspense fallback={<Loading />}>
          <div style={{ width: 300, height: 500, overflowY: "scroll" }}>
            <InfiniteScroll
              data={initialData}
              renderData={mapItemComponent}
              onLoadMore={getMore}
            />
          </div>
        </Suspense>
      </ContentWrapper>
    </>
  )
}

//<ReactMarkdown># Hello, *world*!</ReactMarkdown>

export default InfiniteScrollContainer
