# Code Examples

KenyaAPI's [interactive documentation](https://kenya-api.netlify.app/docs.html) provides live, runnable examples in 7 languages for every endpoint. This page gives a quick reference for the most common languages.

## cURL

```bash
curl https://kenya-api.netlify.app/api/v1/counties
```

## JavaScript (fetch)

```javascript
const res = await fetch('https://kenya-api.netlify.app/api/v1/counties');
const data = await res.json();
console.log(data);
```

## JavaScript (axios)

```javascript
import axios from 'axios';

const { data } = await axios.get('https://kenya-api.netlify.app/api/v1/counties');
console.log(data);
```

## Python (requests)

```python
import requests

res = requests.get('https://kenya-api.netlify.app/api/v1/counties')
data = res.json()
print(data)
```

## PHP

```php
<?php
$res  = file_get_contents('https://kenya-api.netlify.app/api/v1/counties');
$data = json_decode($res, true);
print_r($data);
```

## Go

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    resp, _ := http.Get("https://kenya-api.netlify.app/api/v1/counties")
    defer resp.Body.Close()
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println(result)
}
```

## Ruby

```ruby
require 'net/http'
require 'json'

uri  = URI('https://kenya-api.netlify.app/api/v1/counties')
res  = Net::HTTP.get(uri)
data = JSON.parse(res)
puts data
```

## Java (HttpClient)

```java
import java.net.URI;
import java.net.http.*;

var client   = HttpClient.newHttpClient();
var request  = HttpRequest.newBuilder()
    .uri(URI.create("https://kenya-api.netlify.app/api/v1/counties"))
    .build();
var response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

For Go, Ruby, and Java examples for every individual endpoint, visit the [interactive docs](https://kenya-api.netlify.app/docs.html) where each endpoint card has live, runnable code in all 7 languages.

---

[← Home](Home)
