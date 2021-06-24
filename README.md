## Phone book code challenge

### Dev usage
1. You will need to import the postgres SQL database dump file `dbexport.pgsql` before proceeding.
2. run `npm i`.
3. run `npm run start:dev`.
4. Import the postman collection for executing a request, available requests are:
    - GET all contacts.
    - POST to add or update a contact.
    - DELETE a contact.
### Production usage
1. run `npm run start`.

### Reasoning behind your technical choices.
- Why postgres: good opportunity to use it.
- Why Jest: because is what I have used.

### Describe any trade-offs you needed to make and your reasoning.
- I stumbed across differents problems with postgres:
- First I had connections issues between windows and ubuntu subsytem.
- Then I implemented the requests only using the client object instead of the pool one and was having problems when executing one query after the other. After using the pool queries were working fine but I had a bug for the delete query were the function get stuck but it still executes.
- 

### Point out anything you might do differently if you had more time.
- Besides adding what is missing: auth and pagination, I would have changed the index to add contacts endpoints into a separated file, added more types that are missing around and some better error management for the existing queries/requests.
- Add a proper logging for request/db errors.

### Your contact details and any public profiles on developer networks like GitHub, BitBucket, Stack Overflow, etc.
- [Github account](https://github.com/emarchiol)
- [Stack Overflow](https://stackoverflow.com/users/2616590/emiliano)
