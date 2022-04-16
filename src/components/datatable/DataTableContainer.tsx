import React, { Suspense } from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import Loading from '../../ux/Loading'
const DataTable = React.lazy(() => import('./DataTable'))

const DataTableContainer = () => {
  return (
    <ContentContainer
      title="Data Table"
      codeLink="/features/datatable"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <DataTable />
        </div>
      </Suspense>
    </ContentContainer>
  )
}

export default DataTableContainer