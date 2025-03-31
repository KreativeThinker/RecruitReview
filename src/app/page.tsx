/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Session } from "@supabase/supabase-js";
import type { Data } from "~/lib/data";
import data from "../data/data.json";

// Then use it as needed
const supabase = createClient(
  "https://twvyrbcvrsbsaxjymrcr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3dnlyYmN2cnNic2F4anltcmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NTQwMDUsImV4cCI6MjAzMzQzMDAwNX0.PE2jnWmWTeNvwQQSDXrI3ERPkrIVYVIBoR5nqopZefY",
);

const dummyData: Data[] = data as unknown as Data[];

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [reviewData, setReviewData] = useState<Data[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
    // If using demo data, filter locally
    if (session?.user?.email === "demo@gmail.com") {
      const filteredData = dummyData.filter((item) => item.dep === dep);
      setReviewData(filteredData);
      return;
    }
    const { data, error } = await supabase
      .from("applicants")
      .select("*")
      .eq("dep", dep)
      .eq("shortlisted", true);

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    if (data) {
      setReviewData(data as Data[]);
    }
  };

  const handleLogin = async () => {
    setLoading(true);

    if (email === "demo@gmail.com" && password === "demo1234") {
      const mockSession = {
        user: {
          id: "demo-user",
          email: "demo@gmail.com",
        },
        access_token: "demo-token",
        expires_in: 3600,
        expires_at: Date.now() + 3600 * 1000,
      } as unknown as Session;

      setSession(mockSession);
      setReviewData(dummyData); // Set dummy data directly
      setLoading(false);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Login error:", error.message);
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Signup error:", error.message);
    }
    setLoading(false);
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
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#2E2E2E]">
        <div className="m-8 rounded-lg bg-[#3A3A3A] p-8 shadow-md md:w-[50%]">
          <h2 className="mb-4 text-center text-2xl font-bold text-[#E2E2E2]">
            Login
          </h2>
          <p>Demo Username: demo@gmail.com</p>
          <p>Demo Password: demo1234</p>
          <input
            type="email"
            placeholder="Email"
            className="mb-4 w-full rounded border border-gray-600 bg-[#555] p-2 text-[#E2E2E2] placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 w-full rounded border border-gray-600 bg-[#555] p-2 text-[#E2E2E2] placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full rounded bg-blue-500 p-2 text-white"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="mb-4 text-3xl font-bold">Review Page</h1>
      <button
        className="mb-4 rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="flex gap-2 md:flex-row">
        <button
          className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => fetchData("cont")}
        >
          Content
        </button>
        <button
          className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => fetchData("management")}
        >
          Management
        </button>
        <button
          className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => fetchData("media")}
        >
          Media
        </button>
        <button
          className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => fetchData("mns")}
        >
          MNS
        </button>
        <button
          className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-red-700"
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
              <p className="text-gray-300">{data.regno}</p>
            </div>
            <p className="text-gray-300">{data.email}</p>
            <p className="text-gray-300">{data.dep}</p>
            <p className="text-gray-300">{data.slot}</p>
            <p className="text-gray-300">{data.shortlisted ? "Yes" : "No"}</p>
            <p className="text-gray-300">{data.contact}</p>
            <h3 className="mt-4 text-lg font-bold">Form Data:</h3>
            <ul className="list-disc pl-4">
              {Object.keys(data.formdata.questions).map((key) => (
                <li key={key} className="text-gray-300">
                  <p className="font-semibold text-white">{key}</p>
                  {data.formdata.questions[key]}
                </li>
              ))}
            </ul>
            <h3 className="mt-4 text-lg font-bold">Common Questions:</h3>
            <ul className="list-disc pl-4">
              {Object.keys(data.formdata.common_questions).map((key) => (
                <li key={key} className="text-gray-300">
                  <p className="font-semibold text-white">{key}</p>
                  {data.formdata.common_questions[key]}
                </li>
              ))}
            </ul>
            {/*
            <div className="mt-4 flex justify-between">
              <select
                value={data.shortlisted ? "true" : "false"}
                onChange={(e) =>
                  handleScoreChange(data.id, e.target.value === "true")
                }
                className={`rounded border p-2 text-gray-300 ${
                  data.shortlisted ? "bg-green-600" : "bg-red-600"
                }`}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            */}
          </li>
        ))}
      </ul>
    </div>
  );
}
