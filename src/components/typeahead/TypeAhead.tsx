import React, { useCallback, useEffect } from 'react'

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
  renderResult: (result: T) => React.ReactNode
  wrapperComponent: React.ComponentType
  inputComponent: React.ComponentType<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>
}

const TypeAhead = <T,>({ initialText, getResults, renderResult, ...props }: TypeAheadProps<T>) => {
  const Wrapper = props.wrapperComponent;
  const Input = props.inputComponent;

  const [inputText, setInputText] = React.useState(initialText ?? '');
  const [results, setResults] = React.useState<T[]>([]);

  useEffect(() => {
    if (inputText.length > 0) {
      debounce(async () => {
        const results = await getResults(inputText);
        setResults(results);
      }, 200);
    }
  }, [inputText])

  const handleInputChange = useCallback(
    (e) => {
      setInputText(e.target.value);
    },
    [setInputText],
  );

  return (
    <Wrapper>
      <Input value={inputText} onChange={handleInputChange} />
      {results.length > 0 && <div>
        {results.map((result, i) => <React.Fragment key={i}>{renderResult(result)}</React.Fragment>)}
      </div>}
    </Wrapper>
  )
}

export default TypeAhead