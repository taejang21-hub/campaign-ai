"use client";

import { useEffect, useState } from "react";

type Opinion = {
  id: string;
  message: string;
  createdAt: string;
};

export default function AdminPage() {
  const [opinions, setOpinions] = useState<Opinion[]>([]);

  const loadData = async () => {
    const res = await fetch("/api/opinion/list");
    const data = await res.json();
    setOpinions(data.data || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">유권자 의견 목록</h1>

      <button
        onClick={loadData}
        className="mb-4 px-4 py-2 bg-black text-white rounded"
      >
        새로고침
      </button>

      <div className="space-y-3">
        {opinions.map((item) => (
          <div key={item.id} className="border p-4 rounded">
            <p className="mb-2">{item.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}