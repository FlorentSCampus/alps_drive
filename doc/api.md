# TWEETER API

|DEF|PARAMS|STRUCTURE|
|-|-|-|
|GET <br> api/x/tweets/:username/:count|<br><br> required ID user <br> required tweets number|<br><a href="#get-tweets">see</a>|
|POST <br> api/x/follow/:username|<br> required ID user|<br>/|
|POST <br> api/x/unfollow/:username|<br> required ID user|<br>/|
|POST <br> api/x/toggleFollow/:username|<br> required ID user|<br>/|

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