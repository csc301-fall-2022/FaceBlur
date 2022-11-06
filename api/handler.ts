export async function hello(event: any) {
  return {
    message: 'Go Serverless v3! Your function executed successfully!',
    input: event,
  };
}