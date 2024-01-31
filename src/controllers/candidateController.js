const pdf = require("pdf-parse");
const { analyzeWithOpenAI } = require("../services/openaiService");

exports.processCandidates = async (req, res, next) => {
  try {
    const empresaDescription = req.body.description;
    const empresaExtra = req.body.empresaExtra;
    const candidateExtras = req.body.candidateExtras
      ? JSON.parse(req.body.candidateExtras)
      : [];
    const candidatesData = [];

    for (let i = 0; i < req.files.length; i++) {
      const pdfData = await pdf(req.files[i].buffer);
      const extraInfo = candidateExtras[i] ? candidateExtras[i] : "";
      candidatesData.push({ text: pdfData.text, extra: extraInfo });
    }

    // Preparar el prompt para ChatGPT
    let prompt = `Act as a candidate evaluation tool for our recruitment platform. In this scenario, I want you to calculate the match percentage between 3 candidates and a company based on the provided information. However, the responses should be concise and direct. For each candidate, provide only the match percentage and a brief conclusion with recommendation. No additional summary is needed at the end. The steps are as follows:\n\n`;
    prompt += `Step 1: Introduction of the company/business model:\n${empresaDescription}\n\n`;
    prompt += `Step 2: Additional information or requirements for the job position:\n${empresaExtra}\n\n`;
    prompt += `Step 3: Upload of 3 candidate resumes:\n`;

    candidatesData.forEach((candidate, index) => {
      const candidateName = candidate.name || `(candidate name)`;
      prompt += `${candidateName}:\n${candidate.text}\n`;
      if (candidate.extra && candidate.extra.trim() !== "") {
        prompt += `Additional information: ${candidate.extra}\n`;
      }
      prompt += "\n";
    });

    prompt += `Step 4: Additional information and observations about the candidates:\n`;
    candidateExtras.forEach((extra, index) => {
      if (extra && extra.trim() !== "") {
        prompt += `Candidate name: ${extra}\n`;
      }
    });

    prompt += `\n\nStep 5: Based on the information provided, calculate the match percentage of each candidate with the company and provide a brief conclusion and recommendation for each. Please limit your response to these elements without adding additional summaries.\n\n`;
    prompt += `Please structure your response as follows:
    {
      "candidate1": {
        "name": "",
        "yearOfExperience": "",
        "matchPercentage": "",
        "conclusion": "",
        "recommendations" : ""
      },
      "candidate2": {
        "name": "",
        "yearOfExperience": "",
        "matchPercentage": "",
        "conclusion": "",
        "recommendations" : ""
      },
      "candidate3": {
        "name": "",
        "yearOfExperience": "",
        "matchPercentage": "",
        "conclusion": "",
        "recommendations" : "",
      }
    }`;
    
    const response = await analyzeWithOpenAI(prompt);

    // Verificar la estructura de la respuesta
    if (
      response &&
      response.choices &&
      response.choices.length > 0 &&
      response.choices[0].message
    ) {
      res
        .status(200)
        .json({ chatGPTResponse: response.choices[0].message.content });
    } else {
      // Manejar respuestas inesperadas
      console.error("Respuesta inesperada de la API de OpenAI:", response);
      res.status(500).json({
        message: "Error al procesar la solicitud",
        error: "Respuesta inesperada de la API",
      });
    }
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({
      message: "Error al procesar la solicitud",
      error: error.message,
    });
  }
};
