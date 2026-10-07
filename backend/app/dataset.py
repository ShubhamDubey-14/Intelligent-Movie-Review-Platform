from typing import List, Dict, Any

SAMPLE_MOVIES: List[Dict[str, Any]] = [
    {
        "id": "oppenheimer-2023",
        "title": "Oppenheimer",
        "year": 2023,
        "director": "Christopher Nolan",
        "cast": ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
        "genres": ["Biography", "Drama", "History"],
        "runtime": "180 min",
        "poster_url": "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200&auto=format&fit=crop",
        "synopsis": "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
        "critic_score": 93.0,
        "audience_score": 91.0,
        "overall_sentiment": "Positive",
        "sentiment_distribution": {"positive": 0.88, "neutral": 0.08, "negative": 0.04},
        "aspect_scores": {
            "Story & Screenplay": 0.91,
            "Acting & Cast": 0.96,
            "Directing & Vision": 0.95,
            "Cinematography & Visuals": 0.94,
            "Music & Sound Design": 0.98
        },
        "reviews_count": 2840,
        "recent_reviews": [
            {
                "id": "rev-opp-1",
                "author": "David Sims",
                "publication": "The Atlantic",
                "is_critic": True,
                "rating": 9.5,
                "date": "2023-07-21",
                "text": "A triumph of modern filmmaking. Cillian Murphy delivers a devastating, career-defining performance underpinned by Ludwig Göransson's pulse-pounding score.",
                "sentiment": "Positive",
                "aspect_highlights": {"Acting & Cast": "devastating, career-defining", "Music & Sound Design": "pulse-pounding score"}
            },
            {
                "id": "rev-opp-2",
                "author": "Elena Rostova",
                "publication": "Cinephile Daily",
                "is_critic": False,
                "rating": 9.0,
                "date": "2023-08-04",
                "text": "The pacing across three hours is astonishing. The sound design during the Trinity test literally takes the breath right out of your chest.",
                "sentiment": "Positive",
                "aspect_highlights": {"Music & Sound Design": "breath-taking sound design", "Story & Screenplay": "astonishing pacing"}
            }
        ]
    },
    {
        "id": "dune-part-two-2024",
        "title": "Dune: Part Two",
        "year": 2024,
        "director": "Denis Villeneuve",
        "cast": ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem", "Austin Butler"],
        "genres": ["Sci-Fi", "Adventure", "Drama"],
        "runtime": "166 min",
        "poster_url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
        "synopsis": "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
        "critic_score": 92.0,
        "audience_score": 95.0,
        "overall_sentiment": "Positive",
        "sentiment_distribution": {"positive": 0.91, "neutral": 0.06, "negative": 0.03},
        "aspect_scores": {
            "Story & Screenplay": 0.89,
            "Acting & Cast": 0.92,
            "Directing & Vision": 0.97,
            "Cinematography & Visuals": 0.99,
            "Music & Sound Design": 0.96
        },
        "reviews_count": 3410,
        "recent_reviews": [
            {
                "id": "rev-dune-1",
                "author": "Manohla Dargis",
                "publication": "The New York Times",
                "is_critic": True,
                "rating": 9.2,
                "date": "2024-03-01",
                "text": "A monumental visual spectacle. Greig Fraser's cinematography renders Arrakis with terrifying grandeur, while Austin Butler is unhinged perfection.",
                "sentiment": "Positive",
                "aspect_highlights": {"Cinematography & Visuals": "terrifying grandeur", "Acting & Cast": "unhinged perfection"}
            }
        ]
    },
    {
        "id": "past-lives-2023",
        "title": "Past Lives",
        "year": 2023,
        "director": "Celine Song",
        "cast": ["Greta Lee", "Teo Yoo", "John Magaro"],
        "genres": ["Drama", "Romance"],
        "runtime": "105 min",
        "poster_url": "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=800&auto=format&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
        "synopsis": "Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora's family emigrates from South Korea. Decades later, they reunite.",
        "critic_score": 96.0,
        "audience_score": 92.0,
        "overall_sentiment": "Positive",
        "sentiment_distribution": {"positive": 0.93, "neutral": 0.05, "negative": 0.02},
        "aspect_scores": {
            "Story & Screenplay": 0.97,
            "Acting & Cast": 0.95,
            "Directing & Vision": 0.94,
            "Cinematography & Visuals": 0.90,
            "Music & Sound Design": 0.88
        },
        "reviews_count": 1820,
        "recent_reviews": [
            {
                "id": "rev-pl-1",
                "author": "Justin Chang",
                "publication": "Los Angeles Times",
                "is_critic": True,
                "rating": 9.8,
                "date": "2023-06-02",
                "text": "Delicate, aching, and profoundly mature. Celine Song's debut screenplay balances unspoken longing with breathtaking quiet confidence.",
                "sentiment": "Positive",
                "aspect_highlights": {"Story & Screenplay": "unspoken longing", "Directing & Vision": "breathtaking quiet confidence"}
            }
        ]
    },
    {
        "id": "spider-man-spider-verse-2023",
        "title": "Spider-Man: Across the Spider-Verse",
        "year": 2023,
        "director": "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
        "cast": ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac", "Daniel Kaluuya"],
        "genres": ["Animation", "Action", "Adventure"],
        "runtime": "140 min",
        "poster_url": "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=800&auto=format&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop",
        "synopsis": "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
        "critic_score": 95.0,
        "audience_score": 94.0,
        "overall_sentiment": "Positive",
        "sentiment_distribution": {"positive": 0.92, "neutral": 0.06, "negative": 0.02},
        "aspect_scores": {
            "Story & Screenplay": 0.91,
            "Acting & Cast": 0.93,
            "Directing & Vision": 0.96,
            "Cinematography & Visuals": 0.99,
            "Music & Sound Design": 0.97
        },
        "reviews_count": 3150,
        "recent_reviews": [
            {
                "id": "rev-spider-1",
                "author": "Clarisse Loughrey",
                "publication": "The Independent",
                "is_critic": True,
                "rating": 9.6,
                "date": "2023-06-01",
                "text": "An explosion of creative ingenuity that pushes the boundaries of modern animation into uncharted, intoxicating artistic territory.",
                "sentiment": "Positive",
                "aspect_highlights": {"Cinematography & Visuals": "creative ingenuity", "Directing & Vision": "intoxicating artistry"}
            }
        ]
    },
    {
        "id": "parasite-2019",
        "title": "Parasite",
        "year": 2019,
        "director": "Bong Joon Ho",
        "cast": ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
        "genres": ["Thriller", "Drama", "Comedy"],
        "runtime": "132 min",
        "poster_url": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
        "synopsis": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        "critic_score": 99.0,
        "audience_score": 95.0,
        "overall_sentiment": "Positive",
        "sentiment_distribution": {"positive": 0.97, "neutral": 0.02, "negative": 0.01},
        "aspect_scores": {
            "Story & Screenplay": 0.99,
            "Acting & Cast": 0.98,
            "Directing & Vision": 0.99,
            "Cinematography & Visuals": 0.96,
            "Music & Sound Design": 0.94
        },
        "reviews_count": 4200,
        "recent_reviews": [
            {
                "id": "rev-para-1",
                "author": "Peter Bradshaw",
                "publication": "The Guardian",
                "is_critic": True,
                "rating": 10.0,
                "date": "2019-10-18",
                "text": "A masterclass in genre-bending tension and razor-sharp social satire. Bong Joon Ho's direction is surgical in its precision.",
                "sentiment": "Positive",
                "aspect_highlights": {"Directing & Vision": "surgical precision", "Story & Screenplay": "razor-sharp satire"}
            }
        ]
    },
    {
        "id": "interstellar-2014",
        "title": "Interstellar",
        "year": 2014,
        "director": "Christopher Nolan",
        "cast": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
        "genres": ["Sci-Fi", "Adventure", "Drama"],
        "runtime": "169 min",
        "poster_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
        "synopsis": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft along with a team of researchers.",
        "critic_score": 73.0,
        "audience_score": 86.0,
        "overall_sentiment": "Positive",
        "sentiment_distribution": {"positive": 0.81, "neutral": 0.11, "negative": 0.08},
        "aspect_scores": {
            "Story & Screenplay": 0.76,
            "Acting & Cast": 0.89,
            "Directing & Vision": 0.93,
            "Cinematography & Visuals": 0.98,
            "Music & Sound Design": 0.99
        },
        "reviews_count": 3950,
        "recent_reviews": [
            {
                "id": "rev-inter-1",
                "author": "Marcus Thorne",
                "publication": "Film Discourse",
                "is_critic": True,
                "rating": 8.0,
                "date": "2021-04-12",
                "text": "While the third-act dialogue veers toward sentimental melodrama, Hans Zimmer's pipe organ score and Hoyte van Hoytema's visuals are unmatched.",
                "sentiment": "Neutral",
                "aspect_highlights": {"Story & Screenplay": "sentimental melodrama", "Music & Sound Design": "unmatched pipe organ score"}
            }
        ]
    },
    {
        "id": "everything-everywhere-2022",
        "title": "Everything Everywhere All at Once",
        "year": 2022,
        "director": "Daniel Kwan, Daniel Scheinert",
        "cast": ["Michelle Yeoh", "Ke Huy Quan", "Stephanie Hsu", "Jamie Lee Curtis"],
        "genres": ["Action", "Adventure", "Comedy", "Sci-Fi"],
        "runtime": "139 min",
        "poster_url": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200&auto=format&fit=crop",
        "synopsis": "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes.",
        "critic_score": 94.0,
        "audience_score": 86.0,
        "overall_sentiment": "Positive",
        "sentiment_distribution": {"positive": 0.89, "neutral": 0.07, "negative": 0.04},
        "aspect_scores": {
            "Story & Screenplay": 0.94,
            "Acting & Cast": 0.98,
            "Directing & Vision": 0.97,
            "Cinematography & Visuals": 0.92,
            "Music & Sound Design": 0.90
        },
        "reviews_count": 2780,
        "recent_reviews": [
            {
                "id": "rev-ee-1",
                "author": "A.O. Scott",
                "publication": "The New York Times",
                "is_critic": True,
                "rating": 9.5,
                "date": "2022-03-24",
                "text": "A maximalist whirlwind that grounds cosmic absurdity inside an exquisite immigrant family drama. Michelle Yeoh and Ke Huy Quan are sensational.",
                "sentiment": "Positive",
                "aspect_highlights": {"Acting & Cast": "sensational performances", "Story & Screenplay": "exquisite family drama"}
            }
        ]
    },
    {
        "id": "blade-runner-2049",
        "title": "Blade Runner 2049",
        "year": 2017,
        "director": "Denis Villeneuve",
        "cast": ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Sylvia Hoeks"],
        "genres": ["Sci-Fi", "Mystery", "Drama"],
        "runtime": "164 min",
        "poster_url": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
        "synopsis": "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
        "critic_score": 88.0,
        "audience_score": 88.0,
        "overall_sentiment": "Positive",
        "sentiment_distribution": {"positive": 0.86, "neutral": 0.09, "negative": 0.05},
        "aspect_scores": {
            "Story & Screenplay": 0.84,
            "Acting & Cast": 0.90,
            "Directing & Vision": 0.95,
            "Cinematography & Visuals": 0.99,
            "Music & Sound Design": 0.94
        },
        "reviews_count": 2490,
        "recent_reviews": [
            {
                "id": "rev-br-1",
                "author": "Mark Kermode",
                "publication": "Observer",
                "is_critic": True,
                "rating": 9.0,
                "date": "2017-10-08",
                "text": "Roger Deakins' cinematography is pure sublime visual poetry. A slow-burning contemplation on soul and identity that honors the original.",
                "sentiment": "Positive",
                "aspect_highlights": {"Cinematography & Visuals": "sublime visual poetry", "Directing & Vision": "slow-burning contemplation"}
            }
        ]
    },
    {
        "id": "whiplash-2014",
        "title": "Whiplash",
        "year": 2014,
        "director": "Damien Chazelle",
        "cast": ["Miles Teller", "J.K. Simmons", "Paul Reiser", "Melissa Benoist"],
        "genres": ["Drama", "Music"],
        "runtime": "106 min",
        "poster_url": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
        "synopsis": "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.",
        "critic_score": 94.0,
        "audience_score": 94.0,
        "overall_sentiment": "Positive",
        "sentiment_distribution": {"positive": 0.93, "neutral": 0.05, "negative": 0.02},
        "aspect_scores": {
            "Story & Screenplay": 0.95,
            "Acting & Cast": 0.99,
            "Directing & Vision": 0.96,
            "Cinematography & Visuals": 0.92,
            "Music & Sound Design": 0.98
        },
        "reviews_count": 3120,
        "recent_reviews": [
            {
                "id": "rev-whip-1",
                "author": "Richard Roeper",
                "publication": "Chicago Sun-Times",
                "is_critic": True,
                "rating": 10.0,
                "date": "2014-10-16",
                "text": "J.K. Simmons gives an electrifying, terrifying performance. The editing and musical rhythm turn a jazz rehearsal room into an arena of psychological warfare.",
                "sentiment": "Positive",
                "aspect_highlights": {"Acting & Cast": "electrifying, terrifying performance", "Music & Sound Design": "musical rhythm warfare"}
            }
        ]
    },
    {
        "id": "the-batman-2022",
        "title": "The Batman",
        "year": 2022,
        "director": "Matt Reeves",
        "cast": ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Colin Farrell"],
        "genres": ["Action", "Crime", "Drama"],
        "runtime": "176 min",
        "poster_url": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
        "synopsis": "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
        "critic_score": 85.0,
        "audience_score": 87.0,
        "overall_sentiment": "Positive",
        "sentiment_distribution": {"positive": 0.83, "neutral": 0.11, "negative": 0.06},
        "aspect_scores": {
            "Story & Screenplay": 0.81,
            "Acting & Cast": 0.89,
            "Directing & Vision": 0.92,
            "Cinematography & Visuals": 0.97,
            "Music & Sound Design": 0.94
        },
        "reviews_count": 2900,
        "recent_reviews": [
            {
                "id": "rev-bat-1",
                "author": "K. Austin Collins",
                "publication": "Rolling Stone",
                "is_critic": True,
                "rating": 8.5,
                "date": "2022-03-03",
                "text": "A rain-soaked neo-noir detective procedural. Greig Fraser's shadow-drenched framing and Michael Giacchino's ominous four-note theme create an incredible mood.",
                "sentiment": "Positive",
                "aspect_highlights": {"Cinematography & Visuals": "shadow-drenched framing", "Music & Sound Design": "ominous four-note theme"}
            }
        ]
    },
    {
        "id": "poor-things-2023",
        "title": "Poor Things",
        "year": 2023,
        "director": "Yorgos Lanthimos",
        "cast": ["Emma Stone", "Mark Ruffalo", "Willem Dafoe", "Ramy Youssef"],
        "genres": ["Comedy", "Drama", "Romance", "Sci-Fi"],
        "runtime": "141 min",
        "poster_url": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200&auto=format&fit=crop",
        "synopsis": "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.",
        "critic_score": 92.0,
        "audience_score": 79.0,
        "overall_sentiment": "Positive",
        "sentiment_distribution": {"positive": 0.84, "neutral": 0.08, "negative": 0.08},
        "aspect_scores": {
            "Story & Screenplay": 0.88,
            "Acting & Cast": 0.98,
            "Directing & Vision": 0.95,
            "Cinematography & Visuals": 0.97,
            "Music & Sound Design": 0.91
        },
        "reviews_count": 2100,
        "recent_reviews": [
            {
                "id": "rev-pt-1",
                "author": "Robbie Collin",
                "publication": "The Telegraph",
                "is_critic": True,
                "rating": 9.5,
                "date": "2023-12-08",
                "text": "Emma Stone gives the performance of her life: fearless, hilarious, and utterly disarming. A visual feast of surreal steampunk opulence.",
                "sentiment": "Positive",
                "aspect_highlights": {"Acting & Cast": "fearless, hilarious performance", "Cinematography & Visuals": "surreal steampunk opulence"}
            }
        ]
    },
    {
        "id": "barbie-2023",
        "title": "Barbie",
        "year": 2023,
        "director": "Greta Gerwig",
        "cast": ["Margot Robbie", "Ryan Gosling", "America Ferrera", "Kate McKinnon"],
        "genres": ["Comedy", "Adventure", "Fantasy"],
        "runtime": "114 min",
        "poster_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
        "synopsis": "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land until an existential crisis leads them to the real world.",
        "critic_score": 88.0,
        "audience_score": 83.0,
        "overall_sentiment": "Positive",
        "sentiment_distribution": {"positive": 0.85, "neutral": 0.09, "negative": 0.06},
        "aspect_scores": {
            "Story & Screenplay": 0.85,
            "Acting & Cast": 0.94,
            "Directing & Vision": 0.91,
            "Cinematography & Visuals": 0.96,
            "Music & Sound Design": 0.92
        },
        "reviews_count": 3600,
        "recent_reviews": [
            {
                "id": "rev-bar-1",
                "author": "Peter Travers",
                "publication": "ABC News",
                "is_critic": True,
                "rating": 8.8,
                "date": "2023-07-21",
                "text": "Greta Gerwig delivers an exuberant feminist comedy that sparkles with razor-sharp satire. Ryan Gosling's Kenergy stole every scene.",
                "sentiment": "Positive",
                "aspect_highlights": {"Directing & Vision": "exuberant satire", "Acting & Cast": "scene-stealing Kenergy"}
            }
        ]
    }
]

GLOBAL_ANALYTICS: Dict[str, Any] = {
    "kpis": {
        "total_reviews_analyzed": 15420,
        "avg_sentiment_polarity": 0.68,
        "overall_positive_rate": 84.6,
        "critic_audience_concordance": 87.2,
        "dominant_aspect": "Acting & Cast"
    },
    "sentiment_distribution": [
        {"name": "Positive", "value": 11340, "percentage": 73.5, "color": "#10b981"},
        {"name": "Neutral / Mixed", "value": 2420, "percentage": 15.7, "color": "#f59e0b"},
        {"name": "Negative", "value": 1660, "percentage": 10.8, "color": "#f43f5e"}
    ],
    "rating_distribution": [
        {"rating": 1, "count": 140},
        {"rating": 2, "count": 220},
        {"rating": 3, "count": 390},
        {"rating": 4, "count": 580},
        {"rating": 5, "count": 890},
        {"rating": 6, "count": 1420},
        {"rating": 7, "count": 2680},
        {"rating": 8, "count": 4120},
        {"rating": 9, "count": 3450},
        {"rating": 10, "count": 1530}
    ],
    "sentiment_trends": [
        {"month": "Nov 23", "positive": 71.2, "neutral": 17.5, "negative": 11.3, "volume": 1120},
        {"month": "Dec 23", "positive": 74.8, "neutral": 15.1, "negative": 10.1, "volume": 1340},
        {"month": "Jan 24", "positive": 72.0, "neutral": 16.8, "negative": 11.2, "volume": 1050},
        {"month": "Feb 24", "positive": 76.5, "neutral": 14.3, "negative": 9.2, "volume": 1280},
        {"month": "Mar 24", "positive": 81.4, "neutral": 12.0, "negative": 6.6, "volume": 1820},
        {"month": "Apr 24", "positive": 75.1, "neutral": 15.6, "negative": 9.3, "volume": 1210},
        {"month": "May 24", "positive": 73.6, "neutral": 16.2, "negative": 10.2, "volume": 1140},
        {"month": "Jun 24", "positive": 77.8, "neutral": 14.1, "negative": 8.1, "volume": 1460},
        {"month": "Jul 24", "positive": 79.2, "neutral": 13.5, "negative": 7.3, "volume": 1590},
        {"month": "Aug 24", "positive": 74.0, "neutral": 15.8, "negative": 10.2, "volume": 1180},
        {"month": "Sep 24", "positive": 76.9, "neutral": 14.7, "negative": 8.4, "volume": 1220},
        {"month": "Oct 24", "positive": 78.4, "neutral": 13.9, "negative": 7.7, "volume": 1010}
    ],
    "aspect_breakdown": [
        {"aspect": "Story & Screenplay", "score": 87.4, "benchmark": 75.0, "positive_count": 9240, "negative_count": 1840},
        {"aspect": "Acting & Cast", "score": 93.8, "benchmark": 80.0, "positive_count": 10850, "negative_count": 980},
        {"aspect": "Directing & Vision", "score": 92.1, "benchmark": 78.0, "positive_count": 10120, "negative_count": 1120},
        {"aspect": "Cinematography & Visuals", "score": 95.6, "benchmark": 82.0, "positive_count": 11420, "negative_count": 640},
        {"aspect": "Music & Sound Design", "score": 92.7, "benchmark": 79.0, "positive_count": 10300, "negative_count": 810}
    ],
    "critic_vs_audience": [
        {"movie": "Oppenheimer", "genre": "Drama", "critic": 93.0, "audience": 91.0, "divergence": 2.0},
        {"movie": "Dune: Part Two", "genre": "Sci-Fi", "critic": 92.0, "audience": 95.0, "divergence": -3.0},
        {"movie": "Past Lives", "genre": "Romance", "critic": 96.0, "audience": 92.0, "divergence": 4.0},
        {"movie": "Spider-Verse", "genre": "Animation", "critic": 95.0, "audience": 94.0, "divergence": 1.0},
        {"movie": "Parasite", "genre": "Thriller", "critic": 99.0, "audience": 95.0, "divergence": 4.0},
        {"movie": "Interstellar", "genre": "Sci-Fi", "critic": 73.0, "audience": 86.0, "divergence": -13.0},
        {"movie": "Everything Everywhere", "genre": "Sci-Fi", "critic": 94.0, "audience": 86.0, "divergence": 8.0},
        {"movie": "Blade Runner 2049", "genre": "Sci-Fi", "critic": 88.0, "audience": 88.0, "divergence": 0.0},
        {"movie": "Whiplash", "genre": "Drama", "critic": 94.0, "audience": 94.0, "divergence": 0.0},
        {"movie": "The Batman", "genre": "Action", "critic": 85.0, "audience": 87.0, "divergence": -2.0},
        {"movie": "Poor Things", "genre": "Comedy", "critic": 92.0, "audience": 79.0, "divergence": 13.0},
        {"movie": "Barbie", "genre": "Comedy", "critic": 88.0, "audience": 83.0, "divergence": 5.0}
    ],
    "top_positive_keywords": [
        {"word": "masterpiece", "type": "positive", "count": 2840, "weight": 3.8},
        {"word": "breathtaking", "type": "positive", "count": 2420, "weight": 3.5},
        {"word": "visceral", "type": "positive", "count": 1980, "weight": 3.2},
        {"word": "stellar", "type": "positive", "count": 1850, "weight": 3.0},
        {"word": "compelling", "type": "positive", "count": 1720, "weight": 3.0},
        {"word": "gripping", "type": "positive", "count": 1640, "weight": 3.1},
        {"word": "poignant", "type": "positive", "count": 1490, "weight": 3.0},
        {"word": "flawless", "type": "positive", "count": 1380, "weight": 3.5},
        {"word": "electrifying", "type": "positive", "count": 1260, "weight": 3.3},
        {"word": "transcendent", "type": "positive", "count": 1140, "weight": 3.6}
    ],
    "top_negative_keywords": [
        {"word": "pacing issues", "type": "negative", "count": 1120, "weight": -2.6},
        {"word": "predictable", "type": "negative", "count": 980, "weight": -2.3},
        {"word": "cliché", "type": "negative", "count": 890, "weight": -2.5},
        {"word": "underdeveloped", "type": "negative", "count": 810, "weight": -2.6},
        {"word": "monotonous", "type": "negative", "count": 740, "weight": -2.8},
        {"word": "tedious", "type": "negative", "count": 690, "weight": -2.9},
        {"word": "disappointing", "type": "negative", "count": 640, "weight": -2.7},
        {"word": "hollow", "type": "negative", "count": 590, "weight": -2.7},
        {"word": "flat", "type": "negative", "count": 530, "weight": -2.5},
        {"word": "disjointed", "type": "negative", "count": 480, "weight": -2.8}
    ]
}
