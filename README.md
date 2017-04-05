# JSON API Blog Example

This api has the following endpoints:

* GET - `/posts` - Get a collection of all posts
* POST - `/posts` - Create a new post
* GET - `/posts/:post_id` - Get a single post based on `:post_id` from the URL
* PATCH - `/posts/:post_id` - Update a single post based on `:post_id` from the URL
* DELETE - `/posts/:post_id` - Delete a post based on `:post_id` from the URL
* GET - `/posts/:post_id/comments` - Get all comments related to the post based on `post_id` from the URL
* POST - `/comments` - Create a new comment (requires a related post to attach to)
* GET - `/comments/:comment_id` - Get a single comment based on `:comment_id` from the URL
* PATCH - `/comments/:comment_id` - Update a single comment based on `:comment_id` from the URL
* DELETE - `/comments/:comment_id` - Delete a comment based on `:comment_id` from the URL

## Example GET `/posts`

Example cURL:

```bash
curl --request GET \
  --url http://localhost:3333/posts
```

Example Response Body:

```json
{
  "links": {
    "self": "/posts"
  },
  "data": [
    {
      "type": "posts",
      "id": 1,
      "attributes": {
        "title": "My First Post",
        "content": "This is a new post"
      },
      "relationships": {
        "comments": {
          "links": {
            "related": "/posts/1/comments"
          }
        }
      }
    },
    {
      "type": "posts",
      "id": 2,
      "attributes": {
        "title": "My Second Post",
        "content": "This is another post from me..."
      },
      "relationships": {
        "comments": {
          "links": {
            "related": "/posts/2/comments"
          }
        }
      }
    },
    {
      "type": "posts",
      "id": 3,
      "attributes": {
        "title": "This is my title",
        "content": "This is my content"
      },
      "relationships": {
        "comments": {
          "links": {
            "related": "/posts/3/comments"
          }
        }
      }
    }
  ]
}
```

## Example POST `/posts`

```bash
curl --request POST \
  --url http://localhost:3333/posts \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --data '{\n	"data": {\n		"type": "post",\n		"attributes": {\n			"title": "My Second Post",\n			"content": "This is another post from me..."\n		}\n	}\n}'
```

Example Request Body:

```json
{
	"data": {
		"type": "post",
		"attributes": {
			"title": "My Second Post",
			"content": "This is another post from me..."
		}
	}
}
```

Example Response Body:

```json
{
  "links": {
    "self": "/posts"
  },
  "data": {
    "type": "posts",
    "id": 4,
    "attributes": {
      "title": "My Second Post",
      "content": "This is another post from me..."
    },
    "relationships": {
      "comments": {
        "links": {
          "related": "/posts/4/comments"
        }
      }
    }
  }
}
```

## Example GET `/posts/:post_id`

Example cURL:

```bash
curl --request GET \
  --url http://localhost:3333/posts/1
```

Example Repsonse Body:

```json
{
  "links": {
    "self": "/posts/1"
  },
  "data": {
    "type": "posts",
    "id": 1,
    "attributes": {
      "title": "My First Post",
      "content": "This is a new post"
    },
    "relationships": {
      "comments": {
        "links": {
          "related": "/posts/1/comments"
        }
      }
    }
  }
}
```

## Example GET `/posts/:post_id/comments`

```bash
curl --request GET \
  --url http://localhost:3333/posts/1/comments
```

Example Repsonse Body:

```json
{
  "links": {
    "self": "/posts/1/comments"
  },
  "data": [
    {
      "type": "comments",
      "id": 1,
      "attributes": {
        "username": "rtablada",
        "content": "This is my first comment"
      },
      "relationships": {
        "post": {
          "links": {
            "related": "/comments/1/post"
          }
        }
      }
    }
  ]
}
```

## Example POST `/comments`

Example cURL Request:

```bash
curl --request POST \
  --url http://localhost:3333/comments \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --data '{\n	"data": {\n		"attributes": {\n			"username":"rtablada",\n			"content":"This is a comment\n"\n		},\n		"relationships": {\n			"post": {\n				"data": {\n					"type": "posts",\n					"id":"1"\n				}\n			}\n		},\n		"type":"comments"\n	}\n}'
```

Example Request Body

```json
{
  "data": {
    "attributes": {
      "username": "rtablada",
      "content": "This is a comment\n"
    },
    "relationships": {
      "post": {
        "data": {
          "type": "posts",
          "id": "1"
        }
      }
    },
    "type": "comments"
  }
}
```

Example Response Body

```json
{
  "links": {
    "self": "/comments"
  },
  "data": {
    "type": "comments",
    "id": 8,
    "attributes": {
      "username": "rtablada",
      "content": "This is a comment\n"
    },
    "relationships": {
      "post": {
        "links": {
          "related": "/comments/8/post"
        }
      }
    }
  }
}
```
