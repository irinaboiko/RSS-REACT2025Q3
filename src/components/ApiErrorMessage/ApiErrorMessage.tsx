import Image from 'next/image';

export interface ApiErrorMessageProps {
  errorMessage?: string;
}

export default function ApiErrorMessage({
  errorMessage = 'Unknown error occurred',
}: ApiErrorMessageProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <Image
        src="/images/error-r2d2.webp"
        alt="Error"
        width={186}
        height={246}
        className="h-56"
      />
      <h2 className="text-xl font-bold text-red-600">
        Oops! An Error Occurred
      </h2>
      <p>{errorMessage}</p>
      <p>Please, try later</p>
    </div>
  );
}
