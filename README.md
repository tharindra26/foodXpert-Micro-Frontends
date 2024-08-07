# foodXpert Micro Frontends

This repository contains the micro frontends for the foodXpert project. Each micro frontend is created using pnpm and initialized with single-spa.

## Micro Frontends

- **auth**
- **footer**
- **header**
- **home**
- **navbar**
- **products**
- **root-config**
- **utility**

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)

## Installation

To install all required libraries for each micro frontend, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/tharindra26/foodXpert-Micro-Frontends.git
    cd foodXpert-Micro-Frontends
    ```

2. Install the dependencies:

    ```sh
    pnpm install
    ```

3. Navigate to each micro frontend directory and install dependencies:

    ```sh
    cd auth
    pnpm install
    cd ../footer
    pnpm install
    cd ../header
    pnpm install
    cd ../home
    pnpm install
    cd ../navbar
    pnpm install
    cd ../products
    pnpm install
    cd ../root-config
    pnpm install
    cd ../utility
    pnpm install
    ```

## Running the Application

To run each micro frontend, navigate to its directory and use the following command:

```sh
pnpm start
