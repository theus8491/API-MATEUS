async function sendQuestion() {
    const apiKey = document.getElementById("apiKey").value.trim();
    const question = document.getElementById("userInput").value.trim();

    if (!apiKey) {
        document.getElementById("response").innerText = "⚠️ Por favor, insira sua API Key.";
        return;
    }

    if (!question) {
        document.getElementById("response").innerText = "⚠️ Por favor, digite sua pergunta.";
        return;
    }

    document.getElementById("response").innerText = "⌛ Processando...";

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: question }]
                        }
                    ]
                })
            }
        );

        const data = await response.json();
        console.log(data); // Para debug

        document.getElementById("response").innerText =
            data.candidates?.[0]?.content?.parts?.[0]?.text || "❌ Sem resposta da IA.";
    } catch (error) {
        console.error(error);
        document.getElementById("response").innerText =
            "⚠️ Erro ao conectar à API. Verifique sua chave ou conexão.";
    }
}

document.getElementById("sendBtn").addEventListener("click", sendQuestion);