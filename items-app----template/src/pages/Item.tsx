import { useParams } from "react-router-dom";

export default function Item() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center text-emerald-900">
      <h1 className="text-3xl font-bold">Item Page</h1>
      <p className="mt-2 text-emerald-700">
        Viewing item with ID: {id}
      </p>
    </div>
  );
}