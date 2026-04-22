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

const KEY = "souply_responses_v1";
const DRAFT = "souply_draft_v1";

export function getResponses(): SurveyResponse[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveResponse(r: SurveyResponse) {
  const all = getResponses();
  all.push(r);
  localStorage.setItem(KEY, JSON.stringify(all));
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
