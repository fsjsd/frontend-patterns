import React, { Suspense, useCallback } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const InfiniteScroll = React.lazy(() => import('./InfiniteScroll'))
//const requirementsMarkDownPromise = import('./requirements.md')
//import mdFile from "./requirements.md";
//console.log(requirementsMarkDown)
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
    <ContentWrapper
      title="Infinite Scroll"
      codeLink="/features/infinitescroll"
      markDownPromise={import('./requirements.md')}
    >
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
  )
}

export default InfiniteScrollContainer
