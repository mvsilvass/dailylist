Feature: Login

  Background:
    Given I am on the login page

  Scenario: Successful login redirects to home
    When I fill the form with valid credentials
    And I click the button
    Then I should be redirected to the home page
