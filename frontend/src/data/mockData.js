export const MOCK_MOVIES = [
  {
    id: "oppenheimer-2023",
    title: "Oppenheimer",
    year: 2023,
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    genres: ["Biography", "Drama", "History"],
    runtime: "180 min",
    poster_url: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200&auto=format&fit=crop",
    synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    critic_score: 93.0,
    audience_score: 91.0,
    overall_sentiment: "Positive",
    sentiment_distribution: { positive: 0.88, neutral: 0.08, negative: 0.04 },
    aspect_scores: {
      "Story & Screenplay": 0.91,
      "Acting & Cast": 0.96,
      "Directing & Vision": 0.95,
      "Cinematography & Visuals": 0.94,
      "Music & Sound Design": 0.98
    },
    reviews_count: 2840,
    recent_reviews: [
      {
        id: "rev-opp-1",
        author: "David Sims",
        publication: "The Atlantic",
        is_critic: true,
        rating: 9.5,
        date: "2023-07-21",
        text: "A triumph of modern filmmaking. Cillian Murphy delivers a devastating, career-defining performance underpinned by Ludwig Göransson's pulse-pounding score.",
        sentiment: "Positive",
        aspect_highlights: { "Acting & Cast": "career-defining performance", "Music & Sound Design": "pulse-pounding score" }
      },
      {
        id: "rev-opp-2",
        author: "Elena Rostova",
        publication: "Cinephile Daily",
        is_critic: false,
        rating: 9.0,
        date: "2023-08-04",
        text: "The pacing across three hours is astonishing. The sound design during the Trinity test literally takes the breath right out of your chest.",
        sentiment: "Positive",
        aspect_highlights: { "Music & Sound Design": "breath-taking sound design", "Story & Screenplay": "astonishing pacing" }
      }
    ]
  },
  {
    id: "dune-part-two-2024",
    title: "Dune: Part Two",
    year: 2024,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem", "Austin Butler"],
    genres: ["Sci-Fi", "Adventure", "Drama"],
    runtime: "166 min",
    poster_url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    critic_score: 92.0,
    audience_score: 95.0,
    overall_sentiment: "Positive",
    sentiment_distribution: { positive: 0.91, neutral: 0.06, negative: 0.03 },
    aspect_scores: {
      "Story & Screenplay": 0.89,
      "Acting & Cast": 0.92,
      "Directing & Vision": 0.97,
      "Cinematography & Visuals": 0.99,
      "Music & Sound Design": 0.96
    },
    reviews_count: 3410,
    recent_reviews: [
      {
        id: "rev-dune-1",
        author: "Manohla Dargis",
        publication: "The New York Times",
        is_critic: true,
        rating: 9.2,
        date: "2024-03-01",
        text: "A monumental visual spectacle. Greig Fraser's cinematography renders Arrakis with terrifying grandeur, while Austin Butler is unhinged perfection.",
        sentiment: "Positive",
        aspect_highlights: { "Cinematography & Visuals": "terrifying grandeur", "Acting & Cast": "unhinged perfection" }
      }
    ]
  },
  {
    id: "past-lives-2023",
    title: "Past Lives",
    year: 2023,
    director: "Celine Song",
    cast: ["Greta Lee", "Teo Yoo", "John Magaro"],
    genres: ["Drama", "Romance"],
    runtime: "105 min",
    poster_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=800&auto=format&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
    synopsis: "Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora's family emigrates from South Korea. Decades later, they reunite.",
    critic_score: 96.0,
    audience_score: 92.0,
    overall_sentiment: "Positive",
    sentiment_distribution: { positive: 0.93, neutral: 0.05, negative: 0.02 },
    aspect_scores: {
      "Story & Screenplay": 0.97,
      "Acting & Cast": 0.95,
      "Directing & Vision": 0.94,
      "Cinematography & Visuals": 0.90,
      "Music & Sound Design": 0.88
    },
    reviews_count: 1820,
    recent_reviews: [
      {
        id: "rev-pl-1",
        author: "Justin Chang",
        publication: "Los Angeles Times",
        is_critic: true,
        rating: 9.8,
        date: "2023-06-02",
        text: "Delicate, aching, and profoundly mature. Celine Song's debut screenplay balances unspoken longing with breathtaking quiet confidence.",
        sentiment: "Positive",
        aspect_highlights: { "Story & Screenplay": "unspoken longing", "Directing & Vision": "breathtaking quiet confidence" }
      }
    ]
  },
  {
    id: "spider-man-spider-verse-2023",
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    director: "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac", "Daniel Kaluuya"],
    genres: ["Animation", "Action", "Adventure"],
    runtime: "140 min",
    poster_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=800&auto=format&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop",
    synopsis: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    critic_score: 95.0,
    audience_score: 94.0,
    overall_sentiment: "Positive",
    sentiment_distribution: { positive: 0.92, neutral: 0.06, negative: 0.02 },
    aspect_scores: {
      "Story & Screenplay": 0.91,
      "Acting & Cast": 0.93,
      "Directing & Vision": 0.96,
      "Cinematography & Visuals": 0.99,
      "Music & Sound Design": 0.97
    },
    reviews_count: 3150,
    recent_reviews: []
  },
  {
    id: "parasite-2019",
    title: "Parasite",
    year: 2019,
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
    genres: ["Thriller", "Drama", "Comedy"],
    runtime: "132 min",
    poster_url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    synopsis: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    critic_score: 99.0,
    audience_score: 95.0,
    overall_sentiment: "Positive",
    sentiment_distribution: { positive: 0.97, neutral: 0.02, negative: 0.01 },
    aspect_scores: {
      "Story & Screenplay": 0.99,
      "Acting & Cast": 0.98,
      "Directing & Vision": 0.99,
      "Cinematography & Visuals": 0.96,
      "Music & Sound Design": 0.94
    },
    reviews_count: 4200,
    recent_reviews: []
  },
  {
    id: "interstellar-2014",
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    genres: ["Sci-Fi", "Adventure", "Drama"],
    runtime: "169 min",
    poster_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    backdrop_url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
    synopsis: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft along with a team of researchers.",
    critic_score: 73.0,
    audience_score: 86.0,
    overall_sentiment: "Positive",
    sentiment_distribution: { positive: 0.81, neutral: 0.11, negative: 0.08 },
    aspect_scores: {
      "Story & Screenplay": 0.76,
      "Acting & Cast": 0.89,
      "Directing & Vision": 0.93,
      "Cinematography & Visuals": 0.98,
      "Music & Sound Design": 0.99
    },
    reviews_count: 3950,
    recent_reviews: []
  }
];

export const MOCK_ANALYTICS = {
  kpis: {
    total_reviews_analyzed: 15420,
    avg_sentiment_polarity: 0.68,
    overall_positive_rate: 84.6,
    critic_audience_concordance: 87.2,
    dominant_aspect: "Acting & Cast"
  },
  sentiment_distribution: [
    { name: "Positive", value: 11340, percentage: 73.5, color: "#10b981" },
    { name: "Neutral / Mixed", value: 2420, percentage: 15.7, color: "#f59e0b" },
    { name: "Negative", value: 1660, percentage: 10.8, color: "#f43f5e" }
  ],
  rating_distribution: [
    { rating: 1, count: 140 },
    { rating: 2, count: 220 },
    { rating: 3, count: 390 },
    { rating: 4, count: 580 },
    { rating: 5, count: 890 },
    { rating: 6, count: 1420 },
    { rating: 7, count: 2680 },
    { rating: 8, count: 4120 },
    { rating: 9, count: 3450 },
    { rating: 10, count: 1530 }
  ],
  sentiment_trends: [
    { month: "Nov 23", positive: 71.2, neutral: 17.5, negative: 11.3, volume: 1120 },
    { month: "Dec 23", positive: 74.8, neutral: 15.1, negative: 10.1, volume: 1340 },
    { month: "Jan 24", positive: 72.0, neutral: 16.8, negative: 11.2, volume: 1050 },
    { month: "Feb 24", positive: 76.5, neutral: 14.3, negative: 9.2, volume: 1280 },
    { month: "Mar 24", positive: 81.4, neutral: 12.0, negative: 6.6, volume: 1820 },
    { month: "Apr 24", positive: 75.1, neutral: 15.6, negative: 9.3, volume: 1210 },
    { month: "May 24", positive: 73.6, neutral: 16.2, negative: 10.2, volume: 1140 },
    { month: "Jun 24", positive: 77.8, neutral: 14.1, negative: 8.1, volume: 1460 },
    { month: "Jul 24", positive: 79.2, neutral: 13.5, negative: 7.3, volume: 1590 },
    { month: "Aug 24", positive: 74.0, neutral: 15.8, negative: 10.2, volume: 1180 },
    { month: "Sep 24", positive: 76.9, neutral: 14.7, negative: 8.4, volume: 1220 },
    { month: "Oct 24", positive: 78.4, neutral: 13.9, negative: 7.7, volume: 1010 }
  ],
  aspect_breakdown: [
    { aspect: "Story & Screenplay", score: 87.4, benchmark: 75.0, positive_count: 9240, negative_count: 1840 },
    { aspect: "Acting & Cast", score: 93.8, benchmark: 80.0, positive_count: 10850, negative_count: 980 },
    { aspect: "Directing & Vision", score: 92.1, benchmark: 78.0, positive_count: 10120, negative_count: 1120 },
    { aspect: "Cinematography & Visuals", score: 95.6, benchmark: 82.0, positive_count: 11420, negative_count: 640 },
    { aspect: "Music & Sound Design", score: 92.7, benchmark: 79.0, positive_count: 10300, negative_count: 810 }
  ],
  critic_vs_audience: [
    { movie: "Oppenheimer", genre: "Drama", critic: 93.0, audience: 91.0, divergence: 2.0 },
    { movie: "Dune: Part Two", genre: "Sci-Fi", critic: 92.0, audience: 95.0, divergence: -3.0 },
    { movie: "Past Lives", genre: "Romance", critic: 96.0, audience: 92.0, divergence: 4.0 },
    { movie: "Spider-Verse", genre: "Animation", critic: 95.0, audience: 94.0, divergence: 1.0 },
    { movie: "Parasite", genre: "Thriller", critic: 99.0, audience: 95.0, divergence: 4.0 },
    { movie: "Interstellar", genre: "Sci-Fi", critic: 73.0, audience: 86.0, divergence: -13.0 },
    { movie: "Everything Everywhere", genre: "Sci-Fi", critic: 94.0, audience: 86.0, divergence: 8.0 },
    { movie: "Blade Runner 2049", genre: "Sci-Fi", critic: 88.0, audience: 88.0, divergence: 0.0 }
  ],
  top_positive_keywords: [
    { word: "masterpiece", type: "positive", count: 2840, weight: 3.8 },
    { word: "breathtaking", type: "positive", count: 2420, weight: 3.5 },
    { word: "visceral", type: "positive", count: 1980, weight: 3.2 },
    { word: "stellar", type: "positive", count: 1850, weight: 3.0 },
    { word: "compelling", type: "positive", count: 1720, weight: 3.0 },
    { word: "gripping", type: "positive", count: 1640, weight: 3.1 },
    { word: "flawless", type: "positive", count: 1380, weight: 3.5 }
  ],
  top_negative_keywords: [
    { word: "pacing issues", type: "negative", count: 1120, weight: -2.6 },
    { word: "predictable", type: "negative", count: 980, weight: -2.3 },
    { word: "cliché", type: "negative", count: 890, weight: -2.5 },
    { word: "underdeveloped", type: "negative", count: 810, weight: -2.6 },
    { word: "monotonous", type: "negative", count: 740, weight: -2.8 },
    { word: "tedious", type: "negative", count: 690, weight: -2.9 },
    { word: "disappointing", type: "negative", count: 640, weight: -2.7 }
  ]
};
