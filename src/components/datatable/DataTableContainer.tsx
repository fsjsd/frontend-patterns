import React, { Suspense } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const DataTable = React.lazy(() => import('./DataTable'))

const DataTableContainer = () => {
  return (
    <ContentWrapper
      title="Data Table"
      codeLink="/features/datatable"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <DataTable />
        </div>
      </Suspense>
    </ContentWrapper>
  )
}

export default DataTableContainer