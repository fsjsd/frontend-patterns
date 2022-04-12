import React, { useCallback, useEffect, useRef } from 'react'
import debounce from '../../utils/debounce';

/**
 * Typeahead props
 */
interface TypeAheadProps<T> {
  /** id for component. Required */
  id: string;
  /** Default search text */
  initialQuery?: string;
  /** Minimum search length to trigger getResults() */
  minimumQueryLength?: number;
  /** React component to wrap whole control, some HTML props will be managed */
  wrapperComponent: React.ComponentType<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
  /** React component for input, can be styled, some HTML props will be managed */
  inputComponent: React.ComponentType<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>;
  /** React component for results wrapper, can be styled, some HTML props will be managed */
  resultsWrapperComponent: React.ComponentType<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
  /** 
   * React Component to render result item. Must accept result item of type T through property datum,, some HTML props will be managed  
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resultComponent: React.ComponentType<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement> & { datum: any | T, query: string }, HTMLDivElement>>;
  /** component to show if no results are returned */
  emptyResultsComponent: React.ComponentType<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
  /** delegate to run lookup function */
  getResults: (query: string) => Promise<T[]>;
  /** delegate to retrieve text node from result datum */
  getResultText?: (datum: T) => string;
  onSelect: (datum: T) => void;
}

/**
 * Typeahead component
 * @param param0 props
 * @returns JSX
 */
const TypeAhead = <T,>({
  id,
  minimumQueryLength,
  initialQuery,
  getResults,
  getResultText,
  onSelect,
  ...props
}: TypeAheadProps<T>) => {
  // React components must be capitalized to use in JSX
  const Wrapper = props.wrapperComponent;
  const Input = props.inputComponent;
  const ResultWrapper = props.resultsWrapperComponent;
  const Result = props.resultComponent;
  const NoResults = props.emptyResultsComponent;

  const inputRef = useRef(null);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = React.useState(initialQuery ?? '');
  const [results, setResults] = React.useState<T[]>([]);
  const [resultsVisible, setResultsVisible] = React.useState(false);
  const [ftu, setFtu] = React.useState(true);
  const [activeResult, setActiveResult] = React.useState<number>();

  // manage focus with window click event listener
  useEffect(() => {
    const hideListener = (e) => {
      // don't hide if click is input or combobox descendant
      if (e.target === inputRef.current || comboboxRef.current?.contains(e.target)) {
        return;
      }
      setResultsVisible(false);
      setActiveResult(-1);
    }
    window.addEventListener('click', hideListener);
    return () => {
      window.removeEventListener('click', hideListener);
    }
  });

  useEffect(() => {
    if (activeResult != -1) {
      document.querySelector(`#ta-${activeResult}`)?.scrollIntoView();
    }
  }, [activeResult])

  // delegate to parent component to get results
  const getResultsDebounced = useCallback(debounce(async (inputText) => {
    if (inputText.length > (minimumQueryLength ?? 2)) {
      try {
        const results = await getResults(inputText);
        setFtu(false);
        setResults(results);
        setResultsVisible(true);
        setActiveResult(-1);
      } catch (e) {
        console.error(e);
      }
    }
  }, 200), [getResults]);

  const handleInputChange = (e) => {
    // update query state immediately
    setQuery(e.target.value);
    // trigger results lookup after debounce
    getResultsDebounced(e.target.value);
  };

  const resultItemText = (datum: T) => {
    if (typeof datum === 'string') {
      return datum;
    } else if (getResultText) {
      // Delegate to parent component to resolve text if not string
      return getResultText(datum);
    } else {
      throw new Error('TypeAhead: result must be string or have getResultText function');
    }
  }

  const handleResultClicked = (datum: T) => {
    setResultsVisible(false);
    // set selected result text to input.
    setQuery(resultItemText(datum));
    onSelect(datum);
  };

  const handleInputFocus = () => {
    setResultsVisible(true);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setResultsVisible(false);
      setActiveResult(-1);
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      setResultsVisible(false);
      setActiveResult(-1);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const resultIndex = (activeResult === undefined)
        ? 0 // first result
        : (activeResult === results.length + 1)
          ? activeResult // last result, stall
          : activeResult + 1; // next result

      setActiveResult(resultIndex);
      setQuery(resultItemText(results[resultIndex]));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const resultIndex = (activeResult === undefined || activeResult === 0)
        ? 0 // first result
        : activeResult - 1; // previous result

      setActiveResult(resultIndex);
      setQuery(resultItemText(results[resultIndex]))
    }
    if (e.key === 'Enter') {
      if (activeResult !== undefined) {
        onSelect(results[activeResult]);
      }
    }

  };

  const expanded = resultsVisible && !ftu;

  return (
    <Wrapper
      ref={comboboxRef}
      role="combobox"
      aria-expanded={expanded}
      aria-owns={`${id}-list`}
      aria-haspopup="listbox"
      onFocus={handleInputFocus}
      onKeyUp={e => handleKeyUp(e)}>
      <Input
        id={id}
        role="textbox"
        ref={inputRef}
        value={query}
        onChange={handleInputChange}
        onBlur={e => e.preventDefault()}
        aria-autocomplete="list"
        aria-controls="typeahead-list"
        aria-activedescendant={activeResult !== undefined ? `${id}-option-${activeResult}` : undefined}
      />
      {expanded && <ResultWrapper
        role="listbox"
        id={`${id}-list`}
      >
        {results.length === 0 && <NoResults />}
        {results.map((result: T, i) => <Result
          role="option"
          id={`${id}-option-${i}`}
          aria-selected={activeResult === i}
          key={i}
          datum={result}
          query={query}
          onClick={() => handleResultClicked(result)}
        />)}
      </ResultWrapper>}
    </Wrapper>
  )
}

export default TypeAhead