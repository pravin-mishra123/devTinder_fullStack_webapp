## List of APIs used in devTinder App

### authRouter
- POST /signup
- POST /login
- POST /logout

### profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // forgot password APIs

### connectionRequestRouter
- POST /request/send/:status/:userId
<!-- - POST /request/send/ignored/:userId -->

- POST /request/review/:status/:requestId

### userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform
<!-- Status: ignore, interest, accepted, rejected -->