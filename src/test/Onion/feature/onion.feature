@Regression
Feature: ONION Application Login
  As a registered ONION user
  I want to log into the ONION application
  So that I can access the dashboard and use the system features

@Ologin
Scenario: Successful login with valid credentials
When the user enters valid username
When the user enters valid password
When the user clicks on the Login button
Then the user should be navigated to the Dashboard page