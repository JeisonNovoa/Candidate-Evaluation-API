# Candidate Evaluation API

## Description

This project is a Node.js API designed to evaluate candidates for job positions. It uses the OpenAI API to analyze resumes and provide a match percentage and recommendations.

## Features

- Upload and analysis of resumes in PDF format.
- Integration with the OpenAI API for candidate evaluation.
- Detailed responses with match percentages and recommendations.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- OpenAI API Key

## Installation

Clone the repository and install dependencies:
```
git clone https://github.com/JeisonNovoa/Candidate-Evaluation-API.git 
cd Candidate Evaluation API
npm install
```

## Configuration

Create a .env file in the project root with the following setup:
OPENAI_API_KEY=your_openai_api_key

## Usage

To run the server, use the following command:
npm start
The server will be available at http://localhost:3000.

## Endpoints

- POST /analyze-candidates: Endpoint for analyzing candidates' resumes.
