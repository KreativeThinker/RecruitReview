/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Session } from "@supabase/supabase-js";
import type { Data } from "~/lib/data";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  "https://twvyrbcvrsbsaxjymrcr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3dnlyYmN2cnNic2F4anltcmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NTQwMDUsImV4cCI6MjAzMzQzMDAwNX0.PE2jnWmWTeNvwQQSDXrI3ERPkrIVYVIBoR5nqopZefY",
);

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [reviewData, setReviewData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchData("cont");
    }
  }, [session]);

  const fetchData = async (dep: string) => {
    const { data, error } = await supabase
      .from("applicants")
      .select("*")
      .eq("dep", dep);

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    if (data) {
      setReviewData(data as Data[]);
    }
  };

  const handleScoreChange = async (id: number, shortlisted: boolean) => {
    try {
      const { data, error } = await supabase
        .from("applicants")
        .update({ shortlisted })
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating data:", error);
        return;
      }

      console.log(data);
      // Update the local state to reflect the changes in the UI
      setReviewData((prevData) =>
        prevData.map((data) =>
          data.id === id ? { ...data, shortlisted } : data,
        ),
      );
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      setSession(null);
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
          onClick={() => fetchData("cont")}
        >
          Content
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => fetchData("management")}
        >
          Management
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => fetchData("media")}
        >
          Media
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => fetchData("mns")}
        >
          MNS
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => fetchData("tech")}
        >
          Technical
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
                  <p className="font-semibold text-black">{key}</p>
                  {data.formdata.questions[key]}
                </li>
              ))}
            </ul>
            <h3 className="mt-4 text-lg font-bold">Common Questions:</h3>
            <ul className="list-disc pl-4">
              {Object.keys(data.formdata.common_questions).map((key) => (
                <li key={key} className="text-gray-600">
                  <p className="font-semibold text-black">{key}</p>
                  {data.formdata.common_questions[key]}
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
    </div>
  );
}
