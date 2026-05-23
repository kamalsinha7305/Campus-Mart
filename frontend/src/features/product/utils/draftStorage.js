const DRAFT_KEY = "campus-mart-product-draft";

// SAVE DRAFT LOCAL
export const saveDraftToLocal = (data) => {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
};

// GET DRAFT
export const getDraftFromLocal = () => {
  const draft = localStorage.getItem(DRAFT_KEY);

  return draft ? JSON.parse(draft) : null;
};

// REMOVE DRAFT
export const removeDraftFromLocal = () => {
  localStorage.removeItem(DRAFT_KEY);
};
