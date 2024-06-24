'use client'
import { useState, useEffect } from "react";
import { Data, data } from "~/lib/data";

interface ReviewData extends Data {
  score: number;
}

export default function HomePage() {
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [sortedData, setSortedData] = useState<ReviewData[]>([]);
  const [json, setJson] = useState<string>('');

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('reviewData') ?? '[]');
    if (storedData && storedData.length > 0) {
      setReviewData(storedData);
    } else {
      console.log('No data found in localStorage');
      setReviewData(data.map((v) => ({ ...v, score: 0 })));
      localStorage.setItem('reviewData', JSON.stringify(data.map((v) => ({ ...v, score: 0 }))));
    }
  }, []);

  useEffect(() => {
    // prevent save if reviweData is empty
    if (reviewData.length <= 0) {
      return;
    }
    localStorage.setItem('reviewData', JSON.stringify(reviewData));
  }, [reviewData]);
 
  const handleScoreChange = (id: number, score: number) => {
    setReviewData((prevData) =>
      prevData.map((data) => (data.id === id? {...data, score } : data))
    );
  };

  const handleSaveToLocalStorage = () => {
    localStorage.setItem('reviewData', JSON.stringify(reviewData));
  }

  const handleSave = () => {
    const sortedData = [...reviewData].sort((a, b) => b.score - a.score);
    // save sorted data into json at '../data/review.json'
    setJson(JSON.stringify(sortedData.map((v) => {
      const { formdata, shortlisted, slot, dep, ...rest } = v;
      return rest;
    }), null, 2));
    setSortedData(sortedData);
  };

  return (
    <div className="mx-auto w-full p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Review Page</h1>
      <ul className="w-full divide-y divide-gray-200">
        {reviewData.map((data, index) => (
          <li key={data.id} className="w-full py-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">{index + 1}. {data.name}</h2>
              <p className="text-gray-600">{data.regno}</p>
            </div>
            <p className="text-gray-600">{data.email}</p>
            <p className="text-gray-600">{data.dep}</p>
            <p className="text-gray-600">{data.slot}</p>
            <p className="text-gray-600">{data.shortlisted? 'Yes' : 'No'}</p>
            <p className="text-gray-600">{data.contact}</p>
            <h3 className="text-lg font-bold mt-4">Form Data:</h3>
            <ul className="list-disc pl-4">
              {Object.keys(data.formdata.questions).map((key) => (
                <li key={key} className="text-gray-600">
                  {key}: {data.formdata.questions[key]}
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-bold mt-4">Common Questions:</h3>
            <ul className="list-disc pl-4">
              {Object.keys(data.formdata.common_questions).map((key) => (
                <li key={key} className="text-gray-600">
                  {key}: {data.formdata.common_questions[key]}
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <p className="text-gray-600">Score: {data.score}</p>
              <input
                type="number"
                value={data.score}
                onChange={(e) => handleScoreChange(data.id, parseInt(e.target.value, 10))}
                className="w-20 pl-2 pr-2 py-1 border border-gray-300 rounded"
              />
            </div>
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSaveToLocalStorage}
      >
        Save to localStorage
      </button>
      {sortedData.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Sorted Data:</h2>
          <ul className="divide-y divide-gray-200">
            {sortedData.map((data) => (
              <li key={data.id} className="py-4">
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold">{data.name}: {data.regno}</h2>
                  <p className="text-gray-600">Score: {data.score}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {json && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">JSON:</h2>
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(json)}`}
            download="review.json"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download JSON
          </a>
        </div>
      )}
    </div>
  );
};
