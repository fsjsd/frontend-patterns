# Type-ahead

https://bigfrontend.dev/design/Design-a-Typeahead-Widget

We see Typeahead everywhere, either in Google Search or Twitter Search, when we type something, a suggestion layer gives us the possible result we want.

You are asked to design a Typeahead widget.

This is a vague question, please discuss the scope with your interviewer.

For FrontEnd, UI performance, API performance, Caching, Modularization, Animation & Timing might be the shining point.

Don't forget to estimate the data size both through the network or in local cache.

Your are supposed to mainly talk about FrontEnd, but knowing the server side doesn't harm, so following video might be worth watching

## Design

### Functional Requirements

- Component provides search results based on query user types
- Component appearance can be customised
- Search results can be customised
- Component can work with any data format (static or async)

### Non-functional Requirements

- Network efficient
- Cache results
- Configurable
  - cacheSize
  - filter function
  - result component representation
  - minimum query length
- Work on wide range of devices
- Accessible from keyboard
- Performance optimised

### Component Architecture

- TypeAhead
  - TypeAheadInput
  - TypeAheadResults
    - TypeAheadResult (via render prop)

TypeAhead props

```typescript
interface TypeAheadProps<T> {
  getResults: (query: string) => Promise<T[]>
  minQueryLength: number;
  renderResult: (datum: T) => React.ReactNode
  cacheSize: number
  cacheSlidingExpiryMs: number
}
```

### API Design



### Store Design

Component state

```typescript
interface TypeAheadState<T> {
  query: string
  results: T[]
  cacheSize: number
  resultsCache: FixedMap<string, T[]>
}
```

### Optimization

Network

- debounce user input, respect minQueryLength
- leverage server cache architecture
- leverage browser cache 
- leverage component resultsCache (especially relevant on backspace)
  - clear on timeout

Rendering

- DOM
  - semantic elements
  - Virtualization for search results
  - Update nodes, not insert/delete
  - no layout thrashing
- CSS
  - use animations
  - avoid reflows
  - flat css selectors 
- Perception
  - skeleton
  - loading
  - placeholders

### Accessibility

Keyboard navigation 
  - quick access
  - close
  - Tabable results

Visual Optimisation

- apply rem's
- aria-live on appearance
- aria roles

## References

https://www.youtube.com/watch?v=us0qySiUsGU

UX design guidelines:
https://baymard.com/blog/autocomplete-design
