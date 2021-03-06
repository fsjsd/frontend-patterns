import React, { useCallback } from 'react'
import styled from 'styled-components';

import { TypeAheadResultsWrapper, TypeAheadResultItem, TypeAheadWrapper, NoResults } from './TypeAheadStyles'
import TypeAhead from './TypeAhead';
import InputText from '../../ux/designsystem/InputText';
import Label from '../../ux/designsystem/Label';
import FieldSet from '../../ux/designsystem/FieldSet';
import Legend from '../../ux/designsystem/Legend';

/**
 * UniversitySearchResult, based on types from the University Search API
 */
interface UniversitySearchResult {
  alpha_two_code: string;
  country: string;
  domains: string[];
  name: string;
  ["state-province"]: string | null;
  web_pages: string[];
}

const UniversitySearchInput = styled(InputText).attrs(() => ({
  placeholder: 'Search...'
}))``; // no styles here, just using attrs() to preset placeholder prop

/**
 * Results item for UniversitySearchResult display
 * @param param0 props
 * @returns JSX
 */
const UniversityResultItem = ({ datum, query, ...props }: { datum: UniversitySearchResult, query: string }) => {

  const queryLocation = datum.name.toLowerCase().indexOf(query.toLowerCase());
  if (queryLocation !== -1) {
    const startText = datum.name.slice(0, queryLocation);
    const queryText = datum.name.slice(queryLocation, query.length + queryLocation);
    const endText = datum.name.slice(query.length + queryLocation);
    return <TypeAheadResultItem {...props}><b>{startText}</b>{queryText}<b>{endText}</b></TypeAheadResultItem>
  }

  return <TypeAheadResultItem {...props}>{datum.name}</TypeAheadResultItem>
}

const DemoUniversitySearch = ({
  onSelect,
  onError
}: {
  onSelect?: (item: UniversitySearchResult) => void,
  onError?: (error: unknown) => void
}) => {
  // straight forward fetch for University Search
  const handleGetResults = useCallback((query: string) => {
    return new Promise<UniversitySearchResult[]>((resolve) => {
      (async () => {
        const response = await fetch(`http://universities.hipolabs.com/search?name=${query}&country=australia`)
        const data = await response.json();
        resolve(data);
      })();
    })
  }, []);

  const handleOnSelect = (item: UniversitySearchResult) => {
    onSelect && onSelect(item);
  };

  return (
    <FieldSet>
      <Label htmlFor="university-search">Search Australian Universities</Label>
      <TypeAhead
        id="university-search"
        wrapperComponent={TypeAheadWrapper}
        inputComponent={UniversitySearchInput}
        emptyResultsComponent={NoResults}
        resultsWrapperComponent={TypeAheadResultsWrapper}
        resultComponent={UniversityResultItem}
        getResults={handleGetResults}
        getResultText={(datum) => (datum as UniversitySearchResult).name}
        onSelect={handleOnSelect}
        onError={onError}
      />
      <Legend>Run code on local to bypass hipolabs.com CORS policy</Legend>
    </FieldSet>
  )
}

export default DemoUniversitySearch