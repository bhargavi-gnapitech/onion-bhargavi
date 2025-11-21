# Onion

## Author
- Mohanish Ravula
- `updated on`: 12-Aug-2024

## Overview

**Onion** is a Node.js project that uses Cucumber for behavior-driven development (BDD) testing, along with Playwright for end-to-end testing. The project is set up to generate HTML reports using `cucumber-html-reporter` after running the tests.

## Project Structure

-   **`pages`**: This folder implements the Page Object Model structure. The **Standard** page is the base page where all common functions are declared.
-   **`src`**:
    -   **support**: Contains the **hooks.js** file where common hooks are declared.
    -   **test**: Organized by applications such as Giga Power, Standard, etc. Each application folder contains a `.feature` file that uses Gherkin language, along with a corresponding step file with the same name as the feature file.
-   `generateReport.js`: A script to generate HTML reports from the JSON output of the Cucumber tests.
-   `reports/`: The directory where the test reports are generated and stored.

## Prerequisites

-   **Node.js**: Ensure that you have Node.js installed on your system. The project uses Node.js version 22.x.x.
-   **npm**: Node Package Manager, which comes with Node.js, is required to manage the dependencies.

## Installation

1. **Clone the repository:**
    ```bash
    git clone git@github.com:gnapi-vinoth/onion.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd onion
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```

## Running Tests

You can run the tests using the following command:

````bash
npm  test
``` 

## Generating HTML reports 

```bash
cd onion
node .\generateReport.js
```
