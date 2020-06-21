## GraphQL Learning

### What is `GraphQL` ?

* Application layer query language
* Open sourced by Facebook 2015
* Can be used with any type of Database
* ability to ask for exactly what you need and nothing more
* Get multiple resources in a single request.

### Simple Query

<table>
<tr style="text-align: center">
    <td> The Query </td> <td> The Data </td>
</tr>
<tr>
<td> 

```
{
    user(id: "100") {
        name,
        email
    }
}
```
</td>
<td>

```
{
    "user" : {
        "id": "100",
        "name" : "nilanjan deb",
        "email": "nilanjan.dev.1729@gmail.com"
    }
}
```
</td>
</tr>
</table>

### Multiple resources

<table>
<tr style="text-align: center">
    <td> The Query </td> <td> The Data </td>
</tr>
<tr>
<td> 

```
{
    user(id: "100") {
        name,
        email,
        posts{
            title
        }
    }
}
```
</td>
<td>

```
{
    "user" : {
        "id": "100",
        "name" : "nilanjan deb",
        "email": "nilanjan.dev.1729@gmail.com",
        "posts": [
            { "title": "POST 1" },
             { "title": "POST 2" }
        ]
    }
}
```
</td>
</tr>
</table>

### GraphQL Types

* GraphQL APIs are organized in terms of types and fields

<table>
<tr>
<td> 

```
Type Query {
    user: User
}
```
</td>
<td>

```
Type User {
    name: string
    age: Int,
    friends: [User]
}
```
</td>
</tr>
</table>

### GraphiQL Tool

* Graphical interactive GraphQL IDE
* Runs in the browser
* Syntex highlighting
* Error reporting
* Automation & Hinting


### Learning Plan ( v1 )

1. Build the back end server
2. Setup Express With Express-Graphql
3. Create schema file with queries and mutations
4. Implement JSON-Server
5. CRUD Functionality
6. Test with Graphiql