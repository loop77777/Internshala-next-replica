"use client";

import { useEffect, useMemo, useState } from "react";
import FilterPanel from "./components/FilterPanel";
import InternshipCard from "./components/InternshipCard";
import SearchHeader from "./components/SearchHeader";

// Centralized default state keeps reset behavior predictable.
const initialFilters = {
  topQuery: "",
  keyword: "",
  profile: "",
  city: "",
  workFromHome: false,
  partTime: false,
  maxDuration: 12,
  minStipend: 0,
  sort: "relevance",
};

// Duration comes as strings like "3 Months". We only need the numeric month value.
function parseDurationToMonths(durationText = "") {
  const match = String(durationText).match(/\d+/);
  return match ? Number(match[0]) : 0;
}

// Fallback parser in case salaryValue1 is missing in API data.
function parseStipendToNumber(stipend = {}) {
  const text = stipend?.salary || stipend?.salaryValue1 || "";
  const cleaned = String(text).replace(/,/g, "");
  const match = cleaned.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

// Normalize raw API records so UI and filter logic can work on a stable shape.
function normalizeInternship(item = {}) {
  const locations = Array.isArray(item.location_names)
    ? item.location_names.join(", ")
    : item.location_name || "Location not specified";

  return {
    id: item.id || `${item.title}-${item.company_name}`,
    title: item.title || "Internship",
    company: item.company_name || "Company",
    profileName: item.profile_name || "",
    location: locations,
    duration: parseDurationToMonths(item.duration),
    stipend:
      typeof item?.stipend?.salaryValue1 === "number"
        ? item.stipend.salaryValue1
        : parseStipendToNumber(item.stipend),
    stipendText: item.stipend?.salary || "Unpaid",
    postedLabel: item.posted_by_label || "Recently posted",
    workFromHome: Boolean(item.work_from_home),
    partTime: Boolean(item.part_time),
  };
}

export default function InternshipsPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInternships() {
      try {
        setLoading(true);
        setError("");

        // Fetch a few pages in parallel and merge unique internships.
        const pageRequests = Array.from({ length: 5 }, (_, index) =>
          fetch(`https://internshala.com/hiring/search?page_no=${index + 1}`)
        );

        const responses = await Promise.all(pageRequests);
        responses.forEach((response) => {
          if (!response.ok) {
            throw new Error(`Failed request: ${response.status}`);
          }
        });

        const pages = await Promise.all(responses.map((response) => response.json()));
        const merged = pages.flatMap((page) => Object.values(page?.internships_meta || {}));

        const uniqueById = Array.from(
          new Map(merged.map((item) => [item.id || `${item.title}-${item.company_name}`, item])).values()
        );

        setInternships(uniqueById.map((item) => normalizeInternship(item)));
      } catch (e) {
        setError("Could not fetch internships. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadInternships();
  }, []);

  const filteredInternships = useMemo(() => {
    const normalizedTopQuery = filters.topQuery.trim().toLowerCase();
    const normalizedKeyword = filters.keyword.trim().toLowerCase();
    const normalizedProfile = filters.profile.toLowerCase();
    const normalizedCity = filters.city.toLowerCase();

    const result = internships.filter((item) => {
      const profileMatch = !normalizedProfile || item.profileName.toLowerCase().includes(normalizedProfile);
      const cityMatch = !normalizedCity || item.location.toLowerCase().includes(normalizedCity);

      const topQueryMatch =
        !normalizedTopQuery ||
        item.title.toLowerCase().includes(normalizedTopQuery) ||
        item.company.toLowerCase().includes(normalizedTopQuery) ||
        item.profileName.toLowerCase().includes(normalizedTopQuery) ||
        item.location.toLowerCase().includes(normalizedTopQuery);

      const keywordMatch =
        !normalizedKeyword ||
        item.title.toLowerCase().includes(normalizedKeyword) ||
        item.company.toLowerCase().includes(normalizedKeyword) ||
        item.profileName.toLowerCase().includes(normalizedKeyword) ||
        item.location.toLowerCase().includes(normalizedKeyword);

      const workFromHomeMatch = !filters.workFromHome || item.workFromHome;
      const partTimeMatch = !filters.partTime || item.partTime;
      const durationMatch = item.duration <= filters.maxDuration || item.duration === 0;
      const stipendMatch = item.stipend >= filters.minStipend;

      return (
        profileMatch &&
        cityMatch &&
        topQueryMatch &&
        keywordMatch &&
        workFromHomeMatch &&
        partTimeMatch &&
        durationMatch &&
        stipendMatch
      );
    });

    if (filters.sort === "stipend_desc") {
      result.sort((a, b) => b.stipend - a.stipend);
    }

    return result;
  }, [filters, internships]);

  return (
    <main className="page">
      <SearchHeader
        query={filters.topQuery}
        onQueryChange={(value) => setFilters((prev) => ({ ...prev, topQuery: value }))}
      />

      <section className="hero">
        <h1>56,000+ Internships</h1>
        <p>Latest internships in India and work from home internships in 2026</p>
      </section>

      <section className="content">
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onClear={() => setFilters(initialFilters)}
        />

        <div className="results">
          <div className="results-head">
            <p>
              {loading ? "Loading internships..." : `${filteredInternships.length} internships found`}
            </p>
            <select
              value={filters.sort}
              onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
            >
              <option value="relevance">Sort by relevance</option>
              <option value="stipend_desc">Highest stipend</option>
            </select>
          </div>

          {error && <article className="card">{error}</article>}

          {!loading && !error && filteredInternships.length === 0 && (
            <article className="card">No internships match current filters.</article>
          )}

          {filteredInternships.map((item) => (
            <InternshipCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}