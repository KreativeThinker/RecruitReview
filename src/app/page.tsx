// "use client";
// import { useState, useEffect } from "react";
// import { Data } from "~/lib/data";
// import { createClient } from "@supabase/supabase-js";
//
// const supabase = createClient(
//   "https://twvyrbcvrsbsaxjymrcr.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3dnlyYmN2cnNic2F4anltcmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NTQwMDUsImV4cCI6MjAzMzQzMDAwNX0.PE2jnWmWTeNvwQQSDXrI3ERPkrIVYVIBoR5nqopZefY",
// );
//
// interface ReviewData extends Data {}
// // let data: Data;
//
// export default function HomePage() {
//   const [reviewData, setReviewData] = useState<ReviewData[]>([]);
//   const [sortedData, setSortedData] = useState<ReviewData[]>([]);
//   const [json, setJson] = useState<string>("");
//   useEffect(() => {
//     getData("management");
//   }, []);
//
//   async function getData(dep: string) {
//     const { data } = await supabase
//       .from("countries")
//       .select("*")
//       .eq("dep", dep);
//   }
//
//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem("reviewData") ?? "[]");
//     if (storedData && storedData.length > 0) {
//       setReviewData(storedData);
//     } else {
//       console.log("No data found in localStorage");
//       // setReviewData(data.map((v) => ({ ...v, score: 0 })));
//       localStorage.setItem(
//         "reviewData",
//         JSON.stringify(data.map((v) => ({ ...v }))),
//       );
//     }
//   }, []);
//
//   useEffect(() => {
//     // prevent save if reviweData is empty
//     if (reviewData.length <= 0) {
//       return;
//     }
//     localStorage.setItem("reviewData", JSON.stringify(reviewData));
//   }, [reviewData]);
//
//   // const handleScoreChange = (id: number, score: number) => {
//   //   setReviewData((prevData) =>
//   //     prevData.map((data) => (data.id === id ? { ...data, score } : data)),
//   //   );
//   // };
//
//   const handleScoreChange = (id: number, shortlisted: boolean) => {
//     setReviewData((prevData) =>
//       prevData.map((data) =>
//         data.id === id ? { ...data, shortlisted } : data,
//       ),
//     );
//   };
//
//   const handleSaveToLocalStorage = () => {
//     localStorage.setItem("reviewData", JSON.stringify(reviewData));
//   };
//   //
//   // const handleSave = () => {
//   //   const sortedData = [...reviewData].sort((a, b) => b.score - a.score);
//   //   // save sorted data into json at '../data/review.json'
//   //   setJson(
//   //     JSON.stringify(
//   //       sortedData.map((v) => {
//   //         const { formdata, shortlisted, slot, dep, ...rest } = v;
//   //         return rest;
//   //       }),
//   //       null,
//   //       2,
//   //     ),
//   //   );
//   //   setSortedData(sortedData);
//   // };
//
//   const handleSave = () => {
//     const sortedData = [...reviewData].sort();
//     // Create an array of objects containing all original fields
//     const fullData = sortedData.map((item) => ({
//       ...item,
//       formdata: item.formdata,
//       slot: item.slot,
//       dep: item.dep,
//       regno: item.regno,
//       created_at: item.created_at,
//     }));
//
//     setJson(JSON.stringify(fullData, null, 2));
//     setSortedData(sortedData);
//   };
//
//   return (
//     <div className="mx-auto w-full p-4 pt-6 md:p-6 lg:p-12">
//       <h1 className="mb-4 text-3xl font-bold">Review Page</h1>
//       <ul className="w-full divide-y divide-gray-200">
//         {reviewData.map((data, index) => (
//           <li key={data.id} className="w-full py-4">
//             <div className="flex justify-between">
//               <h2 className="text-lg font-bold">
//                 {index + 1}. {data.name}
//               </h2>
//               <p className="text-gray-600">{data.regno}</p>
//             </div>
//             <p className="text-gray-600">{data.email}</p>
//             <p className="text-gray-600">{data.dep}</p>
//             <p className="text-gray-600">{data.slot}</p>
//             <p className="text-gray-600">{data.shortlisted ? "Yes" : "No"}</p>
//             <p className="text-gray-600">{data.contact}</p>
//             <h3 className="mt-4 text-lg font-bold">Form Data:</h3>
//             <ul className="list-disc pl-4">
//               {Object.keys(data.formdata.questions).map((key) => (
//                 <li key={key} className="text-gray-600">
//                   {key}: {data.formdata.questions[key]}
//                 </li>
//               ))}
//             </ul>
//             <h3 className="mt-4 text-lg font-bold">Common Questions:</h3>
//             <ul className="list-disc pl-4">
//               {Object.keys(data.formdata.common_questions).map((key) => (
//                 <li key={key} className="text-gray-600">
//                   {key}: {data.formdata.common_questions[key]}
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-4 flex justify-between">
//               <select
//                 value={data.shortlisted ? "true" : "false"}
//                 onChange={(e) =>
//                   handleScoreChange(data.id, e.target.value === "true")
//                 }
//                 className="rounded border border-gray-300 py-1 pl-2 pr-2"
//               >
//                 <option value="true">Yes</option>
//                 <option value="false">No</option>
//               </select>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <button
//         className="mx-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
//         onClick={handleSave}
//       >
//         Save
//       </button>
//       <button
//         className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
//         onClick={handleSaveToLocalStorage}
//       >
//         Save to localStorage
//       </button>
//       {sortedData.length > 0 && (
//         <div className="mt-4">
//           <h2 className="text-lg font-bold">Sorted Data:</h2>
//           <ul className="divide-y divide-gray-200">
//             {sortedData.map((data) => (
//               <li key={data.id} className="py-4">
//                 <div className="flex justify-between">
//                   <h2 className="text-lg font-bold">
//                     {data.name}: {data.regno} -{" "}
//                     {data.shortlisted ? "Yes" : "No"}
//                   </h2>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {json && (
//         <div className="mt-4">
//           <h2 className="text-lg font-bold">JSON:</h2>
//           <a
//             href={`data:text/json;charset=utf-8,${encodeURIComponent(json)}`}
//             download="review.json"
//             className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
//           >
//             Download JSON
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }
//
// "use client";
// import { useState, useEffect } from "react";
// import { Data } from "~/lib/data";
// import { createClient } from "@supabase/supabase-js";
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
//
// const supabase = createClient(
//   "https://twvyrbcvrsbsaxjymrcr.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3dnlyYmN2cnNic2F4anltcmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NTQwMDUsImV4cCI6MjAzMzQzMDAwNX0.PE2jnWmWTeNvwQQSDXrI3ERPkrIVYVIBoR5nqopZefY",
// );
//
// interface ReviewData extends Data {}
//
// export default function HomePage() {
//   const [reviewData, setReviewData] = useState<ReviewData[]>([]);
//   const [sortedData, setSortedData] = useState<ReviewData[]>([]);
//   const [json, setJson] = useState<string>("");
//   const [session, setSession] = useState(null);
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });
//
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//
//     return () => subscription.unsubscribe();
//   }, []);
//
//   if (!session) {
//     return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
//   }
//   useEffect(() => {
//     fetchData("cont");
//   }, []);
//
//   async function fetchData(dep: string) {
//     const { data, error } = await supabase
//       .from("applicants")
//       .select("*")
//       .eq("dep", dep);
//
//     if (error) {
//       console.error("Error fetching data:", error);
//       return;
//     }
//     if (data) {
//       setReviewData(data as ReviewData[]);
//       console.log(data);
//     }
//   }
//
//   useEffect(() => {
//     // Only save if reviewData is not empty
//     if (reviewData.length > 0) {
//       saveData();
//     }
//   }, [reviewData]);
//
//   async function saveData() {
//     for (const item of reviewData) {
//       const { error } = await supabase.from("countries").upsert(item);
//
//       if (error) {
//         console.error("Error saving data:", error);
//       }
//     }
//   }
//
//   const handleScoreChange = (id: number, shortlisted: boolean) => {
//     setReviewData((prevData) =>
//       prevData.map((data) =>
//         data.id === id ? { ...data, shortlisted } : data,
//       ),
//     );
//   };
//
//   const handleSave = () => {
//     const sortedData = [...reviewData].sort();
//     const fullData = sortedData.map((item) => ({
//       ...item,
//       formdata: item.formdata,
//       slot: item.slot,
//       dep: item.dep,
//       regno: item.regno,
//       created_at: item.created_at,
//     }));
//
//     setJson(JSON.stringify(fullData, null, 2));
//     setSortedData(sortedData);
//   };
//
//   return (
//     <div className="mx-auto w-full p-4 pt-6 md:p-6 lg:p-12">
//       <h1 className="mb-4 text-3xl font-bold">Review Page</h1>
//       <ul className="w-full divide-y divide-gray-200">
//         {reviewData.map((data, index) => (
//           <li key={data.id} className="w-full py-4">
//             <div className="flex justify-between">
//               <h2 className="text-lg font-bold">
//                 {index + 1}. {data.name}
//               </h2>
//               <p className="text-gray-600">{data.regno}</p>
//             </div>
//             <p className="text-gray-600">{data.email}</p>
//             <p className="text-gray-600">{data.dep}</p>
//             <p className="text-gray-600">{data.slot}</p>
//             <p className="text-gray-600">{data.shortlisted ? "Yes" : "No"}</p>
//             <p className="text-gray-600">{data.contact}</p>
//             <h3 className="mt-4 text-lg font-bold">Form Data:</h3>
//             <ul className="list-disc pl-4">
//               {Object.keys(data.formdata.questions).map((key) => (
//                 <li key={key} className="text-gray-600">
//                   {key}: {data.formdata.questions[key]}
//                 </li>
//               ))}
//             </ul>
//             <h3 className="mt-4 text-lg font-bold">Common Questions:</h3>
//             <ul className="list-disc pl-4">
//               {Object.keys(data.formdata.common_questions).map((key) => (
//                 <li key={key} className="text-gray-600">
//                   {key}: {data.formdata.common_questions[key]}
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-4 flex justify-between">
//               <select
//                 value={data.shortlisted ? "true" : "false"}
//                 onChange={(e) =>
//                   handleScoreChange(data.id, e.target.value === "true")
//                 }
//                 className="rounded border border-gray-300 py-1 pl-2 pr-2"
//               >
//                 <option value="true">Yes</option>
//                 <option value="false">No</option>
//               </select>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <button
//         className="mx-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
//         onClick={handleSave}
//       >
//         Save
//       </button>
//       {sortedData.length > 0 && (
//         <div className="mt-4">
//           <h2 className="text-lg font-bold">Sorted Data:</h2>
//           <ul className="divide-y divide-gray-200">
//             {sortedData.map((data) => (
//               <li key={data.id} className="py-4">
//                 <div className="flex justify-between">
//                   <h2 className="text-lg font-bold">
//                     {data.name}: {data.regno} -{" "}
//                     {data.shortlisted ? "Yes" : "No"}
//                   </h2>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {json && (
//         <div className="mt-4">
//           <h2 className="text-lg font-bold">JSON:</h2>
//           <a
//             href={`data:text/json;charset=utf-8,${encodeURIComponent(json)}`}
//             download="review.json"
//             className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
//           >
//             Download JSON
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { Data } from "~/lib/data";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  "https://twvyrbcvrsbsaxjymrcr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3dnlyYmN2cnNic2F4anltcmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NTQwMDUsImV4cCI6MjAzMzQzMDAwNX0.PE2jnWmWTeNvwQQSDXrI3ERPkrIVYVIBoR5nqopZefY",
);

interface ReviewData extends Data {}

export default function HomePage() {
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [sortedData, setSortedData] = useState<ReviewData[]>([]);
  const [json, setJson] = useState<string>("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check if there is an active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchData("cont");
    }
  }, [session]);

  useEffect(() => {
    if (reviewData.length > 0) {
      saveData();
    }
  }, [reviewData]);

  async function fetchData(dep: string) {
    const { data, error } = await supabase
      .from("applicants")
      .select("*")
      .eq("dep", dep);

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    if (data) {
      setReviewData(data as ReviewData[]);
      console.log(data);
    }
  }

  async function saveData() {
    for (const item of reviewData) {
      const { error } = await supabase.from("applicants").upsert(item);

      if (error) {
        console.error("Error saving data:", error);
      }
    }
  }

  const handleScoreChange = (id: number, shortlisted: boolean) => {
    setReviewData((prevData) =>
      prevData.map((data) =>
        data.id === id ? { ...data, shortlisted } : data,
      ),
    );
  };

  const handleSave = () => {
    const sortedData = [...reviewData].sort();
    const fullData = sortedData.map((item) => ({
      ...item,
      formdata: item.formdata,
      slot: item.slot,
      dep: item.dep,
      regno: item.regno,
      created_at: item.created_at,
    }));

    setJson(JSON.stringify(fullData, null, 2));
    setSortedData(sortedData);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      setSession(null); // Clear session state
    }
  };

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }

  return (
    <div className="mx-auto w-full p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="mb-4 text-3xl font-bold">Review Page</h1>
      <button
        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="flex flex-row space-x-2">
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => {
            fetchData("cont");
          }}
        >
          Content
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => {
            fetchData("management");
          }}
        >
          Management
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => {
            fetchData("meda_social");
          }}
        >
          Media - Social
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => {
            fetchData("media_des");
          }}
        >
          Media - Design
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => {
            fetchData("media_photo");
          }}
        >
          Media - Photo
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => {
            fetchData("mms");
          }}
        >
          MMS
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => {
            fetchData("tech_cyber");
          }}
        >
          Technical - Cyber Secutiry
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => {
            fetchData("tech_linux");
          }}
        >
          Technical - Linux
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => {
            fetchData("tech_dev");
          }}
        >
          Technical - Dev
        </button>
      </div>
      <ul className="w-full divide-y divide-gray-200">
        {reviewData.map((data, index) => (
          <li key={data.id} className="w-full py-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">
                {index + 1}. {data.name}
              </h2>
              <p className="text-gray-600">{data.regno}</p>
            </div>
            <p className="text-gray-600">{data.email}</p>
            <p className="text-gray-600">{data.dep}</p>
            <p className="text-gray-600">{data.slot}</p>
            <p className="text-gray-600">{data.shortlisted ? "Yes" : "No"}</p>
            <p className="text-gray-600">{data.contact}</p>
            <h3 className="mt-4 text-lg font-bold">Form Data:</h3>
            <ul className="list-disc pl-4">
              {Object.keys(data.formdata.questions).map((key) => (
                <li key={key} className="text-gray-600">
                  {key}: {data.formdata.questions[key]}
                </li>
              ))}
            </ul>
            <h3 className="mt-4 text-lg font-bold">Common Questions:</h3>
            <ul className="list-disc pl-4">
              {Object.keys(data.formdata.common_questions).map((key) => (
                <li key={key} className="text-gray-600">
                  {key}: {data.formdata.common_questions[key]}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between">
              <select
                value={data.shortlisted ? "true" : "false"}
                onChange={(e) =>
                  handleScoreChange(data.id, e.target.value === "true")
                }
                className="rounded border border-gray-300 py-1 pl-2 pr-2"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="mx-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}
