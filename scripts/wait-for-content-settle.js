const delayMs = 1200;

await new Promise((resolve) => setTimeout(resolve, delayMs));
console.log(`Waited ${delayMs}ms for generated content to settle.`);
