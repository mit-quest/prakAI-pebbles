# prakAI-pebbles Source Code

## file structure

- src
  - index.js - first thing to load
  - scripts
    - mainProcess.js - runs once after index.js
    - preload.js - runs before every new page load
  - css
    - bootstrap - standard download of bootstrap CSS for grid layout
    - main.css - used on every page
  - screens - each has a pre.js, index.html, and post.js
    - config - load screen for setting parameters
    - start - patient instructions
    - experiment - sequence of stimuli
    - results - display results
