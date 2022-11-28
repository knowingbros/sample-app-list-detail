## Setup

```
npm install
```

```
npm start
```

## Issue

When going back to list view from detail view, the list view does not maintain the position of the list. It makes a network request to fetch the list again and then renders the list. This is not the expected behavior. The list should maintain the position.

**Reproduce**

(Watch the video for better understanding)

ISSUE: https://youtu.be/wuJv1LNJOY8

EXPECTED BEHAVIOR: https://youtu.be/5giVYope_ko

- Go to the very last item of the list.
- Click on the last item to go to detail view.
- Click on the back button to go back to list view.
- The list view will not maintain the position. It will make a network request and then render the list.

This is as far as I understand.

## Additional information

The classes to look for are likely named PostList***

Thank you!