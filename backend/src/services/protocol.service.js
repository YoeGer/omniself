import openai from "../config/openai.config.js";

export const getProtocolAdvice = async (
  userQuestion,
  incomingThreadId = null,
) => {
  try {
    const assistantId = process.env.OPENAI_ASSISTANT_ID;

    //OBTENER EL ID DEL HILO
    let finalThreadId;
    if (
      incomingThreadId &&
      incomingThreadId !== "null" &&
      incomingThreadId !== "undefined"
    ) {
      finalThreadId = incomingThreadId;
    } else {
      const threadCreated = await openai.beta.threads.create();
      finalThreadId = threadCreated.id;
    }

    //CREAR MENSAJE
    await openai.beta.threads.messages.create(finalThreadId, {
      role: "user",
      content: userQuestion,
    });

    //CREAR RUN
    const runObject = await openai.beta.threads.runs.create(finalThreadId, {
      assistant_id: assistantId,
    });

    const finalRunId = runObject.id;

    //POLLING (ESPERA) con la nueva firma de la SDK
    let runStatus;

    do {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      runStatus = await openai.beta.threads.runs.retrieve(finalRunId, {
        thread_id: finalThreadId,
      });

    } while (
      ["queued", "in_progress", "cancelling"].includes(runStatus.status)
    );

    //FINALIZACIÓN
    if (runStatus.status !== "completed") {
      throw new Error(`Run falló con estado: ${runStatus.status}`);
    }

    const messagesList = await openai.beta.threads.messages.list(finalThreadId);
    const answer = messagesList.data[0].content[0].text.value;

    return {
      reply: answer,
      threadId: finalThreadId,
    };
  } catch (error) {
    console.error("ERROR FINAL:", error);
    throw error;
  }
};
