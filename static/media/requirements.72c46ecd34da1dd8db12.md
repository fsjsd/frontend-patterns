# Infinite Scroll

Technical goals of infinite / virtual scroll

- Maintain performance of the device
- Reduce network consumption
  - HTTP1 maxes out at 5 parallel connection
  - HTTP2 100+ but some will still be queued by browser due to OS limits etc
  - Still don't want to retrieve 100 items for a viewport
  - Network usage thrashes device batteries
- Reduce battery consumption
- Improve user experience




## Background reading

https://developer.chrome.com/blog/infinite-scroller/

https://medium.com/@moshe_31114/building-our-recycle-list-solution-in-react-17a21a9605a0

https://evgeniiray.medium.com/infinite-scrolling-in-web-ultimate-guide-b698124b3172
