import React, { useCallback } from 'react'

const debounce = (fn, time) => {
  let timeoutId
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => fn(...args), time)
  }
};
interface TypeAheadProps<T> {
  initialText?: string;
  getResults: (text: string) => Promise<T[]>;
  renderResult: (result: T, num: number, handleClick: (item: T) => void) => React.ReactNode
  wrapperComponent: React.ComponentType
  inputComponent: React.ComponentType<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>
}

const TypeAhead = <T,>({ initialText, getResults, renderResult, ...props }: TypeAheadProps<T>) => {
  const Wrapper = props.wrapperComponent;
  const Input = props.inputComponent;

  const [inputText, setInputText] = React.useState(initialText ?? '');
  const [results, setResults] = React.useState<T[]>([]);
  const [showResults, setShowResults] = React.useState(false);

  const getResultsDebounced = useCallback(debounce(async (inputText) => {
    if (inputText.length > 0) {
      const results = await getResults(inputText);
      setResults(results);
      setShowResults(true);
    }
  }, 200), [getResults]);

  const handleInputChange = useCallback(
    (e) => {
      setInputText(e.target.value);
      getResultsDebounced(e.target.value);
    },
    []
  );

  const handleResultClicked = useCallback((result: T) => {
    console.log(result);
    setShowResults(false);
  }, []);

  return (
    <Wrapper>
      <Input value={inputText} onChange={handleInputChange} />
      {showResults && <div>
        {results.map((result: T, i) => <React.Fragment key={i}>{renderResult(result, i, handleResultClicked)}</React.Fragment>)}
      </div>}
    </Wrapper>
  )
}

export default TypeAhead