import re
import math
import uuid
import time
from typing import List, Dict, Tuple, Any, Optional
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

# -------------------------------------------------------------
# CINEMATIC LEXICONS & ASPECT ONTOLOGY
# -------------------------------------------------------------

CONTRACTIONS = {
    r"\bcan't\b": "cannot",
    r"\bwon't\b": "will not",
    r"\bdon't\b": "do not",
    r"\bdidn't\b": "did not",
    r"\bwasn't\b": "was not",
    r"\bweren't\b": "were not",
    r"\bisn't\b": "is not",
    r"\baren't\b": "are not",
    r"\bhaven't\b": "have not",
    r"\bhasn't\b": "has not",
    r"\bcouldn't\b": "could not",
    r"\bwouldn't\b": "would not",
    r"\bshouldn't\b": "should not",
    r"\bit's\b": "it is",
    r"\bthere's\b": "there is",
    r"\bthat's\b": "that is"
}

NEGATIONS = {
    "not", "never", "no", "neither", "nor", "barely", "hardly", "scarcely",
    "seldom", "rarely", "without", "lack", "lacks", "lacking"
}

INTENSIFIERS = {
    "incredibly": 1.5, "exceptionally": 1.5, "breathtakingly": 1.6, "stunningly": 1.5,
    "deeply": 1.4, "profoundly": 1.5, "extraordinarily": 1.5, "immensely": 1.4,
    "remarkably": 1.4, "hugely": 1.3, "extremely": 1.4, "very": 1.3,
    "truly": 1.3, "so": 1.25, "absolutely": 1.5, "unquestionably": 1.4, "completely": 1.3
}

DIMINISHERS = {
    "slightly": 0.6, "somewhat": 0.7, "a bit": 0.65, "barely": 0.4,
    "marginally": 0.6, "kind of": 0.7, "sort of": 0.7, "partially": 0.7
}

POSITIVE_LEXICON = {
    "masterpiece": 3.8, "flawless": 3.5, "breathtaking": 3.5, "visceral": 3.2,
    "transcendent": 3.6, "brilliant": 3.2, "riveting": 3.2, "mesmerizing": 3.4,
    "superb": 3.0, "stellar": 3.0, "gripping": 3.1, "compelling": 3.0,
    "phenomenal": 3.5, "magnificent": 3.4, "electrifying": 3.3, "triumph": 3.4,
    "exquisite": 3.2, "astonishing": 3.3, "captivating": 3.1, "poignant": 3.0,
    "heartwarming": 2.8, "heartfelt": 2.8, "gorgeous": 2.9, "innovative": 2.8,
    "spellbinding": 3.3, "sublime": 3.2, "exceptional": 3.0, "outstanding": 3.1,
    "dynamic": 2.5, "powerful": 2.9, "moving": 2.8, "charismatic": 2.7,
    "evocative": 2.7, "rich": 2.5, "nuanced": 2.8, "thrilling": 2.9,
    "fascinating": 2.7, "profound": 3.0, "unforgettable": 3.1, "spectacular": 3.2,
    "great": 2.2, "good": 1.8, "impressive": 2.3, "entertaining": 2.2,
    "enjoyable": 2.1, "solid": 1.9, "clever": 2.2, "effective": 2.0,
    "sharp": 2.1, "refreshing": 2.4, "inventive": 2.6, "acclaimed": 2.5,
    "gem": 2.8, "wonder": 2.7, "delight": 2.6, "delightful": 2.5,
    "haunting": 2.5, "poetic": 2.6, "inspired": 2.7, "masterful": 3.4,
    "tight": 2.0, "vibrant": 2.4, "polished": 2.3, "charming": 2.2,
    "praise": 2.4, "praised": 2.4, "immersive": 2.9, "striking": 2.6
}

NEGATIVE_LEXICON = {
    "terrible": -3.5, "awful": -3.5, "horrible": -3.6, "abysmal": -3.8,
    "unwatchable": -3.8, "disaster": -3.5, "trash": -3.6, "garbage": -3.6,
    "disjointed": -2.8, "tedious": -2.9, "shallow": -2.7, "monotonous": -2.8,
    "uninspired": -2.7, "cliché": -2.5, "cliche": -2.5, "cliched": -2.5,
    "underdeveloped": -2.6, "flat": -2.5, "disappointing": -2.7, "disappointment": -2.8,
    "predictable": -2.3, "overlong": -2.4, "forgettable": -2.6, "boring": -2.8,
    "dull": -2.7, "bland": -2.5, "wooden": -2.6, "cringe": -2.7, "cringeworthy": -2.9,
    "pointless": -2.8, "mess": -2.9, "messy": -2.5, "convoluted": -2.5,
    "incoherent": -3.0, "hollow": -2.7, "pretentious": -2.6, "lifeless": -2.8,
    "generic": -2.3, "mediocre": -2.2, "poor": -2.4, "bad": -2.2,
    "waste": -3.0, "slog": -2.7, "lackluster": -2.6, "forced": -2.3,
    "plodding": -2.6, "muddled": -2.5, "unconvincing": -2.5, "stilted": -2.4,
    "shallowly": -2.4, "cheesy": -2.0, "overrated": -2.3, "derivative": -2.4,
    "sloppy": -2.6, "fatiguing": -2.4, "awkward": -2.2, "weak": -2.3
}

ASPECT_ONTOLOGY = {
    "Story & Screenplay": {
        "keywords": [
            "story", "plot", "screenplay", "script", "narrative", "dialogue", "dialogues",
            "pacing", "pace", "writing", "twist", "twists", "climax", "ending", "premise",
            "character arc", "storyline", "exposition", "structure", "lore"
        ]
    },
    "Acting & Cast": {
        "keywords": [
            "acting", "actor", "actors", "actress", "actresses", "cast", "performance",
            "performances", "lead", "chemistry", "portrayal", "portrayed", "character",
            "characters", "delivered", "screen presence", "charisma", "role", "roles"
        ]
    },
    "Directing & Vision": {
        "keywords": [
            "directing", "director", "direction", "vision", "helmed", "auteur", "execution",
            "filmmaker", "staging", "craft", "ambition", "creative direction", "tone"
        ]
    },
    "Cinematography & Visuals": {
        "keywords": [
            "cinematography", "visuals", "visual", "camerawork", "camera", "shot", "shots",
            "lighting", "framing", "cgi", "vfx", "aesthetic", "aesthetics", "composition",
            "visual effects", "color palette", "cinematographer", "imagery", "spectacle"
        ]
    },
    "Music & Sound Design": {
        "keywords": [
            "music", "score", "soundtrack", "sound", "audio", "composer", "sound design",
            "theme", "orchestration", "acoustic", "sound effects", "soundtrack"
        ]
    }
}

# -------------------------------------------------------------
# TRAINING DATASET FOR SUPERVISED CLASSIFIER
# -------------------------------------------------------------
TRAINING_REVIEWS = [
    # POSITIVE
    ("An absolute cinematic masterpiece with breathtaking visuals and flawless performances.", "Positive"),
    ("Christopher Nolan delivers an electrifying and profoundly moving historical epic.", "Positive"),
    ("The acting is transcendent and the musical score resonates deep in your soul.", "Positive"),
    ("A visually stunning triumph that sets a new high watermark for sci-fi cinema.", "Positive"),
    ("Sharp, witty dialogue and impeccable comedic timing make this an instant classic.", "Positive"),
    ("Riveting from the opening frame to the devastating climax. Truly magnificent work.", "Positive"),
    ("Brilliant direction, stellar ensemble cast, and jaw-dropping cinematography.", "Positive"),
    ("A deeply poignant and hauntingly beautiful exploration of love and destiny.", "Positive"),
    ("One of the best movies of the decade. Innovative, thrilling, and emotionally rich.", "Positive"),
    ("Exquisite craftsmanship across every technical department. A genuine tour de force.", "Positive"),
    ("Superb acting and a compelling, tightly written screenplay that never loses momentum.", "Positive"),
    ("Heartfelt, inventive, and wonderfully executed with pure passion and artistry.", "Positive"),
    ("Astonishing visual effects combined with visceral emotional storytelling.", "Positive"),
    ("The chemistry between the lead actors is electric and utterly convincing.", "Positive"),
    ("Spectacular set pieces accompanied by an unforgettable, pulsing musical score.", "Positive"),
    ("A masterpiece of tension, psychological depth, and razor-sharp pacing.", "Positive"),
    ("Masterful storytelling that lingers in your mind long after the credits roll.", "Positive"),
    ("A refreshing and clever script that subverts expectations in the most delightful way.", "Positive"),
    ("An exhilarating experience with unforgettable scenes and sheer artistic brilliance.", "Positive"),

    # NEGATIVE
    ("A disjointed, tedious mess with terrible dialogue and zero emotional payoff.", "Negative"),
    ("Utterly unwatchable garbage with laughable CGI and wooden acting.", "Negative"),
    ("The plot is completely predictable and filled with insulting clichés.", "Negative"),
    ("A hollow, pretentious slog that mistakes overlong runtimes for artistic depth.", "Negative"),
    ("Disappointing on every single level. Plodding direction and lifeless performances.", "Negative"),
    ("The dialogue was stilted and unnatural, while the narrative went nowhere.", "Negative"),
    ("Painfully boring with monotonous pacing and completely unlikable characters.", "Negative"),
    ("A massive waste of talent and budget resulting in an incoherent disaster.", "Negative"),
    ("Uninspired, shallow, and derivative of much better films in the same genre.", "Negative"),
    ("The visual effects were shockingly cheap and the sound mixing was muddy.", "Negative"),
    ("Lacks heart, lacks soul, and lacks any coherent story structure.", "Negative"),
    ("A cringeworthy failure that falls completely flat from start to finish.", "Negative"),
    ("Horrible pacing ruined what could have been a decent premise.", "Negative"),
    ("Forgettable, bland, and entirely devoid of genuine emotional resonance.", "Negative"),
    ("An infuriatingly bad script loaded with plot holes and contrived conflict.", "Negative"),
    ("Waste of time and money, completely disjointed and lifeless.", "Negative"),

    # NEUTRAL / MIXED
    ("Visually impressive and stylish, but the screenplay feels underdeveloped and thin.", "Neutral"),
    ("Great performances from the leads, though the third act falls into predictable tropes.", "Neutral"),
    ("A decent popcorn flick that entertains for two hours without leaving much lasting impression.", "Neutral"),
    ("While the cinematography is stunning, the narrative pacing drags in the middle.", "Neutral"),
    ("A mixed bag with some brilliant comedic moments surrounded by uneven filler.", "Neutral"),
    ("Competently directed and adequately acted, but lacks the spark to be truly memorable.", "Neutral"),
    ("Not bad, but certainly not the masterpiece critics hyped it up to be.", "Neutral"),
    ("The musical score is fantastic, yet the characters feel somewhat one-dimensional.", "Neutral"),
    ("An ambitious premise with mixed execution that will divide audiences.", "Neutral"),
    ("Solid technical achievements weighed down by a formulaic, standard storyline.", "Neutral"),
    ("Has flashes of brilliance between long stretches of mediocre exposition.", "Neutral"),
    ("Neither great nor terrible, it serves as a serviceable weekend viewing.", "Neutral")
]


class SentimentAnalysisEngine:
    """
    Production-grade hybrid sentiment & Aspect-Based Sentiment Analysis (ABSA) engine.
    """

    def __init__(self):
        self.pipeline: Optional[Pipeline] = None
        self._initialize_model()

    def _initialize_model(self):
        texts = [item[0] for item in TRAINING_REVIEWS]
        labels = [item[1] for item in TRAINING_REVIEWS]

        self.pipeline = Pipeline([
            ("tfidf", TfidfVectorizer(
                ngram_range=(1, 2),
                sublinear_tf=True,
                lowercase=True,
                stop_words=None
            )),
            ("clf", LogisticRegression(
                C=2.5,
                class_weight="balanced",
                max_iter=400,
                random_state=42
            ))
        ])
        self.pipeline.fit(texts, labels)

    def preprocess_text(self, text: str) -> str:
        """Expands contractions and standardizes spacing."""
        cleaned = text.strip()
        for pattern, replacement in CONTRACTIONS.items():
            cleaned = re.sub(pattern, replacement, cleaned, flags=re.IGNORECASE)
        cleaned = re.sub(r"\s+", " ", cleaned)
        return cleaned

    def _score_tokens(self, tokens: List[str]) -> Tuple[float, List[Dict[str, Any]]]:
        """Calculates polarity from a list of tokens with negation and modifiers."""
        if not tokens:
            return 0.0, []

        clause_score = 0.0
        active_tokens = []
        window = 3

        for i, word in enumerate(tokens):
            score = 0.0
            tag = "neutral"

            if word in POSITIVE_LEXICON:
                score = POSITIVE_LEXICON[word]
                tag = "positive"
            elif word in NEGATIVE_LEXICON:
                score = NEGATIVE_LEXICON[word]
                tag = "negative"

            if score != 0.0:
                lookback = tokens[max(0, i - window):i]
                is_negated = any(neg in NEGATIONS for neg in lookback)

                multiplier = 1.0
                for modifier in lookback:
                    if modifier in INTENSIFIERS:
                        multiplier *= INTENSIFIERS[modifier]
                    elif modifier in DIMINISHERS:
                        multiplier *= DIMINISHERS[modifier]

                if is_negated:
                    score = -score * 0.95
                    tag = "negative" if tag == "positive" else "positive"

                score *= multiplier
                clause_score += score
                active_tokens.append({
                    "word": word,
                    "tag": tag,
                    "score": round(score, 2)
                })

        normalized_score = math.tanh(clause_score / 2.8)
        return normalized_score, active_tokens

    def _split_clauses(self, text: str) -> List[str]:
        """Splits sentences into sub-clauses on punctuation and conjunctions."""
        # Split on sentence terminals first
        raw_sentences = re.split(r'[.!?;\n]+', text)
        clauses = []

        for s in raw_sentences:
            s = s.strip()
            if not s:
                continue
            # Split on commas or conjunctions
            parts = re.split(r'(?:,\s*|\s+(?:although|though|however|but|yet|nevertheless|whereas|while|and\s+also)\s+)', s, flags=re.IGNORECASE)
            for p in parts:
                p = p.strip()
                if len(p) > 2:
                    clauses.append(p)
        return clauses if clauses else [text]

    def extract_aspects(self, text: str) -> List[Dict[str, Any]]:
        """
        Locates aspect mentions in sentences and sub-clauses.
        Uses localized window polarity around the aspect mention to guarantee accurate ABSA.
        """
        clauses = self._split_clauses(text)
        aspect_findings: Dict[str, List[Dict[str, Any]]] = {aspect: [] for aspect in ASPECT_ONTOLOGY}

        # Analyze each clause
        for clause in clauses:
            clause_tokens = re.findall(r"[A-Za-z0-9'\-]+", clause.lower())
            if not clause_tokens:
                continue

            for aspect_name, meta in ASPECT_ONTOLOGY.items():
                matched_keywords = [kw for kw in meta["keywords"] if re.search(r'\b' + re.escape(kw) + r'\b', clause.lower())]
                if matched_keywords:
                    # Find location of keyword and inspect surrounding 7 words
                    local_scores = []
                    for kw in matched_keywords:
                        kw_words = kw.split()
                        # find index in clause_tokens
                        for idx, tok in enumerate(clause_tokens):
                            if tok == kw_words[0]:
                                window_tokens = clause_tokens[max(0, idx - 6): min(len(clause_tokens), idx + 8)]
                                pol, _ = self._score_tokens(window_tokens)
                                local_scores.append(pol)

                    avg_pol = float(np.mean(local_scores)) if local_scores else 0.0
                    # If local window yielded zero, fall back to whole clause
                    if avg_pol == 0.0:
                        clause_pol, _ = self._score_tokens(clause_tokens)
                        avg_pol = clause_pol

                    aspect_findings[aspect_name].append({
                        "clause": clause,
                        "polarity": avg_pol,
                        "keywords": matched_keywords
                    })

        results = []
        for aspect_name, findings in aspect_findings.items():
            if findings:
                avg_polarity = float(np.mean([f["polarity"] for f in findings]))
                evidence = findings[0]["clause"]
                if len(findings) > 1:
                    evidence = f"{findings[0]['clause']}; {findings[1]['clause']}"

                if avg_polarity > 0.12:
                    sentiment = "Positive"
                    score = min(0.98, max(0.65, 0.5 + (avg_polarity * 0.45)))
                elif avg_polarity < -0.12:
                    sentiment = "Negative"
                    score = max(0.08, min(0.42, 0.5 + (avg_polarity * 0.45)))
                else:
                    sentiment = "Neutral"
                    score = 0.50 + (avg_polarity * 0.2)

                confidence = round(min(0.98, max(0.65, 0.72 + abs(avg_polarity) * 0.25)), 2)

                results.append({
                    "aspect": aspect_name,
                    "sentiment": sentiment,
                    "score": round(float(score), 2),
                    "confidence": float(confidence),
                    "evidence": evidence.strip()
                })

        # Fallback if no specific aspect detected
        if not results:
            tokens = re.findall(r"[A-Za-z0-9'\-]+", text.lower())
            overall_polarity, _ = self._score_tokens(tokens)
            sent = "Positive" if overall_polarity > 0.1 else ("Negative" if overall_polarity < -0.1 else "Neutral")
            results.append({
                "aspect": "Story & Screenplay",
                "sentiment": sent,
                "score": round(0.5 + (overall_polarity * 0.4), 2),
                "confidence": 0.72,
                "evidence": text[:120] + ("..." if len(text) > 120 else "")
            })

        return results

    def highlight_tokens(self, text: str) -> List[Dict[str, Any]]:
        """Produces word-by-word token highlights with categorization."""
        raw_words = text.split()
        tokens = []

        all_aspect_keywords = set()
        for meta in ASPECT_ONTOLOGY.values():
            all_aspect_keywords.update(meta["keywords"])

        for word in raw_words:
            clean = re.sub(r"[^A-Za-z0-9\-]", "", word.lower())
            tag = "neutral"
            weight = 0.0

            if clean in POSITIVE_LEXICON:
                tag = "positive"
                weight = POSITIVE_LEXICON[clean]
            elif clean in NEGATIVE_LEXICON:
                tag = "negative"
                weight = NEGATIVE_LEXICON[clean]
            elif clean in all_aspect_keywords:
                tag = "aspect"
                weight = 1.0

            tokens.append({
                "text": word,
                "tag": tag,
                "weight": float(round(weight, 2))
            })

        return tokens

    def predict(self, text: str, movie_title: Optional[str] = None) -> Dict[str, Any]:
        """Executes full prediction pipeline."""
        start_time = time.time()
        cleaned_text = self.preprocess_text(text)

        # 1. ML classification probabilities
        ml_probs = self.pipeline.predict_proba([cleaned_text])[0]
        classes = list(self.pipeline.classes_)

        prob_dict = {cls.lower(): float(ml_probs[i]) for i, cls in enumerate(classes)}
        pos_p = prob_dict.get("positive", 0.33)
        neg_p = prob_dict.get("negative", 0.33)
        neu_p = prob_dict.get("neutral", 0.34)

        # 2. Contextual lexicon compound polarity
        all_tokens = re.findall(r"[A-Za-z0-9'\-]+", cleaned_text.lower())
        compound_polarity, _ = self._score_tokens(all_tokens)

        # 3. Hybrid fusion
        fused_pos = pos_p * 0.55 + (max(0.0, compound_polarity) * 0.45)
        fused_neg = neg_p * 0.55 + (max(0.0, -compound_polarity) * 0.45)
        fused_neu = neu_p * 0.55 + ((1.0 - abs(compound_polarity)) * 0.45 * 0.5)

        total = fused_pos + fused_neg + fused_neu
        if total > 0:
            fused_pos /= total
            fused_neg /= total
            fused_neu /= total

        # Dominant sentiment determination
        if fused_pos > fused_neg and fused_pos > fused_neu and fused_pos >= 0.40:
            sentiment = "Positive"
            confidence = fused_pos
        elif fused_neg > fused_pos and fused_neg > fused_neu and fused_neg >= 0.40:
            sentiment = "Negative"
            confidence = fused_neg
        else:
            sentiment = "Neutral"
            confidence = fused_neu

        # Rating scale 1.0 - 10.0
        polarity_rating = 5.5 + (compound_polarity * 4.0)
        overall_rating = round(min(10.0, max(1.0, polarity_rating)), 1)

        # 4. Aspect-Based Analysis
        aspects = self.extract_aspects(cleaned_text)

        # 5. Token Highlighting
        highlighted_tokens = self.highlight_tokens(text)

        # 6. AI Summary Takeaway Generation
        positive_aspects = [a["aspect"] for a in aspects if a["sentiment"] == "Positive"]
        negative_aspects = [a["aspect"] for a in aspects if a["sentiment"] == "Negative"]

        if sentiment == "Positive":
            if positive_aspects:
                summary = f"Glowing praise highlighting exceptional {', '.join(positive_aspects[:2])}."
            else:
                summary = "Strongly positive reception with overarching critical acclaim."
        elif sentiment == "Negative":
            if negative_aspects:
                summary = f"Critical reception highlighting concerns with {', '.join(negative_aspects[:2])}."
            else:
                summary = "Predominantly negative review citing narrative or technical flaws."
        else:
            summary = "Balanced and nuanced reception with mixed critical reactions."

        proc_time = round((time.time() - start_time) * 1000, 2)

        return {
            "id": f"rev_{uuid.uuid4().hex[:8]}",
            "text": text,
            "movie_title": movie_title,
            "sentiment": sentiment,
            "confidence": round(float(confidence), 2),
            "compound_score": round(float(compound_polarity), 2),
            "overall_rating": overall_rating,
            "probabilities": {
                "positive": round(float(fused_pos), 3),
                "neutral": round(float(fused_neu), 3),
                "negative": round(float(fused_neg), 3)
            },
            "aspects": aspects,
            "summary": summary,
            "highlighted_tokens": highlighted_tokens,
            "processing_time_ms": proc_time
        }


# Global engine singleton
engine = SentimentAnalysisEngine()
