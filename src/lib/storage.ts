// Structured response storage for Souply Connect
// Stores survey submissions in localStorage; structured for dashboard analysis.

export type Flavour = "mushroom" | "chicken";

export type Ratings = {
  taste: number;
  aroma: number;
  texture: number;
  thickness: number;
  packaging: number;
  overall: number;
};

export type Lifestyle =
  | "quick_meal"
  | "evening_snack"
  | "healthy_diet"
  | "post_workout"
  | "busy_workday";

export type PackagingPref = "sachet" | "pouch" | "cup";
export type PriceRange = "80-100" | "100-150" | "150-200";
export type PurchaseIntent =
  | "definitely_yes"
  | "probably_yes"
  | "not_sure"
  | "probably_no"
  | "definitely_no";
export type RecommendIntent = "yes" | "maybe" | "no";

export interface SurveyResponse {
  id: string;
  createdAt: string;
  flavour: Flavour;
  ratings: Ratings;
  lifestyle: Lifestyle;
  recommended: Flavour;
  packaging: PackagingPref;
  price: PriceRange;
  purchase: PurchaseIntent;
  suggestions: string;
  recommend: RecommendIntent;
}

import { supabase } from "@/integrations/supabase/client";

const DRAFT = "souply_draft_v1";

export async function getResponses(): Promise<SurveyResponse[]> {
  const { data, error } = await supabase
    .from("responses")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to load responses", error);
    return [];
  }
  return (data ?? []).map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    flavour: row.flavour as Flavour,
    ratings: row.ratings as Ratings,
    lifestyle: row.lifestyle as Lifestyle,
    recommended: row.recommended as Flavour,
    packaging: row.packaging as PackagingPref,
    price: row.price as PriceRange,
    purchase: row.purchase as PurchaseIntent,
    suggestions: row.suggestions ?? "",
    recommend: row.recommend as RecommendIntent,
  }));
}

export async function saveResponse(r: Omit<SurveyResponse, "id" | "createdAt">) {
  const { error } = await supabase.from("responses").insert({
    flavour: r.flavour,
    ratings: r.ratings,
    lifestyle: r.lifestyle,
    recommended: r.recommended,
    packaging: r.packaging,
    price: r.price,
    purchase: r.purchase,
    suggestions: r.suggestions,
    recommend: r.recommend,
  });
  if (error) throw error;
}

export type Draft = Partial<{
  flavour: Flavour;
  ratings: Ratings;
  lifestyle: Lifestyle;
  recommended: Flavour;
  packaging: PackagingPref;
  price: PriceRange;
  purchase: PurchaseIntent;
  suggestions: string;
  recommend: RecommendIntent;
}>;

export function getDraft(): Draft {
  try {
    return JSON.parse(localStorage.getItem(DRAFT) || "{}");
  } catch {
    return {};
  }
}

export function setDraft(patch: Draft) {
  const next = { ...getDraft(), ...patch };
  localStorage.setItem(DRAFT, JSON.stringify(next));
  return next;
}

export function clearDraft() {
  localStorage.removeItem(DRAFT);
}

export function recommendFlavour(l: Lifestyle): Flavour {
  switch (l) {
    case "healthy_diet":
    case "quick_meal":
    case "evening_snack":
      return "mushroom";
    case "post_workout":
    case "busy_workday":
      return "chicken";
  }
}
