# TWEETER API

|DEF|PARAMS|STRUCTURE|
|-|-|-|
|GET <br> api/x/{username}/tweets?sort=date&order=desc|<br><br> required ID user <br> required tweets number|<br><a href="#get-tweets">see</a>|
|POST <br> api/x/{username}?follow=0|<br> required ID user|<br>/|
|POST <br> api/x/{username}?unfollow=1|<br> required ID user|<br>/|
|POST <br> api/x/{username}?toggleFollow=0|<br> required ID user|<br>/|

<br>

---

### JSON structure
#### <span id="get-tweets">GET tweets</span>

```
{
  "success": true,
  "tweets": [
    {
      "id": "123",
      "text": "tweet 1",
      "created_at": "2022-04-09T08:30:00Z"
    },
    {
      "id": "456",
      "text": "tweet 2",
      "created_at": "2022-04-10T10:45:00Z"
    },
    {
      "id": "789",
      "text": "tweet 3",
      "created_at": "2022-04-11T12:15:00Z"
    },
    ...
  ]
}
```