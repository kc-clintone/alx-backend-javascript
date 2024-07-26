export default function guardrail(mathFunction) {
  const stack = [];
  try {
    const res = mathFunction();
    stack.push(res);
  } catch (error) {
    stack.push(`Error: ${error.message}`);
  } finally {
    staxk.push('Guardrail was processed');
  }
  return stack;
}
