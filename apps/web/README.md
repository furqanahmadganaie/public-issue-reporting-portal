# started frontend after completion of resent password 

 # complete flow 
React

↓

axiosInstance

↓

POST /login

↓

Backend

↓

Returns

Access Token

+

Set-Cookie

↓

Browser stores cookie

↓

Later

↓

POST /refresh

↓

axiosInstance
(withCredentials)

↓

Browser automatically attaches cookie

↓

Backend

req.cookies.refreshToken

↓

New Access Token

# createRoot(...)
React needs one HTML element to render the application

strict mode only for dvelopment   production ignore s it it is like a code inspector  helps to detct unsafe lifecycle method side effects perecated apis 


<QueryClientProvider>  this from react query  every page needs data  with it  everypage will wait tll data gets fetched  
with it  componet react query  axios backend  it manages loading .caching , errors retries refetching 

<BrowserRouter> enbles react router  /login / registory ...
<Toaster />  fot notifications 

 # archetiture 

 Browser

↓

main.jsx

↓

BrowserRouter

↓

QueryClientProvider

↓

App

↓

Pages

↓

Axios

↓

Backend

# flow of req 
Browser

↓

main.jsx

↓

App.jsx

↓

AppRoutes.jsx

↓

Login.jsx

↓

User sees Login Page

backend  /login contrller 
fronentd /login ->login page 


access tokrn 


Login

↓

Backend

↓

Access Token

↓

tokenManager

↓

AuthContext reads it

↓

Axios reads it

↓

Entire App





Login Page

↓

auth.service.login()

↓

Backend

↓

Returns

user

+

accessToken

↓

AuthContext.login()

↓

setAccessToken()

↓

tokenManager

↓

Axios

↓

Authorization Header





User
 │
 ▼
Login.jsx
 │
 ▼
auth.service.js
 │
 ▼
Backend
 │
 ▼
Returns
{
   user,
   accessToken
}
 │
 ▼
AuthContext.login(user, accessToken)
 │
 ├──────────────┐
 ▼              ▼
setUser()    setAccessToken()
 │              │
 ▼              ▼
React State   tokenManager
 │              │
 └──────┬───────┘
        ▼
Entire Application


            AuthContext
           /    |     \
          /     |      \
      Login  Dashboard Profile
Everyone shares the same authentication data.