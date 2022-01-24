# PostgreSQL REST API

## Setup and run
  - install npm packages using `npm install`
  - start the docker container using `docker-compose up`
  - in another terminal, run `npm run setup:db` to initialize the postgres relations
  - `npm run test` to run the tests
  - `npm start` to run the server

### Endpoints
  - GET `/pricing-models`
    - returns the default pricing model and all of the pricing models available for the system
  - POST `/pricing-models`
    - creates a new pricing model in the system
  - GET `/pricing-models/:pm-id`
    - get an individual pricing model
  - PUT `/pricing-models/:pm-id`
    - updates an existing pricing model
  - GET `/pricing-models/:pm-id/prices`
    - returns the prices for a specific pricing model
  - POST `/pricing-models/:pm-id/prices`
    - adds a new price for a pricing model
  - DELETE `/pricing-models/:pm-id/prices/:price-id`
    - removes a price configuration from a pricing model
  - PUT `/kiosks/:kiosk-id/prices/:pm-id`
    - sets the pricing model for an individual kiosk to the one from `pm-id`
  - DELETE `/machines/:machine-id/prices/:pm-id`
    - removes the pricing model from the machine (unsets it)
  - GET `/machines/:machine-id/prices`
    - return the pricing model and price configurations set for a given machine