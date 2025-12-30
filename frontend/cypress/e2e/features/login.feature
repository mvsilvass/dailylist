Feature: Login

  Background:
    Given the user is on the login page

  Scenario: Successful login with registered user account
    When the user enters a registered email address and password
    And submits the login credentials
    Then the user should be redirected to the home page

  Scenario: Unsuccessful login with unregistered user account
    When the user enters an unregistered email address and password
    And submits the login credentials
    Then an authentication error message should be displayed

  Scenario: Unsuccessful login with wrong password
    When the user enters a registered email address but the wrong password
    And submits the login credentials
    Then an authentication error message should be displayed

  Scenario: Unsuccessful login with invalid email format
    When the user enters an invalid email address format
    And submits the login credentials
    Then a validation error message should be displayed

  Scenario: Unsuccessful login with empty credentials
    When the user does not enter any credentials
    And submits the login credentials
    Then a validation error message should be displayed

