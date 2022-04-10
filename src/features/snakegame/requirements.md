# Snake Game

## Requirements

- Code a snake game in React
  - Snake will automatically move and can change direction in order to reach an apple
- Game should initialise with randomly placed apple and snake in center screen
- Game should start on any keypress
- Snake should automatically move in default direction (up)
- Snake should change direction on key press up (w), down (s), left (a) and right (d)
- Snake should continue to move at same speed after direction change
- If snake hits edge of game area, game is reset
- If snake hits itself, game is reset
- If snake hits apple, round is won.
- If round is won, score is increased
- After round is won, game is reset for new round
- After round is won, apple is randomly replaced
- After round is won, Snake speed is increased 10%
- After a series of rounds are lost, high score is recorded

## Implementation details

- Straight forward React architecture with all game logic run through useReducer implementation
- Supports three different view implementations (press t to toggle in game):
  - ASCII text
  - HTML elements
  - Canvas drawing
- State design:
  - Assume view implementations can render "grid" reflecting actor (apple, snake) coordinates
  - Relies on single x,y coordinate for fruit location
  - Relies on multi-dimentional array for snake coordinates
  - Could use Linked list for snake, however array structure is easy to manage
  - Collision detections simply needs to enumerate snake coordinates (for 'eat itself' case) or snake head coordinate for apple / boundary collision