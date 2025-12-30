Feature: Login

  Background:
    Given the user is on the login page

  Scenario: Successful login with registered user account
    When the user enters a valid email address and password
    And he submits the login credentials
    Then the user should be redirected to the home page

  Scenario: Unsuccessful login with unregistered user account
    When the user enters an unregistered email and password
    And he submits the login credentials
    Then an authentication error message should be displayed

  Scenario: Unsuccessful login with invalid credentials format
    When the user enters invalid email address format
    And he submits the login credentials
    Then a validation error message should be displayed
