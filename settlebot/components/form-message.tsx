interface Message {
  type: 'error' | 'success';
  text: string;
}

export function FormMessage({ message }: { message: Message }) {
  if (!message) return null;

  return (
    <p className={`mt-4 p-4 text-center ${
      message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
    }`}>
      {message.text}
    </p>
  );
}