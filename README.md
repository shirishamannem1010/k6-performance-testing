# k6 Load Testing

This repository contains scripts and resources for performance testing using the [k6](https://k6.io/) tool.

## Introduction

[k6](https://k6.io/) is a modern load-testing tool, built on our years of experience in the performance and testing industries. It's designed to be powerful, extensible, and full-featured, with the key goal of providing the best developer experience.

## Features

- **Configurable load generation**: Even lower-end machines can simulate lots of traffic.
- **Tests as code**: Reuse scripts, modularize logic, version control, and integrate tests with your CI.
- **A full-featured API**: The scripting API is packed with features that help you simulate real application traffic.
- **An embedded JavaScript engine**: The performance of Go, the scripting familiarity of JavaScript.
- **Multiple Protocol support**: HTTP, WebSockets, gRPC, and more.
- **Large extension ecosystem**: You can extend k6 to support your needs. Many people have already shared their extensions with the community!
- **Flexible metrics storage and visualization**: Summary statistics or granular metrics, exported to the service of your choice.

## Installation

To get started with k6, follow these steps:

1. **Install k6**:

   You can install k6 using Homebrew on macOS:

   ```sh
   brew install k6

