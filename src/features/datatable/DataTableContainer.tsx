import React, { Suspense } from 'react'
import ContentHeader, { ContentHeaderLabel } from '../../ux/ContentHeader'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const DataTable = React.lazy(() => import('./DataTable'))

const DataTableContainer = () => {
  return (<>
    <ContentHeader>
      <ContentHeaderLabel>Data Table</ContentHeaderLabel>
    </ContentHeader>
    <ContentWrapper>
      <Suspense fallback={<Loading />}>
        <div role="main">
          <DataTable />
        </div>
      </Suspense>
    </ContentWrapper>
  </>
  )
}

export default DataTableContainer