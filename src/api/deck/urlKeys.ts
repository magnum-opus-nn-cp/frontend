export const DECKS_API_URL = '/decks/';

export const FIRST_QUESTION_PARAM = 'deckId';
export const FIRST_QUESTION_API_URL = `/decks/question/:${FIRST_QUESTION_PARAM}`;

export const QUESTION_PARAM_DECK_ID = 'deckId';
export const QUESTION_PARAM_QUESTION_ID = 'questionId';
export const QUESTION_API_URL = `/decks/question/:${FIRST_QUESTION_PARAM}/:${QUESTION_PARAM_QUESTION_ID}`;

export const DECK_PARAM = 'deckId';
export const DECK_API_URL = `/decks/question/:${FIRST_QUESTION_PARAM}/presentation`;

export const CONVERT_API_URL = '/decks/pdf-to-pptx';